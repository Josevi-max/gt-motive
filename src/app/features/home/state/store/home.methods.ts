import { patchState, signalStore, withMethods } from "@ngrx/signals";
import { VehicleBrand } from "../../domain/models/home.models";

export const HomeMethodsStore = signalStore(
    { providedIn: 'root' },
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

        setError(error: string | null): void {
            patchState(store, { error });
        },

        setSelectedBrand(brand: VehicleBrand | null): void {
            patchState(store, { selectedBrand: brand });
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
    })));