import U_PAGE from "@/pages/base";
import "slick-carousel";

export default class PROJECT_POST_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    project_post_slider_handle() {
        let slider = $(".page-project_post .project-images_list") as any;
        slider.slick({
            infinite: false,
            slidesToShow: 1,
            arrows: false,
            dots: true
        });
    }
    project_post_spec_handle() {
        $(".page-project_post .project_detail-spec .item").on(
            "click",
            function() {
                if ($(this).hasClass("disable")) return;
                $(this)
                    .siblings()
                    .removeClass("select");
                $(this).addClass("select");
            }
        );
    }
    project_detail_des_handle() {
        $(".page-project_post .buttons-tab_detail .button ").on(
            "click",
            function() {
                $(this)
                    .siblings()
                    .removeClass("select");
                $(this).addClass("select");
                let type = $(this).data("value");
                let select_detail = $(
                    ".page-project_post .des-detail_container[data-type=" +
                        type +
                        "]"
                );

                select_detail.siblings().removeClass("select");
                select_detail.addClass("select");
            }
        );
    }
}

PROJECT_POST_PAGE.add_loaded_callback([
    "project_post_slider_handle",
    "project_post_spec_handle",
    "project_detail_des_handle"
]);
