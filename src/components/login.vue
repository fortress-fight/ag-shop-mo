<template>
    <div class="wrapper-login_panel" :class="is_open ? 'show' : ''">
        <div class="button login_panel-close_button" @click="is_open = false">
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="login_panel w">
            <div class="login_panel-header">
                <span class="text">{{ tab_cards[panel_active_card].name }}</span>
            </div>
            <div class="login_panel-body">
                <c-tab-card-box
                    :cards="tab_cards"
                    :active_card="panel_active_card"
                    @change="tab_cards_change"
                >
                    <template #login_card>
                        <div class="card login_card">
                            <div class="form">
                                <el-form
                                    :model="login_form"
                                    class="form_group"
                                    ref="form_login"
                                    :rules="v_form_test"
                                >
                                    <el-form-item class="row" prop="username">
                                        <c-input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            v-model="login_form.username"
                                        ></c-input>
                                    </el-form-item>
                                    <el-form-item class="row" prop="password">
                                        <c-input
                                            type="password"
                                            name="password"
                                            show-password
                                            placeholder="Password"
                                            v-model="login_form.password"
                                        ></c-input>
                                    </el-form-item>
                                    <div
                                        class="error_message text"
                                        v-if="login_error_message"
                                    >{{ login_error_message }}</div>

                                    <div class="form_footer">
                                        <div
                                            class="button form-submit_btn"
                                            @click="form_submit('login')"
                                        >
                                            <span class="text">login</span>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                            <div class="oper login_panel-account_oper">
                                <span
                                    class="button forgot_password-button"
                                    @click="panel_active_card = 2"
                                >Forgot Password</span>
                                <i class="line"></i>
                                <span
                                    class="button register_account-button"
                                    @click="panel_active_card = 1"
                                >Don't have an account?</span>
                            </div>
                        </div>
                    </template>
                    <template #forgot_password_card>
                        <div class="card forgot_password_card">
                            <div class="form">
                                <el-form
                                    :model="forgot_password_form"
                                    class="form_group"
                                    ref="forgot_password"
                                    :rules="v_form_test"
                                >
                                    <el-form-item
                                        class="row"
                                        :prop="forgot_password_form.use == 'phone'? 'phone': 'email'"
                                    >
                                        <c-telephone-pre
                                            v-if="forgot_password_form.use == 'phone'"
                                            v-model="forgot_password_form.phone"
                                        ></c-telephone-pre>
                                        <c-input
                                            v-else
                                            v-model="forgot_password_form.email"
                                            type="text"
                                            name="text"
                                            placeholder="E-mail"
                                        ></c-input>
                                    </el-form-item>

                                    <el-form-item class="row" prop="code">
                                        <c-send-code
                                            v-model="forgot_password_form.code"
                                            :send_code_target="{
                                            type: forgot_password_form.use,
                                            value: forgot_password_form.use== 'phone' ?  forgot_password_form.phone:forgot_password_form.email
                                        }"
                                        ></c-send-code>
                                    </el-form-item>
                                    <el-form-item class="row" prop="new_password">
                                        <c-input
                                            type="text"
                                            name="password"
                                            placeholder="New Password"
                                            v-model="forgot_password_form.new_password"
                                        ></c-input>
                                    </el-form-item>
                                    <el-form-item class="row" prop="old_password">
                                        <c-input
                                            type="text"
                                            placeholder="Confirm Password"
                                            v-model="forgot_password_form.old_password"
                                        ></c-input>
                                    </el-form-item>
                                    <div
                                        class="error_message text"
                                        v-if="login_error_message"
                                    >{{ login_error_message }}</div>
                                    <div class="form_footer">
                                        <div
                                            class="button form-submit_btn"
                                            @click="form_submit('forgot_password')"
                                        >
                                            <span class="text">submit</span>
                                        </div>
                                    </div>
                                </el-form>
                            </div>

                            <div class="oper login_panel-account_oper">
                                <span
                                    v-if="forgot_password_form.use == 'phone'"
                                    class="button forgot_password-button"
                                    @click="forgot_password_form.use = 'email'"
                                >Use E-mail</span>
                                <span
                                    v-else
                                    class="button forgot_password-button"
                                    @click="forgot_password_form.use = 'phone'"
                                >Use phone</span>
                                <i class="line"></i>
                                <span
                                    class="button login-button"
                                    @click="panel_active_card = 0"
                                >Log In</span>
                            </div>
                        </div>
                    </template>
                    <template #register_card>
                        <div class="card register_card">
                            <div class="form">
                                <el-form
                                    :model="regist_form"
                                    class="form_group"
                                    ref="form_register"
                                    :rules="v_form_test"
                                >
                                    <el-form-item class="row" prop="username">
                                        <c-input
                                            name="username"
                                            placeholder="Username"
                                            v-model="regist_form.username"
                                        ></c-input>
                                    </el-form-item>
                                    <el-form-item class="row" prop="password">
                                        <c-input
                                            name="password"
                                            show-password
                                            placeholder="Password"
                                            v-model="regist_form.password"
                                        ></c-input>
                                    </el-form-item>
                                    <el-form-item class="row" prop="confirm_password">
                                        <c-input
                                            show-password
                                            name="confirm_password"
                                            v-model="
                                                    regist_form.confirm_password
                                                "
                                            placeholder="Confirm Password"
                                        ></c-input>
                                    </el-form-item>
                                    <div
                                        class="error_message text"
                                        v-if="login_error_message"
                                    >{{ login_error_message }}</div>
                                    <div class="form_footer">
                                        <div
                                            class="button form-submit_btn"
                                            @click="form_submit('register')"
                                        >
                                            <span class="text">register</span>
                                        </div>
                                    </div>

                                    <el-form-item class="row agree_policy" prop="agree_policy">
                                        <div class="privacy_policy_check" ref="polic_check">
                                            <c-checkbox v-model="regist_form.agree_policy">
                                                <span
                                                    class="text"
                                                    :label="true"
                                                >I agree with the privacy policy.</span>
                                            </c-checkbox>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <div class="oper login_panel-account_oper">
                                <span
                                    class="button login-button"
                                    @click="panel_active_card = 0"
                                >Already Have An Account</span>
                            </div>
                        </div>
                    </template>
                </c-tab-card-box>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { v_form_test } from "@/unit/vue";
