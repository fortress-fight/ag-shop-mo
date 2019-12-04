import U_PAGE from "@/pages/base";

export default class STOCKISTS_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    stockists_handle() {
        let preview_image = $(".page-stockists .preview_image");
        $(".page-stockists .stockist_list .item").on("click", function() {
            let image_url =
                $(this)
                    .find("img")
                    .attr("src") || "";
            $(".page-stockists .preview_image img").attr("src", image_url);
            if (preview_image.hasClass("show")) {
                preview_image.removeClass("show");
            } else {
                preview_image.addClass("show");
            }
        });
        preview_image.on("click", function(ev) {
            if (ev.target === this) {
                preview_image.removeClass("show");
            }
        });
    }
}

STOCKISTS_PAGE.add_loaded_callback(["stockists_handle"]);
