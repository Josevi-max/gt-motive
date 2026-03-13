import { signalStore } from "@ngrx/signals";
import { CommonMethodsStore } from "./common.methods";
import { CommonStateStore } from "./common.state";
import { CommonComputedStore } from "./common.computed";

export const CommonStore = signalStore(
  { providedIn: 'root' },
  CommonStateStore,
  CommonComputedStore,
  CommonMethodsStore
);