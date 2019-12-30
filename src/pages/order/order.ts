import { to_pay } from "@/api/api";
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

    pay_button() {
        $(".page-order .pay_button").on("click", function() {
            let address_id = $(".order_container .address_list").attr(
                "data-select_address_id"
            );
            if (typeof address_id == "undefined") {
                alert("Please add address");
                return false;
            }
            to_pay({
                order_id: $(".page-order .order-list").attr("data-order-id"),
                address_id: address_id,
                payment: $(".page-order .pay_method_group").attr(
                    "data-select_pay"
                )
            });
        });
    }
}

ORDER_PAGE.add_loaded_callback(["order_handle", "pay_button"]);
