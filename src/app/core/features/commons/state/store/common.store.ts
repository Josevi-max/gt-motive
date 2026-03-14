import { signalStore } from "@ngrx/signals";
import { CommonMethodsStore } from "./common.methods";
import { CommonStateStore } from "./common.state";

export const CommonStore = signalStore(
  { providedIn: 'root' },
  CommonStateStore,
  CommonMethodsStore
);