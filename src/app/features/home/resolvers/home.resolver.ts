import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CommonFacade } from "../../../core/features/commons/state/facade/common.facade";
import { HomeFacade } from "../state/facade/home.facade";
import { tap } from "rxjs";
import { VehicleBrand } from "../../../core/features/commons/models/commons.models";

export const loadBrandsResolver: ResolveFn<VehicleBrand[]> = (route, state) => {
  const commonFacade = inject(CommonFacade);
  const homeFacade = inject(HomeFacade);
  
  return commonFacade.loadAllBrands().pipe(
    tap(() => {
      homeFacade.initFilterBrands();
    })
  );
};