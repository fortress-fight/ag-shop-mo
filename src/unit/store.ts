import Vue from "vue";
import Vuex, { Module } from "vuex";

Vue.use(Vuex);

const base: Module<any, any> = {
    namespaced: true,
    state() {
        return {};
    },
    actions: {
        base({ state }) {}
    }
};
export default new Vuex.Store({
    modules: {}
});
