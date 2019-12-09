import V_ORDER_PAGE from "@/components/order.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";

export default class ORDER_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    order_handle() {
        const vue_detail_container: any = V_APP(V_ORDER_PAGE).$mount(
            "#address_body"
        ).$children[0];
    }
}

ORDER_PAGE.add_loaded_callback(["order_handle"]);
