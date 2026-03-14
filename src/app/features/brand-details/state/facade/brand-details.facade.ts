import { inject, Injectable, Signal } from '@angular/core';
import { BrandDetailsStore } from '../store/brand-details.store';
import { BrandDetailsApi } from '../../infrastructure/api/brand-details-api';
import { combineLatest, map, tap } from 'rxjs';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsFacade {

  public readonly isLoadingBrandDetails: Signal<boolean>;
  
  private readonly brandDetailsMethodsStore = inject(BrandDetailsStore);
  private readonly brandDetailsApiService = inject(BrandDetailsApi);
  private readonly commonFacade = inject(CommonFacade);

  constructor() {
    this.isLoadingBrandDetails = this.brandDetailsMethodsStore.loading;
  }
  
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
        this.setBrandNameById(Number(brandId));
        this.brandDetailsMethodsStore.setModels(models);
        this.brandDetailsMethodsStore.setVehicleTypes(types);
        this.brandDetailsMethodsStore.setLastLoadedBrandId(Number(brandId));
        this.brandDetailsMethodsStore.setLoading(false);
      })
    ).subscribe();
  }

  private setBrandNameById(brandId: number): void {
    const brands = this.commonFacade.brands();
    const brandsMap = new Map(brands.map(brand => [Number(brand.id), brand.name]));
    const brandName = brandsMap.get(brandId) || '';
    this.brandDetailsMethodsStore.setBrandName(brandName);
  }

}
