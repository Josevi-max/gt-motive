import { signalStore } from "@ngrx/signals";
import { HomeMethodsStore } from "./home.methods";
import { HomeStateStore } from "./home.state";

export const HomeStore = signalStore(
  { providedIn: 'root' },
  HomeStateStore,
  HomeMethodsStore
);