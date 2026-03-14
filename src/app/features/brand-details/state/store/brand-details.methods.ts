import { withMethods, patchState } from '@ngrx/signals';
import { initialBrandDetailsState, BrandDetailsState } from './brand-details.state';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

export const BrandDetailsMethodsStore =
    withMethods((store) => ({

        setVehicleTypes(types: VehicleTypeData[]): void {
            patchState(store, { vehicleTypes: types });
        },

        setModels(models: VehicleModelData[]): void {
            patchState(store, { models });
        },

        setModelsLoaded(modelsLoaded: VehicleModelData[]): void {
            patchState(store, { modelsLoaded });
        },

        setLoading(loading: boolean): void {
            patchState(store, { loading });
        },

        setLastLoadedBrandId(brandId: number | undefined): void {
            patchState(store, { lastLoadedBrandId: brandId });
        },

        setBrandName(brandName: string): void {
            patchState(store, { brandName });
        },

        resetState(): void {
            patchState(store, initialBrandDetailsState);
        },

        updateModelsLoaded(newModelsToLoad: VehicleModelData[]): void {
            patchState(store, (state: BrandDetailsState) => ({
                modelsLoaded: [...state.modelsLoaded, ...newModelsToLoad]
            }));
        },
    }));