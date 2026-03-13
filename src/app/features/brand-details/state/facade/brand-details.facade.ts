import { inject, Injectable } from '@angular/core';
import { BrandDetailsStore } from '../store/brand-details.store';
import { BrandDetailsApi } from '../../infrastructure/api/brand-details-api';
import { combineLatest, map, tap } from 'rxjs';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsFacade {
  
  private readonly brandDetailsMethodsStore = inject(BrandDetailsStore);
  private readonly brandDetailsApiService = inject(BrandDetailsApi);
  private readonly commonFacade = inject(CommonFacade);
  public loadBrandDetails(brandId: number): void {
    const lastLoadedBrandId = this.brandDetailsMethodsStore.lastLoadedBrandId();

    if(lastLoadedBrandId === brandId) {
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
        this.setBrandNameById(brandId);
        this.brandDetailsMethodsStore.setModels(models);
        this.brandDetailsMethodsStore.setVehicleTypes(types);
        this.brandDetailsMethodsStore.setLoading(false);
        this.brandDetailsMethodsStore.setLastLoadedBrandId(brandId);
      })
    ).subscribe();
  }

  private setBrandNameById(brandId: number): void {
    const brands = this.commonFacade.brands();
    const brand = brands.find(b => Number(b.id) === Number(brandId));
    const brandName = brand ? brand.name : '';
    this.brandDetailsMethodsStore.setBrandName(brandName);
  }

}
