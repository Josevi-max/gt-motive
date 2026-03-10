import { inject } from "@angular/core";
import { HomeFacade } from "../state/facade/home.facade";


export const loadBrandsResolver = () => {
  const homeFacade = inject(HomeFacade);
  homeFacade.loadBrands();
};