import V_IMAGES from "@/components/images.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";

export default class NOTICE_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    images_handle() {
        const vue_images_list: any = V_APP(V_IMAGES).$mount("#images_list")
            .$children[0];
        $(".page-images_list .item").on("click", ev => {
            vue_images_list.open_detail_panel();
            vue_images_list.set_list($(ev.currentTarget).data("url"));
        });
    }
}

NOTICE_PAGE.add_loaded_callback(["images_handle"]);