import { login, register, send_code, login_by_code } from "@/api/api";
import { reg_test } from "@/unit/unit";
export default Vue.extend({
    data() {
        return {
            phone_verification_count: 0,
            panel_active_card: 0,
            tab_cards: [
                {
                    name: "log in",
                    slot_name: "login_card"
                },
                {
                    name: "register",
                    slot_name: "register_card"
                },
                {
                    name: "forgot password",
                    slot_name: "forgot_password_card"
                }
            ],
            login_form: {
                username: "",
                password: ""
            },
            login_error_message: "",
            forgot_password_form: {
                use: "phone",
                phone: {
                    code: "",
                    number: ""
                },
                email: "",
                code: "",
                new_password: "",
                old_password: ""
            },
            regist_form: {
                username: "",
                password: "",
                confirm_password: "",
                agree_policy: false
            },
            v_form_test
        };
    },
    methods: {
        form_submit(type) {
            switch (type) {
                case "login":
                    this.$refs.form_login.validate(valid => {
                        if (valid) {
                            login(this.login_form).then(data => {
                                this.login_error_message = data.msg;
                            });
                        } else {
                            this.login_error_message =
                                "These field is required.";
                            return false;
                        }
                    });
                    break;
                case "forgot_password":
                    this.$refs.forgot_password.validate(valid => {
                        if (valid) {
                            login(this.login_form).then(data => {
                                this.login_error_message = data.msg;
                            });
                        } else {
                            this.login_error_message =
                                "These field is required.";
                            return false;
                        }
                    });
                    break;
                case "register":
                    this.$refs.form_register.validate(valid => {
                        if (valid) {
                            if (
                                this.regist_form.confirm_password !==
                                this.regist_form.password
                            ) {
                                this.login_error_message =
                                    "Two input password must be consistent!";
                                return false;
                            }
                        } else {
                            this.login_error_message =
                                "These field is required.";
                            return false;
                        }
                    });
                    break;

                default:
                    break;
            }
        },
        tab_cards_change() {
            this.$refs.form_login.resetFields();
            this.$refs.forgot_password.resetFields();
            this.login_error_message = "";
        }
    },
    computed: {
        is_open: {
            get() {
                return this.$store.state.login.show;
            },
            set(value) {
                if (value) {
                    this.$store.dispatch("login/open");
                } else {
                    this.$store.dispatch("login/close");
                }
            }
        }
    }
});
</script>

<style lang="scss">
.wrapper-login_panel {
    position: fixed;
    z-index: 910;
    top: 0;

    visibility: hidden;
    overflow: auto;

    width: 100%;
    height: 100%;
    padding-top: 80px;

    transition: 0.36s ease;

    opacity: 0;
    background-color: #fff;
    .login_panel-close_button {
        font-size: 24px;

        position: absolute;
        top: 0;
        right: 0;

        display: flex;

        width: 80px;
        height: 80px;

        align-items: center;
        justify-content: center;
    }
    &.show {
        visibility: visible;

        opacity: 1;
    }
}

.login_panel {
    padding-top: 120px;
    .row.agree_policy {
        padding-top: 18px;

        color: #999;
        .el-checkbox__label {
            padding-left: 20px;
        }
    }
    .login_panel-header {
        font-family: $FM;
        font-size: 34px;
        line-height: 38px;

        margin-bottom: 54px;

        text-align: center;
        text-transform: uppercase;

        color: #000;
    }
    .form {
        margin-bottom: 85px;
    }
    .form_footer {
        font-family: $FM;
        font-size: 28px;
        line-height: 104px;

        margin-top: 72px;

        text-align: center;
        text-transform: uppercase;

        color: #fff;
        background-color: #000;
    }
    .row {
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .login_panel-account_oper {
        font-size: 24px;
        line-height: 28px;

        color: #999;
        .button {
            display: block;

            text-align: center;
        }
        .line {
            display: block;

            width: 350px;
            height: 1px;
            margin: 15px auto;

            background-color: #eaeaea;
        }
    }
    .error_message {
        font-size: 24px;
        line-height: 28px;

        text-transform: uppercase;

        color: #f56c6c;
    }
}
</style>
