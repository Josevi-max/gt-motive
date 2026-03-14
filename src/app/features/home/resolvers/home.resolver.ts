import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CommonFacade } from "../../../core/features/commons/state/facade/common.facade";
import { VehicleBrand } from "../../../core/features/commons/models/commons.models";

export const loadBrandsResolver: ResolveFn<VehicleBrand[]> = (route, state) => {
  const commonFacade = inject(CommonFacade);
  
  return commonFacade.loadAllBrands();
};