import V_MY_PAGE from "@/components/my-page.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";

export default class NOTICE_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    my_page_handle() {
        const vue_detail_container: any = V_APP(V_MY_PAGE).$mount("#my_page")
            .$children[0];
    }
}

NOTICE_PAGE.add_loaded_callback(["my_page_handle"]);
