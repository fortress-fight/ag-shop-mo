import V_NOTICE from "@/components/notice_list.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";

export default class NOTICE_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    notice_handle() {
        const vue_detail_container: any = V_APP(V_NOTICE).$mount("#notice_list")
            .$children[0];
        $(".page-notice .notice-list_container .item").on("click", ev => {
            vue_detail_container.open_detail_panel();
            vue_detail_container.set_data(
                $(ev.currentTarget)
                    .find(".desc")
                    .html()
            );
        });
    }
}

NOTICE_PAGE.add_loaded_callback(["notice_handle"]);
