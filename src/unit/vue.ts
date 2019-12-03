import router from "@/unit/router";
import store from "@/unit/store";
import Vue from "vue";

export default function(createElement: typeof Vue.prototype.$createElement) {
    const Instance = new Vue({
        router,
        store,
        render: h => h(createElement),
        mounted() {}
    });
    window.V = Instance;
    return Instance;
}
