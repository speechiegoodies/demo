import type { InjectionKey, Ref } from "vue";
import type { Entry } from "./helpers/GoogleSheets";

export const entriesKey = Symbol() as InjectionKey<Ref<Entry[] | null>>;
