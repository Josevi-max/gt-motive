import { inject, Injectable } from '@angular/core';
import { BrandDetailsStore } from '../store/brand-details.store';
import { BrandDetailsApi } from '../../infrastructure/api/brand-details-api';
import { combineLatest, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsFacade {
  
  private readonly brandDetailsMethodsStore = inject(BrandDetailsStore);
  private readonly brandDetailsApiService = inject(BrandDetailsApi);

  public loadBrandDetails(brandId: number): void {
    const models = this.brandDetailsMethodsStore.models();
    const types = this.brandDetailsMethodsStore.vehicleTypes();

    if(models.length > 0 && types.length > 0) {
      return;
    }

    this.brandDetailsMethodsStore.setLoading(true);
    combineLatest([
      this.brandDetailsApiService.getBrandDetails(brandId),
      this.brandDetailsApiService.getVehicleTypesForBrand(brandId)
    ]).pipe(
      map(([detailsResponse, typesResponse]) => {
        const models = detailsResponse.Results.map(model => ({
          idModel: model.Model_ID,
          nameModel: model.Model_Name,
          idMake: model.Make_ID,
          nameMake: model.Make_Name
        }));
        const types = typesResponse.Results.map(type => ({
          id: type.VehicleTypeId,
          name: type.VehicleTypeName
        }));
        return { models, types };
      }),
      tap(({ models, types }) => {
        this.brandDetailsMethodsStore.setModels(models);
        this.brandDetailsMethodsStore.setVehicleTypes(types);
        this.brandDetailsMethodsStore.setLoading(false);
      })
    ).subscribe();
  }


}
