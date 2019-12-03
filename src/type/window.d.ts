import Vue from "Vue";
import { CombinedVueInstance } from "vue/types/vue";

declare global {
    interface Window {
        V: CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
    }
}
