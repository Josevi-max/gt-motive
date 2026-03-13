import { withMethods, patchState } from '@ngrx/signals';
import { initialBrandDetailsState } from './brand-details.state';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

export const BrandDetailsMethodsStore =
    withMethods((store) => ({

        setVehicleTypes(types: VehicleTypeData[]): void {
            patchState(store, { vehicleTypes: types });
        },

        setModels(models: VehicleModelData[]): void {
            patchState(store, { models });
        },

        setLoading(loading: boolean): void {
            patchState(store, { loading });
        },

        resetState(): void {
            patchState(store, initialBrandDetailsState);
        },
    }))