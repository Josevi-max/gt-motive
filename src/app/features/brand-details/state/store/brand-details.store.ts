import { signalStore } from "@ngrx/signals";
import { BrandDetailsStateStore } from "./brand-details.state";
import { BrandDetailsMethodsStore } from "./brand-details.methods";
import { BrandDetailsComputedStore } from "./brand-details.computed";


export const BrandDetailsStore = signalStore(
  { providedIn: 'root' },
  BrandDetailsStateStore,
  BrandDetailsMethodsStore,
  BrandDetailsComputedStore
);