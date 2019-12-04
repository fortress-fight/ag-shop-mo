import V_COLLECTION from "@/components/collection_list.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";

export default class COLLECTION_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    collection_handle() {
        const vue_detail_container: any = V_APP(V_COLLECTION).$mount(
            "#panel-collection_detail"
        ).$children[0];
        $(".page-collection .collection_list .item_link").on("click", ev => {
            vue_detail_container.open_detail_panel();
            vue_detail_container.set_data($(ev.currentTarget).attr("href"));
            return false;
        });
    }
}

COLLECTION_PAGE.add_loaded_callback(["collection_handle"]);
