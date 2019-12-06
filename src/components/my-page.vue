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

            <div class="my_page-container order_panel" v-if="sidebar_active == 'order'">
                <transition-group
                    name="tab_panel"
                    mode="in-out"
                    tag="div"
                    class="order_panel-container"
                    v-on:enter="enter"
                    v-on:leave="leave"
                >
                    <div v-if="!order_detail.show" key="order-list">
                        <div class="container-header flex-sb flex-yc">
                            <span class="text">order</span>

                            <el-select
                                v-model="order_status.select"
                                placeholder="Order Status"
                                class="select-order_status"
                                popper-class="select_popper-order_status"
                            >
                                <el-option
                                    v-for="item in order_status.list"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>

                        <div class="container-body">
                            <div class="order-list">
                                <div
                                    class="order-list_item"
                                    v-for="(order, index) in order_list"
                                    :key="index"
                                >
                                    <div class="order-item_header">
                                        <div class="order-detail_header flex flex-sb">
                                            <span class="text">{{ order.order_sn }}</span>
                                            <span class="text">{{ order.status_name }}</span>
                                        </div>
                                    </div>

                                    <div class="order-item_body">
                                        <template
                                            v-for="(order_commodity, index) in order.order_goods"
                                        >
                                            <a
                                                :href="order_commodity.sku.goods.url"
                                                class="order_detail-list"
                                                v-if="order_commodity.sku.goods"
                                                :key="index"
                                            >
                                                <div class="order_detail-col">
                                                    <img
                                                        :src="order_commodity.sku.goods.img | upload_resource_link"
                                                        alt
                                                        class="image_preview"
                                                    />
                                                </div>
                                                <div class="order_detail-col">
                                                    <div class="des">
                                                        <div class="top">
                                                            <span class="text des_text">
                                                                {{
                                                                order_commodity.sku.goods.name_cn
                                                                }}
                                                            </span>
                                                        </div>
                                                        <div class="bottom des_spec">
                                                            <span
                                                                class="text"
                                                            >{{ order_commodity.sku.size }}-{{ order_commodity.sku.color }}</span>
                                                            <span class="text">
                                                                {{
                                                                order_commodity.num
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="text price"
                                                    >${{ order_commodity.sku.goods.cost }}</div>
                                                </div>
                                            </a>
                                        </template>
                                        <div class="order-item_total-price flex flex-sb">
                                            <div class="left">SUBTOTAL</div>
                                            <div class="right">${{ order.price }}</div>
                                        </div>
                                    </div>
                                    <div class="order-item_footer">
                                        <div
                                            class="button button-order_detail button-effect2"
                                            @click=" show_detail( order.id ) "
                                            v-if="order.status !== 0"
                                        >
                                            <span class="text">Order detail</span>
                                        </div>
                                        <template v-else>
                                            <a
                                                class="button button-order_pay button-effect"
                                                target="_blank"
                                                :href="`/user/order_info.html?id=${order.id}`"
                                            >
                                                <span class="text">Payment</span>
                                            </a>
                                            <div class="button button-order_cancel button-effect2">
                                                <span class="text">Cancel</span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key="order_panel-detail" v-else>
                        <div class="container-body">
                            <div class="order_panel-detail">
                                <div
                                    class="back-button button button-effect2"
                                    @click="order_detail.show = false"
                                >
                                    <i class="ic"><&nbsp;</i>
                                    <span class="text">Back to the order</span>
                                </div>
                                <div class="reveive_info">
                                    <div class="title">
                                        <span class="text">receiving information</span>
                                    </div>
                                    <div class="list">
                                        <div class="item">
                                            <span class="name text">Name:</span>
                                            <span class="value text">{{order_detail.data.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text">Phone:</span>
                                            <span class="value text">{{order_detail.data.mobile}}</span>
                                        </div>
                                        <div class="item" v-if="order_detail.data.address">
                                            <span class="name text">Address:</span>

                                            <span class="value text">{{order_detail.data.address}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text">Delivery:</span>
                                            <span
                                                class="value text"
                                            >{{order_detail.data.shipping_type}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order_info">
                                    <div class="title">
                                        <span class="text">ORDER information</span>
                                    </div>
                                    <div class="list">
                                        <div class="item">
                                            <span class="name text">OrderID:</span>
                                            <span class="value text">{{order_detail.data.order_sn}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text">Ordertime:</span>
                                            <span
                                                class="value text"
                                            >{{order_detail.data.create_time}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text">Paytime:</span>
                                            <span class="value text">{{order_detail.data.pay_time}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text">Logistics numbe:</span>
                                            <span
                                                class="value text"
                                            >{{order_detail.data.shipping_sn}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-list">
                                    <div class="order-list_item">
                                        <div class="order-item_header">
                                            <div class="order-detail_header flex flex-sb">
                                                <span class="text">{{ order_detail.data.order_sn }}</span>
                                                <span
                                                    class="text"
                                                >{{ order_detail.data.status_name }}</span>
                                            </div>
                                        </div>

                                        <div class="order-item_body">
                                            <template
                                                v-for="(order_commodity, index) in order_detail.data.order_goods"
                                            >
                                                <a
                                                    :href="order_commodity.sku.goods.url"
                                                    class="order_detail-list"
                                                    v-if="order_commodity.sku.goods"
                                                    :key="index"
                                                >
                                                    <div class="order_detail-col">
                                                        <img
                                                            :src="order_commodity.sku.goods.img | upload_resource_link"
                                                            alt
                                                            class="image_preview"
                                                        />
                                                    </div>
                                                    <div class="order_detail-col">
                                                        <div class="des">
                                                            <div class="top">
                                                                <span class="text des_text">
                                                                    {{
                                                                    order_commodity.sku.goods.name_cn
                                                                    }}
                                                                </span>
                                                            </div>
                                                            <div class="bottom des_spec">
                                                                <span
                                                                    class="text"
                                                                >{{ order_commodity.sku.size }}-{{ order_commodity.sku.color }}</span>
                                                                <span class="text">
                                                                    {{
                                                                    order_commodity.num
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text price"
                                                        >${{ order_commodity.sku.goods.cost }}</div>
                                                    </div>
                                                </a>
                                            </template>
                                            <div class="order-item_total-price flex flex-sb">
                                                <div class="left">SUBTOTAL</div>
                                                <div class="right">${{ order_detail.data.price }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>

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
import { order_data, order_detail_data } from "@/api/fake_data";
import anime from "animejs";
export default Vue.extend({
    data() {
        return {
            sidebar_active: "order",
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
            error_message: "",

            order_status: {
                select: "",
                list: [
                    {
                        label: "All",
                        value: "All"
                    },
                    {
                        label: "unpaid",
                        value: "unpaid"
                    },
                    {
                        label: "paid",
                        value: "paid"
                    },
                    {
                        label: "completed",
                        value: "completed"
                    },
                    {
                        label: "cancelled",
                        value: "cancelled"
                    }
                ]
            },
            order_list: order_data,

            order_detail: {
                show: false,
                data: order_detail_data
            }
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
        leave(el: HTMLElement, done: any) {
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
        },
        show_detail(id: string) {
            this.order_detail.show = true;
            // this.order_detail.data = this.order_list[id];

            // order_detail({ id: id }).then(response => {
            //     this.order_detail.data = response.data;
            // });
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
.select_popper-order_status {
    font-family: $FM;

    text-transform: uppercase;
}
.my_page-container {
    .order_panel-detail {
        & > div {
            margin: 0;
            margin-bottom: 26px;
            padding-bottom: 40px;

            border-bottom: 1px solid #eaeaea;
        }
        .back-button {
            font-size: 24px;
            line-height: 74px;

            margin: 0;
            padding: 0;

            border: none;
            .ic {
                font-size: 30px;
            }
        }
        .order-list {
            border: none;
        }
        .title {
            font-family: $FM;
            font-size: 34px;
            line-height: 62px;

            text-transform: uppercase;
        }
        .item {
            font-size: 28px;
            .name {
                line-height: 47px;

                margin-right: 6px;

                color: #666;
            }
        }
        .order-item_header {
            background-color: #faf9f9;
            .text {
                line-height: 60px;

                display: inline-block;
            }
        }
    }
    .order_panel-container {
        position: relative;

        overflow: hidden;

        width: 100%;
        & > div {
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
    &.order_panel {
        .order-list_item {
            margin-bottom: 52px;

            border-bottom: 1px solid #eaeaea;
            &:last-child {
                border: none;
            }
        }
        .order-item_header {
            font-size: 24px;
            line-height: 28px;

            margin-bottom: 17px;
            padding: 0 20px;
        }
        .order-item_footer {
            padding: 0 20px;
            .button {
                font-size: 24px;
                line-height: 80px;

                width: 100%;

                text-align: center;

                color: #fff;
                background: #000;
            }
            .button-order_detail,
            .button-order_cancel {
                color: #999;
                background: transparent;
            }
        }
        .order_detail-list {
            display: flex;
            flex: 0 1 auto;

            box-sizing: border-box;
            padding: 20px 20px;

            border-bottom: 1px solid #eaeaea;
            .order_detail-col {
                position: relative;

                display: flex;
                flex: 0 1 auto;

                box-sizing: border-box;
                height: 150px;

                text-align: left;

                align-items: center;
                .price {
                    font-family: $FM;
                    font-size: 24px;

                    position: absolute;
                    right: 0;
                    bottom: 8px;
                }
                .des {
                    display: flex;
                    flex-direction: column;

                    height: 100%;

                    justify-content: space-between;
                    .text {
                        display: block;
                    }
                }
                .des_spec {
                    font-family: MTTMILANO-regular;
                    font-size: 24px;
                    line-height: 26px;

                    padding-bottom: 4px;

                    color: #202020;
                }
                .des_text {
                    font-family: $FM;
                    font-size: 28px;

                    overflow: hidden;

                    white-space: nowrap;
                    text-transform: uppercase;
                    text-overflow: ellipsis;

                    color: #000;
                }
                &:nth-child(1) {
                    flex: 0 0 auto;

                    width: 112px;

                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                &:nth-child(2) {
                    flex: 1 1 auto;

                    padding-left: 30px;
                }
            }
        }
        .order-item_total-price {
            font-family: $FM;
            font-size: 26px;
            line-height: 80px;

// margin-bottom: 26px;

            padding: 0 20px;
        }
    }
    .container-header {
        font-family: $FM;
        font-size: 34px;
        line-height: 132px;

        text-transform: uppercase;

        color: #000;
        .el-select {
            font-family: $FM;
            font-size: 24px;

            width: 220px;
            height: 76px;

            .el-input,
            .el-input .el-input__inner {
                line-height: 76px;

                box-sizing: border-box;
                height: 76px;
                padding: 0;

                text-transform: uppercase;

                border: none;
            }
            .el-input__suffix {
                right: 0;
            }
        }
    }
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
