import { withComputed } from "@ngrx/signals"
import { computed } from "@angular/core";

export const BrandDetailsComputedStore = withComputed(({ vehicleTypes, models, modelsLoaded }) => ({
    totalVehicleTypes: computed(() => {
        const total = vehicleTypes().length;
        return total;
    }),
    totalModels: computed(() => {
        const total = models().length;
        return total;
    }),
    disabledLoadMoreModelsButtons: computed(() => {
        const totalModels = models().length;
        const totalModelsLoaded = modelsLoaded().length;
        return totalModels === totalModelsLoaded
    })
}))