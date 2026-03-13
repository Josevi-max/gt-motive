import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { BrandDetailsFacade } from "../state/facade/brand-details.facade";


export const loadBrandsDetailsResolver: ResolveFn<void> = (route, state) => {
  const brandDetailsFacade = inject(BrandDetailsFacade);
  debugger;
  brandDetailsFacade.loadBrandDetails(route.params['brandId']);
};