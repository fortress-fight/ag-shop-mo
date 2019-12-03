import "@/components/elments";
import store from "@/store";
import router from "@/unit/router";
import BigNumber from "bignumber.js";
import Vue from "vue";

Vue.filter("compute_accuracy", function(
    method: "plus" | "multipliedBy",
    num1: number,
    num2: number
) {
    let result;
    result = new BigNumber(num1)[method](new BigNumber(num2)).toNumber();

    return result;
});

export default function(createElement: typeof Vue.prototype.$createElement) {
    const Instance = new Vue({
        data() {
            return {
                publicPath: process.env.BASE_URL
            };
        },
        router,
        store,
        render: h => h(createElement),
        mounted() {}
    });
    window.V = Instance;
    return Instance;
}
