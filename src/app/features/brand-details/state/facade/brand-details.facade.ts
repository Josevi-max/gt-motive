import { inject, Injectable, Signal } from '@angular/core';
import { BrandDetailsStore } from '../store/brand-details.store';
import { BrandDetailsApi } from '../../infrastructure/api/brand-details-api';
import { combineLatest, map, tap } from 'rxjs';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsFacade {

  public readonly isLoadingBrandDetails: Signal<boolean>;
  public readonly totalVehicleTypes: Signal<number>;
  public readonly totalModels: Signal<number>;
  public readonly models: Signal<VehicleModelData[]>
  public readonly vehicleTypes: Signal<VehicleTypeData[]>
  public readonly brandName: Signal<string>;
  public readonly modelsLoaded: Signal<VehicleModelData[]>
  public readonly disabledLoadMoreModelsButtons: Signal<boolean>;

  private readonly brandDetailsMethodsStore = inject(BrandDetailsStore);
  private readonly brandDetailsApiService = inject(BrandDetailsApi);
  private readonly commonFacade = inject(CommonFacade);

  private readonly INIT_NUMBER_MODELS_LOADED:number = 12;
  private readonly INCREMENT_MODELS_LOADED:number = 12;
  private numberModelsLoaded:number = this.INIT_NUMBER_MODELS_LOADED;


  constructor() {
    this.isLoadingBrandDetails = this.brandDetailsMethodsStore.loading;
    this.totalVehicleTypes = this.brandDetailsMethodsStore.totalVehicleTypes;
    this.totalModels = this.brandDetailsMethodsStore.totalModels;
    this.models = this.brandDetailsMethodsStore.models;
    this.modelsLoaded = this.brandDetailsMethodsStore.modelsLoaded;
    this.vehicleTypes = this.brandDetailsMethodsStore.vehicleTypes;
    this.brandName = this.brandDetailsMethodsStore.brandName;
    this.disabledLoadMoreModelsButtons = this.brandDetailsMethodsStore.disabledLoadMoreModelsButtons;
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
        this.numberModelsLoaded = this.INIT_NUMBER_MODELS_LOADED;
        const initModelsLoaded = models.slice(0,this.numberModelsLoaded);
        this.setBrandNameById(Number(brandId));
        this.brandDetailsMethodsStore.setModels(models);
        this.brandDetailsMethodsStore.setVehicleTypes(types);
        this.brandDetailsMethodsStore.setLastLoadedBrandId(Number(brandId));
        this.brandDetailsMethodsStore.setModelsLoaded(initModelsLoaded);
        this.brandDetailsMethodsStore.setLoading(false);
      })
    ).subscribe();
  }

  public loadMoreModels(): void {
    this.numberModelsLoaded += this.INCREMENT_MODELS_LOADED; 
    const newModelsLoaded:VehicleModelData[] = this.models().slice(0,this.numberModelsLoaded)
    this.brandDetailsMethodsStore.setModelsLoaded(newModelsLoaded);
  }

  private setBrandNameById(brandId: number): void {
    const brands = this.commonFacade.brands();
    const brandsMap = new Map(brands.map(brand => [Number(brand.id), brand.name]));
    const brandName = brandsMap.get(brandId) || '';
    this.brandDetailsMethodsStore.setBrandName(brandName);
  }
  

}
