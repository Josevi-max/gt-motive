import { withComputed } from "@ngrx/signals"
import { computed, inject } from "@angular/core";
import { CommonFacade } from "../../../../core/features/commons/state/facade/common.facade";
import { SearchEngine } from "../../domain/services/search-engine";

export const HomeComputedStore = withComputed(({ searchTerm, orderedBrands }, searchEngine = inject(SearchEngine), commonFacade = inject(CommonFacade)) => {
    const filteredBrands = computed(() => {
        const allBrands = commonFacade.brands();

        return searchEngine.filterBrands(
            searchTerm(),
            allBrands,
            orderedBrands()
        );
    });

    return {
        filteredBrands,
        filteredResultsCount: computed(() => filteredBrands().length)
    };
});