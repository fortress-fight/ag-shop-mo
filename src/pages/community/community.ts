import V_COMMUNITY from "@/components/community.vue";
import U_PAGE from "@/pages/base";
import V_APP from "@/unit/vue";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

export default class COMMUNITY_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    community_handle() {
        const vue_community_list: any = V_APP(V_COMMUNITY).$mount(
            "#community_list"
        ).$children[0];
        $(".community_list .item").on("click", function(ev) {
            let imgs: string[] = [];
            let show_item = $(this);
            show_item.find(".images_wrapper>div").each((i, img) => {
                imgs.push($(img).data("img"));
            });
            vue_community_list.open_detail_panel();
            vue_community_list.set_list({
                title: show_item.find(".title").text(),
                des: show_item.find(".des").text(),
                images: imgs
            });
        });

        var msnry = new Masonry(".community_list", {
            itemSelector: ".item"
        });
        imagesLoaded(".community_list").on("progress", function() {
            msnry.layout;
        });
    }
}

COMMUNITY_PAGE.add_loaded_callback(["community_handle"]);
