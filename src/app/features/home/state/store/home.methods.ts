import { patchState, withMethods } from "@ngrx/signals";
import { SortOrder } from "../../domain/models/home.models";
import { VehicleBrand } from "../../../../core/features/commons/models/commons.models";

export const HomeMethodsStore =
    withMethods((
        store
    ) => ({
        
        setOrderedBrands(orderedBrands: SortOrder): void {
            patchState(store, { orderedBrands });
        },

        setFilteredBrands(filteredBrands: VehicleBrand[]): void {
            patchState(store, { filteredBrands });
        },

        resetState(): void {
            patchState(store, {
                brands: [],
                filteredBrands: [],
                selectedBrand: null,
                loading: false,
                error: null,
                searchTerm: ''
            });
        }
    }));