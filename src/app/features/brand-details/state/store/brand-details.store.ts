import { signalStore } from "@ngrx/signals";
import { BrandDetailsStateStore } from "./brand-details.state";
import { BrandDetailsMethodsStore } from "./brand-details.methods";


export const BrandDetailsStore = signalStore(
  { providedIn: 'root' },
  BrandDetailsStateStore,
  BrandDetailsMethodsStore
);