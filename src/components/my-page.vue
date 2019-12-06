<template>
    <div class="wrapper-my_page">
        <div class="top_tab_bar">
            <div
                class="item"
                :class="{ active: sidebar_active == 'security' }"
                @click="set_sider('security')"
            >
                <span class="text">security setting</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'order' }"
                @click="set_sider('order')"
            >
                <span class="text">order</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'address' }"
                @click="set_sider('address')"
            >
                <span class="text">address</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'comment' }"
                @click="set_sider('comment')"
            >
                <span class="text">upload pictures</span>
            </div>
        </div>
        <div class="body-my_page">
            <div class="my_page-container setting_panel" v-if="sidebar_active == 'security'">
                <div class="container-header">
                    <span class="text">Account information</span>
                </div>

                <div class="container-body">
                    <transition-group
                        name="tab_panel"
                        mode="in-out"
                        tag="div"
                        class="setting_panel-container"
                        v-on:enter="enter"
                        v-on:leave="leave"
                    >
                        <div
                            class="col setting_panel-base"
                            v-if="setting_panel == 'base'"
                            key="base"
                        >
                            <div class="row">
                                <div class="name">
                                    <span class="text">Name</span>
                                </div>
                                <div class="value">
                                    <span class="text">{{user_info.alias}}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">
                                    <span class="text">Phone</span>
                                </div>
                                <div class="value flex">
                                    <span class="text">{{user_info.mobile}}</span>
                                    <div
                                        class="verification_button button-effect2 button col"
                                        @click="setting_panel = 'editor_phone'"
                                    >
                                        <span class="text">Verification ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">
                                    <span class="text">E-mail</span>
                                </div>
                                <div class="value flex">
                                    <span class="text">{{user_info.email}}</span>
                                    <div
                                        class="verification_button button-effect2 button col"
                                        @click="setting_panel = 'editor_email'"
                                    >
                                        <span class="text">Verification ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="button button-setting_editor_submit button-setting_submit button-effect"
                                    @click="setting_panel = 'editor_name'"
                                >
                                    <span class="text">EDIT</span>
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="button button-change_password"
                                    @click="setting_panel = 'password'"
                                >
                                    <span class="text">Change Password</span>
                                </div>
                            </div>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_name'"
                            key="editor_name"
                        >
                            <el-form ref="name_register" :model="setting" :rules="v_form_test">
                                <el-form-item prop="username">
                                    <div class="row">
                                        <div class="name col flex-yc">
                                            <span class="text">Name</span>
                                        </div>
                                        <div class="value col">
                                            <c-input v-model="setting.alias"></c-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="update_user_name()"
                                    >
                                        <span class="text">SUBMIT</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_phone'"
                            key="editor_phone"
                        >
                            <el-form ref="phone_register" :model="setting" :rules="v_form_test">
                                <el-form-item prop="phone">
                                    <div class="row">
                                        <div class="name flex-yc col">
                                            <span class="text">Phone</span>
                                        </div>
                                        <div class="value col">
                                            <c-telephone-pre v-model="setting.phone"></c-telephone-pre>
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item prop="phone_code">
                                    <div class="row phone_verification">
                                        <div class="name flex-yc col"></div>
                                        <div class="value col">
                                            <c-send-code
                                                v-model="setting.phone_code"
                                                :send_code_target="{
                                                type: 'phone',
                                                value: setting.phone
                                            }"
                                            ></c-send-code>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="submit_phone"
                                    >
                                        <span class="text">SUBMIT</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_email'"
                            key="editor_email"
                        >
                            <el-form ref="email_register" :model="setting" :rules="v_form_test">
                                <el-form-item prop="e_mail">
                                    <div class="row">
                                        <div class="name col flex-yc">
                                            <span class="text">E-mail</span>
                                        </div>
                                        <div class="value col">
                                            <c-input v-model="setting.e_mail.value"></c-input>
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item prop="e_mail_code">
                                    <div class="row mail_verification">
                                        <div class="name col"></div>
                                        <div class="value col">
                                            <c-send-code
                                                v-model="setting.e_mail_code"
                                                :send_code_target="{
                                                type: 'email',
                                                value: setting.e_mail.value
                                            }"
                                            ></c-send-code>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="submit_email"
                                    >
                                        <span class="text">SUBMIT</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-change_password"
                            v-if="setting_panel == 'password'"
                            key="password"
                        >
                            <el-form
                                ref="password_register"
                                :model="change_password_data"
                                :rules="v_form_test"
                            >
                                <div class="row">
                                    <el-form-item prop="old_password">
                                        <c-input
                                            placeholder="Old password"
                                            v-model="change_password_data.old_password"
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>
                                </div>
                                <div class="row">
                                    <el-form-item prop="new_password">
                                        <c-input
                                            v-model="change_password_data.new_password"
                                            placeholder="New password"
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>

                                    <div class="message">
                                        <span class="text">
                                            Please enter a new password of 6 to 16
                                            characters, including letters and
                                            numbers
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <el-form-item prop="confirm_password">
                                        <c-input
                                            placeholder="Confirm password"
                                            v-model="change_password_data.confirm_password"
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>

                                    <div
                                        class="error_message text"
                                        v-if="error_message"
                                    >{{ error_message }}</div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button-setting_submit button button-effect button-setting_submit"
                                        @click="change_password_submit"
                                    >
                                        <span class="text">SUBMIT</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password_cancel button-effect2"
                                        @click="change_password_cancel"
                                    >
                                        <span class="text">Cancel</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </transition-group>
                </div>
            </div>

            <div class="my_page-container order_panel" v-if="sidebar_active == 'order'"></div>

            <div class="my_page-container address_panel" v-if="sidebar_active == 'address'"></div>

            <div class="my_page-container comment_panel" v-if="sidebar_active == 'comment'"></div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { v_form_test } from "@/unit/vue";
