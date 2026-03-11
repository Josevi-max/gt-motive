import { inject } from "@angular/core";
import { HomeFacade } from "../state/facade/home.facade";
import { ResolveFn } from "@angular/router";


export const loadBrandsResolver: ResolveFn<void> = (route, state) => {
  const homeFacade = inject(HomeFacade);
  homeFacade.loadBrands();
};