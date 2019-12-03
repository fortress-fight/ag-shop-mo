import V_CARTS from "@/components/carts.vue";
import { BASE_PAGE } from "@/unit/unit";
import V_APP from "@/unit/vue";

class U_PAGE extends BASE_PAGE {
    constructor() {
        super();
    }
    nav_handle() {
        $(".nav-menu_btn").on("click", function() {
            $(".nav-container").addClass("show");
        });
        $(".nan-close_btn").on("click", function() {
            $(".nav-container").removeClass("show");
        });
        $(".nav-items_container .nav-item").on("click", function() {
            if (this.tagName.toLowerCase() != "a") {
                $(this)
                    .siblings()
                    .removeClass("active");
                $(this).addClass("active");
            }
        });
    }
    search_handle() {
        let $search_form = $(".nav-search_bar").find("form");
        let $search_input = $("#search_input");
        function submit(): Boolean {
            const val = $search_input.val();
            if (val && String(val).trim().length) {
                $search_form.trigger("submit");
                return true;
            }
            return false;
        }
        $search_input.on({
            focus: function() {
                $(".nav-search_bar").addClass("state_focus");
            },
            blur: function() {
                $(".nav-search_bar").removeClass("state_focus");
            },
            keydown: function(ev) {
                if (ev.keyCode === 13) {
                    submit();
                    return false;
                }
            }
        });
        $(".nav-search_bar .ic").on("click", function(ev) {
            if (!submit()) {
                $search_input.focus();
            }
        });
    }
    carts_handle() {
        V_APP(V_CARTS).$mount("#carts");
        $(".nav-carts_btn").on("click", function() {
            window.V.$store.dispatch("carts/open");
        });
    }
}

U_PAGE.add_loaded_callback(["nav_handle", "search_handle", "carts_handle"]);

export default U_PAGE;
