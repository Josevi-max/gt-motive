import { withComputed } from "@ngrx/signals";
import { computed } from "@angular/core";

export const CommonComputedStore =
    withComputed(({ brands, loading }) => ({
        isLoading: computed(() => loading()),
        brands: computed(() => brands()),      
    }))