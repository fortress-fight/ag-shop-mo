import "@/components/elments";
import store from "@/store";
import router from "@/unit/router";
import { reg_test } from "@/unit/unit";
import BigNumber from "bignumber.js";
import Vue from "vue";

Vue.filter("compute_accuracy", function(
    method: "plus" | "multipliedBy",
    num1: number,
    num2: number
) {
    let result;
    result = new BigNumber(num1)[method](new BigNumber(num2)).toNumber();

    return result;
});

Vue.filter("upload_resource_link", function(link: string) {
    return (window.upload_url || "http://cdn.agender.com") + link;
});
export default function(createElement: typeof Vue.prototype.$createElement) {
    const Instance = new Vue({
        data() {
            return {
                publicPath: process.env.BASE_URL
            };
        },
        router,
        store,
        render: h => h(createElement),
        mounted() {}
    });
    window.V = Instance;
    return Instance;
}

export const v_form_test = {
    username: [
        {
            required: true,
            message: " ",
            trigger: "submit"
        }
    ],
    code: [{ required: true, message: " ", trigger: "submit" }],
    e_mail_code: [{ required: true, message: " ", trigger: "submit" }],
    phone_code: [{ required: true, message: " ", trigger: "submit" }],
    confirm_password: [{ required: true, message: " ", trigger: "submit" }],
    new_password: [{ required: true, message: " ", trigger: "submit" }],
    old_password: [{ required: true, message: " ", trigger: "submit" }],
    password: [{ required: true, message: " ", trigger: "submit" }],
    agree_policy: [
        {
            validator: (rule: any, value: any, callback: Function) => {
                if (!value) {
                    callback(new Error(" "));
                } else {
                    callback();
                }
            },
            trigger: "submit"
        }
    ],
    phone: [
        {
            validator: (rule: any, value: any, callback: Function) => {
                if (!value.code || !value.number.trim()) {
                    callback(new Error(" "));
                } else {
                    callback();
                }
            },
            trigger: "submit"
        }
    ],
    email: [
        {
            validator: (rule: any, value: string = "", callback: Function) => {
                if (!reg_test("email", value)) {
                    callback(new Error(" "));
                } else {
                    callback();
                }
            },
            trigger: "submit"
        }
    ],
    e_mail: [
        {
            validator: (
                rule: any,
                value: any = { value: "" },
                callback: Function
            ) => {
                if (!reg_test("email", value.value)) {
                    callback(new Error(" "));
                } else {
                    callback();
                }
            },
            trigger: "submit"
        }
    ]
};
