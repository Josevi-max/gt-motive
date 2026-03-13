import { patchState, withMethods } from "@ngrx/signals";
import { SortOrder, VehicleBrand } from "../../domain/models/home.models";

export const HomeMethodsStore =
    withMethods((
        store
    ) => ({

        setBrands(brands: VehicleBrand[]): void {
            patchState(store, {
                brands,
                filteredBrands: brands
            });
        },

        setLoading(loading: boolean): void {
            patchState(store, { loading });
        },

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