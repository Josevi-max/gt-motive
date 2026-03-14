import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { BrandDetailsFacade } from "../state/facade/brand-details.facade";
import { CommonFacade } from "../../../core/features/commons/state/facade/common.facade";
import { tap } from "rxjs";
import { VehicleBrand } from "../../../core/features/commons/models/commons.models";


export const loadBrandsDetailsResolver: ResolveFn<VehicleBrand[]> = (route, state) => {
  const brandDetailsFacade = inject(BrandDetailsFacade);
  const commonFacade = inject(CommonFacade);
  return commonFacade.loadAllBrands().pipe(
    tap(() => {
      brandDetailsFacade.loadBrandDetails(route.params['brandId']);
    })
  );
};