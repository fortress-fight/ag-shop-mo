import V_CARTS from "@/components/carts.vue";
import V_LOGIN from "@/components/login.vue";
import { BASE_PAGE } from "@/unit/unit";
import V_APP from "@/unit/vue";
import anime from "animejs";

class U_PAGE extends BASE_PAGE {
    constructor() {
        super();
    }
    nav_handle() {
        $(".nav-menu_btn").on("click", function() {
            anime({
                targets: $(".nav-container")[0],
                opacity: 1,
                translateY: ["10.667vw", 0],
                translateX: ["8vw", 0],
                begin() {
                    $(".nav-container").css({
                        display: "block"
                    });
                },
                duration: 360,
                easing: "cubicBezier(0.25, 0.1, 0.25, 1)"
            });
        });
        $(".nan-close_btn").on("click", function() {
            anime({
                targets: $(".nav-container")[0],
                opacity: 0,
                translateY: [0, "10.667vw"],
                translateX: [0, "8vw"],
                easing: "cubicBezier(0.25, 0.1, 0.25, 1)",
                duration: 360,
                complete() {
                    $(".nav-container").css({
                        display: "none"
                    });
                }
            });
        });
        $(".nav-items_container .login_panel-open_btn").on("click", function() {
            window.V.$store.dispatch("login/open");
            return false;
        });
        $(".nav-items_container .nav-items:first-child .nav-item").on(
            "click",
            function() {
                if (this.tagName.toLowerCase() != "a") {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                    } else {
                        $(this)
                            .siblings()
                            .removeClass("active");
                        $(this).addClass("active");
                    }
                }
            }
        );
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
    login_handle() {
        this.make_login_panel();
    }
    make_login_panel() {
        V_APP(V_LOGIN).$mount("#login");
    }
}

U_PAGE.add_loaded_callback([
    "nav_handle",
    "search_handle",
    "carts_handle",
    "login_handle"
]);

export default U_PAGE;
