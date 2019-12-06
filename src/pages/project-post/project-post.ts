import { add_to_cart } from "@/api/api";
import U_PAGE from "@/pages/base";
import "slick-carousel";

export default class PROJECT_POST_PAGE extends U_PAGE {
    form_data: {
        [propName: string]: string;
    };
    constructor() {
        super();
        this.form_data = {};
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
        let _this = this;
        $(".page-project_post .project_detail-spec .item").on(
            "click",
            function() {
                if ($(this).hasClass("disable")) return;
                $(this)
                    .siblings()
                    .removeClass("select");
                $(this).addClass("select");

                _this.check_spec();
            }
        );
        this.check_spec();
    }

    check_spec() {
        let result = true;
        $(".project_detail-spec .msg").text("");
        $(".project_detail-spec .goods_spec").each((i, e) => {
            if (!$(e).find(".item.select").length) {
                result = false;
            } else {
                this.form_data[$(e).data("key")] = $(e)
                    .find(".item.select")
                    .data("name");
            }
        });

        if (result) {
            $(".project_detail-buy").addClass("enable");
        } else {
            $(".project_detail-buy").removeClass("enable");
        }

        return result;
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

    project_post_button_oper() {
        let add_cart_can_click = true;
        $(".page-project_post .button.add_cart").on("click", () => {
            if (
                !$(".project_detail-buy").hasClass("enable") ||
                !add_cart_can_click
            ) {
                return false;
            }
            add_cart_can_click = false;
            this.form_data.id = $(".project_detail-spec").data("id");
            delete this.form_data.act;
            add_to_cart(this.form_data).then(response => {
                add_cart_can_click = true;
                if ((response as any).code == 2) {
                    $(".project_detail-spec .msg").text("* Inventory shortage");
                    return false;
                }
                $(".project_detail-spec .msg").text("");
                if ($(".project-images_list img").length > 0) {
                    if (!$(".effect-go_to_cart").length) {
                        let thumbnail = $(
                            ".project-images_list .slick-active img"
                        )
                            .eq(0)
                            .attr("src");

                        let dom = $(
                            '<div class="effect-go_to_cart"><img src="' +
                                thumbnail +
                                '"></div>'
                        ).appendTo($(".nav-carts_btn"));
                        setTimeout(() => {
                            dom.addClass("show");
                        });
                        setTimeout(() => {
                            dom.remove();
                        }, 1000);
                    }
                }
            });
        });
        $(".page-project_post .button.buy").on("click", () => {
            if (!$(".project_detail-buy").hasClass("enable")) return false;
            this.form_data.id = $(".project_detail-spec").data("id");
            this.form_data.act = "buy_now";
            add_to_cart(this.form_data).then(response => {
                if ((response as any).code == 2) {
                    $(".project_detail-spec .msg").text("*所选规格库存不足");
                    return false;
                }
                $(".project_detail-spec .msg").text("");
            });
        });
    }
}

PROJECT_POST_PAGE.add_loaded_callback([
    "project_post_slider_handle",
    "project_post_button_oper",
    "project_post_spec_handle",
    "project_detail_des_handle"
]);
