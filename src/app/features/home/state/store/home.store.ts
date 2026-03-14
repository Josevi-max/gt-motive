import { signalStore } from "@ngrx/signals";
import { HomeMethodsStore } from "./home.methods";
import { HomeStateStore } from "./home.state";
import { HomeComputedStore } from "./home.computed";

export const HomeStore = signalStore(
  { providedIn: 'root' },
  HomeStateStore,
  HomeComputedStore,
  HomeMethodsStore
  
);