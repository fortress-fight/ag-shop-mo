import mask_handle from "@/components/mask_handle";
import Vue from "vue";
import Vuex, { Module } from "vuex";

Vue.use(Vuex);

const carts: Module<any, any> = {
    namespaced: true,
    state() {
        return {
            show: false
        };
    },
    actions: {
        open({ state }) {
            let mask = mask_handle({
                background: "rgba(0, 0, 0, 0.54)"
            });
            mask.mask_click_ev = () => {
                mask.show = false;
                state.show = false;
            };

            state.show = true;
        },
        close({ state }) {
            state.show = false;
        }
    }
};
const login: Module<any, any> = {
    namespaced: true,
    state() {
        return {
            show: false
        };
    },
    actions: {
        open({ state }) {
            state.show = true;
        },
        close({ state }) {
            state.show = false;
        }
    }
};

export default new Vuex.Store({
    modules: {
        carts,
        login
    }
});
