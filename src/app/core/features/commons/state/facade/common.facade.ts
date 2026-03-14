import { inject, Injectable, Signal } from '@angular/core';
import { GetAllMakesResponse, MakeResults } from '../../infrastructure/models/common.dto';
import { CommonStore } from '../store/common.store';
import { CommonApi } from '../../infrastructure/api/common.api';
import { map, Observable, of, tap } from 'rxjs';
import { VehicleBrand } from '../../models/commons.models';

@Injectable({
  providedIn: 'root',
})
export class CommonFacade {

  public readonly brands: Signal<VehicleBrand[]>;
  public isLoading: Signal<boolean>;

  private readonly commonStore = inject(CommonStore);
  private readonly commonApi = inject(CommonApi);

  constructor() {
    this.brands = this.commonStore.brands;
    this.isLoading = this.commonStore.loading;
  }

  public set Loading(loading: boolean) {
    this.commonStore.setLoading(loading);
  }

  public loadAllBrands(): Observable<VehicleBrand[]> {
    const brands = this.commonStore.brands();
    if (brands.length > 0) {
      return of(brands);
    }
    this.commonStore.setLoading(true);
    return this.commonApi.getAllMakes().pipe(
      map((response: GetAllMakesResponse) => {
        return response.Results.map(result => ({
          id: result.Make_ID,
          name: result.Make_Name
        }));
      }),
      tap((brands: VehicleBrand[]) => {
        this.commonStore.setBrands(brands);
        this.commonStore.setLoading(false);
      })
    );
  }
}
