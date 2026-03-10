import { inject, Injectable } from '@angular/core';
import { HomeApi } from '../../infrastructure/api/home.api';
import { map, tap } from 'rxjs';
import { GetAllMakesResponse } from '../../infrastructure/models/home.dto';
import { HomeMethodsStore } from '../store/home.methods';
import { VehicleBrand } from '../../domain/models/home.models';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {

  private readonly homeApiService = inject(HomeApi);
  private readonly homeMethodsStore = inject(HomeMethodsStore);
  public loadBrands(): void {
    this.homeMethodsStore.setLoading(true);
    this.homeApiService.getAllMakes().pipe(
      map((response: GetAllMakesResponse) => {
        return response.Results.map(result => ({
          id: result.Make_ID,
          name: result.Make_Name
        }));
      }),
      tap((brands: VehicleBrand[]) => {
        this.homeMethodsStore.setBrands(brands);
        this.homeMethodsStore.setLoading(false);
      })
    ).subscribe();
  }
  
}
