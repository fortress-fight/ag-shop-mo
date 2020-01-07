<template>
    <div class="flex wrapper-send_code">
        <c-input type="text" name="code" v-model="code" placeholder="验证码"></c-input>
        <div
            class="send-verification_code button button-effect button-send_code col flex-cc"
            :class="{ gray: !send_code_ready() }"
            @click="send_phone_verification"
        >
            <span class="text">{{ count != 0 ? `( ${count}S )` : "发送" }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { login, register, send_code, login_by_code } from "@/api/api";
import { reg_test } from "@/unit/unit";
export default Vue.extend({
    data() {
        return {
            count: 0
        };
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        send_code_target: {
            type: Object,
            default() {
                return {
                    type: "phone",
                    value: {
                        code: "",
                        number: ""
                    }
                };
            }
        }
    },
    computed: {
        code: {
            get(this: any) {
                return this.value;
            },
            set(this: any, value: string) {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        send_code_ready(): Boolean {
            let result = false;

            if (this.send_code_target.type !== "phone") {
                result = reg_test("email", this.send_code_target.value);
            } else {
                result =
                    reg_test("not_empty", this.send_code_target.value.number) &&
                    reg_test("not_empty", this.send_code_target.value.code);
            }
            return result && this.count == 0;
        },
        send_phone_verification() {
            if (!this.send_code_ready()) {
                return false;
            }
            const v_this = this;
            function count() {
                v_this.count = 60;
                let timer = setInterval(() => {
                    if (v_this.count != 0) {
                        v_this.count -= 1;
                    } else {
                        clearInterval(timer);
                    }
                }, 1000);
            }
            if (this.send_code_target.type === "phone") {
                if (!this.send_code_target.value.number) {
                    alert("Phone number is required.");
                    return false;
                }
                send_code({
                    recieve: this.send_code_target.value.number,
                    pre: this.send_code_target.value.code
                });
                count.call(this);
            } else {
                if (!this.send_code_target.value) {
                    alert("Email number is required.");
                    return false;
                }
                send_code({
                    recieve: this.send_code_target.value
                });
                count.call(this);
            }
        }
    }
});
</script>
<style lang="scss">
.wrapper-send_code .button-send_code {
    font-size: 28px;

    width: 253px;
    margin-left: 30px;

    text-align: center;
    text-transform: capitalize;

    color: #fff;
    background: #000;

    &.gray {
        background: #999;
    }
}
</style>
