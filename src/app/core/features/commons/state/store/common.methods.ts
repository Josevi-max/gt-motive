import { patchState, withMethods } from "@ngrx/signals";
import { VehicleBrand } from "../../models/commons.models";

export const CommonMethodsStore =
    withMethods((
        store
    ) => ({

        setBrands(brands: VehicleBrand[]): void {
            patchState(store, {
                brands,
            });
        },

        setLoading(loading: boolean): void {
            patchState(store, { loading });
        },

        resetState(): void {
            patchState(store, {
                brands: []
            });
        }
    }));