import {
    order_list,
    get_address,
    user_picture_list,
    upload_picture,
    add_address,
    get_user,
    user_update,
    order_detail,
    send_code,
    user_info_bind,
    change_pwdt
} from "@/api/api";
import anime from "animejs";
export default Vue.extend({
    data() {
        return {
            sidebar_active: "security",
            setting_panel: "base",
            setting: {
                alias: "",
                phone: {
                    code: "",
                    number: ""
                },
                phone_code: "",
                e_mail: {
                    value: ""
                },
                e_mail_code: ""
            },
            v_form_test,
            user_info: {
                alias: "",
                mobile: "",
                email: ""
            },
            change_password_data: {
                new_password: "",
                old_password: "",
                confirm_password: ""
            },
            error_message: ""
        };
    },
    methods: {
        enter(el: HTMLElement, done: Function) {
            anime({
                targets: el,
                left: ["100%", 0],
                opacity: [0, 1],
                duration: 260,
                complete() {
                    $(el).css({
                        postion: "relative"
                    });
                    $(el)
                        .siblings()
                        .css({
                            postion: "absolute"
                        });
                    done();
                },
                easing: "linear"
            });
        },
        leave(el, done) {
            anime({
                targets: el,
                opacity: [1, 0],
                duration: 260,
                complete: done,
                easing: "linear"
            });
        },
        set_sider(name: string) {
            this.sidebar_active = name;
        },
        update_user_name(this: any) {
            this.$refs.name_register.validate((valid: Boolean) => {
                if (valid) {
                    user_update({
                        alias: this.setting.alias
                    }).then(() => {
                        this.user_info.alias = this.setting.alias;
                        this.setting.alias = "";
                        this.setting_panel = "base";
                    });
                }
            });
        },
        submit_phone(this: any) {
            this.$refs.phone_register.validate((valid: Boolean) => {
                if (valid) {
                    user_info_bind({
                        code: this.setting.phone_code,
                        device: this.setting.phone.number
                    }).then(res => {
                        this.setting_panel = "base";
                        this.setting.phone_code = "";
                        this.setting.phone.number = "";
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submit_email(this: any) {
            this.$refs.email_register.validate((valid: Boolean) => {
                if (valid) {
                    user_info_bind({
                        code: this.setting.e_mail_code,
                        device: this.setting.e_mail.value
                    }).then(res => {
                        this.setting_panel = "base";
                        this.setting.e_mail_code = "";
                        this.setting.e_mail.value = "";
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        change_password_cancel() {
            this.setting_panel = "base";
            this.change_password_data = {
                new_password: "",
                old_password: "",
                confirm_password: ""
            };
        },
        change_password_submit(this: any) {
            this.$refs.password_register.validate((valid: any) => {
                if (valid) {
                    if (this.change_password_data !== this.confirm_password) {
                        this.error_message =
                            "Two input password must be consistent!";
                    } else {
                        change_pwdt({
                            pwd: this.change_password_data.old_password,
                            new_pwd: this.change_password_data.new_password
                        }).then(res => {
                            this.$message({
                                message: "SUCCESS",
                                type: "success"
                            });
                            this.change_password_data = {
                                new_password: "",
                                old_password: "",
                                confirm_password: ""
                            };
                        });
                    }
                }
            });
        }
    },
    created() {
        let search_str = window.location.search.slice(1);
        let search_str_arr = [];
        let search_str_data: any = {};
        if (search_str) {
            search_str_arr = search_str.split("&");
            search_str_arr.forEach(item => {
                let arr = item.split("=");
                search_str_data[arr[0]] = arr[1];
            });
        }

        if (search_str_data.tab) {
            this.sidebar_active = search_str_data.tab;
        }

        get_user().then(res => {
            this.user_info = {
                alias: res.data.alias || "",
                mobile: res.data.mobile || "",
                email: res.data.email || ""
            };
        });
    }
});
</script>
<style lang="scss">
.top_tab_bar {
    line-height: 77px;

    overflow: auto;

    width: 100%;

    white-space: nowrap;

    border-bottom: 1px solid #eaeaea;
    .item {
        font-family: $FM;
        font-size: 24px;

        display: inline-block;

        margin-right: 55px;

        transition: 0.36s ease;
        text-transform: uppercase;

        color: #999;
        &:last-child {
            margin: 0;
        }
        &.active {
            color: #000;
        }
    }
}
.my_page-container {
    .button-setting_submit {
        font-family: $FM;
        font-size: 28px;

        display: flex;

        width: 290px;
        height: 80px;
        margin-top: 38px;
        margin-bottom: 33px;

        color: #fff;
        background: #000;

        align-items: center;
        justify-content: center;
    }
    &.setting_panel {
        .setting_panel-container {
            position: relative;

            overflow-x: hidden;
            & > .col {
                position: absolute;
                top: 0;
                left: 100%;

                background: #fff;
                &:first-child {
                    position: relative;
                    left: 0;
                }
            }
        }
        .row {
            font-family: $FM;
            font-size: 28px;
            line-height: 50px;

            display: flex;

            margin-bottom: 20px;
        }
        .name {
            flex: 0 0 auto;

            width: 120px;

            color: #666;
        }
        .value {
            font-family: MTTMILANO-REGULAR;

            flex: 1 1 auto;

            color: #000;
            .text:first-child {
                display: inline-block;

                min-width: 220px;
            }
        }
        .verification_button {
            font-size: 24px;

            margin-left: 26px;

            color: #999;
        }
        .container-header {
            font-family: $FM;
            font-size: 34px;
            line-height: 132px;

            text-transform: uppercase;

            color: #000;
        }
        .button-change_password {
            font-size: 24px;
            line-height: 36px;

            margin-top: 12px;

            text-decoration: underline;

            color: #999;
        }
        .setting_panel-change_password {
            .row {
                font-family: MTTMILANO-REGULAR;

                display: block;
            }
            .message {
                font-size: 24px;
                line-height: 30px;

                box-sizing: border-box;
                width: 564px;
                padding: 13px 0;
                padding-left: 40px;

                color: #999;
            }

            .button-setting_submit {
                width: 100%;
                margin-bottom: 0;
            }
        }
        &-base {
            //
        }
        .button-change_password_cancel {
            font-size: 24px;

            text-align: center;

            color: #999;
        }
    }
    .error_message {
        font-size: 24px;
        line-height: 28px;

        padding-top: 20px;

        text-transform: uppercase;

        color: #f56c6c;
    }
}
</style>
