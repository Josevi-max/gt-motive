import { patchState, withMethods } from "@ngrx/signals";
import { SortOrder } from "../../domain/models/home.models";

export const HomeMethodsStore =
    withMethods((
        store
    ) => ({
        
        setOrderedBrands(orderedBrands: SortOrder): void {
            patchState(store, { orderedBrands });
        },

        setSearchTerm(searchTerm: string): void {
            patchState(store, { searchTerm });
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