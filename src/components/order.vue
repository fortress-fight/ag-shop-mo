<template>
    <div class="order_container">
        <div class="address_group">
            <div class="address_header">
                <span class="text">shipping address</span>
            </div>
            <div class="address_body">
                <template v-if="!address_list.length">
                    <add-address-panel @address_save="add_address_save"></add-address-panel>
                </template>
                <template v-else>
                    <div class="address_list" :data-select_address_id="select_address">
                        <div
                            class="address_list-body row"
                            :class="{ select: select_address == address.id }"
                            v-for="(address, index) in address_list"
                            :key="index"
                            @click="change_address_select(address.id)"
                        >
                            <div class="col flex-yc flex-sb">
                                <div class="left flex flex-yc">
                                    <span class="name text">{{ address.username }}</span>

                                    <div
                                        class="is_default button"
                                        :class="{ select: address.is_default == 1 }"
                                    ></div>
                                </div>
                            </div>
                            <div class="col">
                                <span class="text">{{ address.mobile }}</span>
                            </div>
                            <div class="col">
                                <span
                                    class="text"
                                >{{address.country_name}}{{address.city_name}}{{address.state_name}}{{address.address}}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="button button-effect button-add_address"
                        @click="add_address_dialog_show = true"
                    >
                        <span class="text">Creative</span>
                    </div>
                </template>
            </div>
        </div>
        <div class="pay_method_group" :data-select_pay="pay_method">
            <div class="pay_method_header">
                <span class="text">PAYMENT</span>
            </div>
            <div class="pay_method_body flex flex-sb">
                <div class="item">
                    <c-radio v-model="pay_method" label="alipay_m">
                        <img :src="publicPath+'image/alipay.png'" alt class />
                    </c-radio>
                </div>
                <div class="item">
                    <c-radio v-model="pay_method" label="wechat_m">
                        <img :src="publicPath+'image/weichat.png'" alt class />
                    </c-radio>
                </div>
                <div class="item">
                    <c-radio v-model="pay_method" label="paypal">
                        <img :src="publicPath+'image/paypal.png'" alt class />
                    </c-radio>
                </div>
            </div>
        </div>
        <add-address-dialog :show="add_address_dialog_show" v-on:close="close_add_address_dialog"></add-address-dialog>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import add_address_panel from "@/components/panel-add_address.vue";
import dialog_add_address from "@/components/dialog-add_address.vue";
import { get_address } from "@/api/api";
import { address_data } from "@/api/fake_data";
export default Vue.extend({
    data() {
        return {
            add_address_dialog_show: false,
            publicPath: process.env.BASE_URL,
            pay_method: "alipay",
            select_address: NaN,
            address_list: address_data
        };
    },

    components: {
        "add-address-panel": add_address_panel,
        "add-address-dialog": dialog_add_address
    },
    methods: {
        close_add_address_dialog() {
            this.add_address_dialog_show = false;
            get_address().then(response => {
                this.address_list = response.data;
            });
        },
        change_address_select(id: number) {
            this.select_address = id;
        },
        show_add_address_dialog() {
            this.add_address_dialog_show = true;
        },
        add_address_save() {
            get_address().then(response => {
                this.address_list = response.data;
            });
        }
    },
    created() {
        get_address().then(response => {
            this.address_list = response.data;
            this.address_list.forEach((address: any) => {
                if (address.is_default == 1) {
                    this.select_address = address.id;
                    console.log(this.select_address, "this.select_address");
                }
            });
        });
    }
});
</script>
<style lang="scss">
.order_container {
    .pay_method_header {
        font-family: $FM;
        font-size: 34px;

        margin-top: 40px;
        margin-bottom: 20px;
    }
    .pay_method_body {
        flex: 0 0 auto;
        .item {
            margin-right: 50px;
            &:last-child {
                margin: 0;
            }
        }
    }
    .address_header {
        font-family: $FM;
        font-size: 34px;
        line-height: 82px;

        padding-top: 22px;

        text-transform: uppercase;
    }
    .address-add_panel {
        padding-top: 40px;
    }
    .el-radio {
        display: flex;

        align-items: center;
    }
    .el-radio__label {
        padding-left: 15px;
    }
    .el-radio__inner {
        width: 24px;
        height: 24px;
        &:after {
            width: 7px;
            height: 7px;
        }
    }
    .pay_method_group {
        margin-bottom: 82px;
    }
    .button-add_address {
        font-family: $FM;
        line-height: 74px;

        margin-top: 40px;

        text-align: center;
        text-transform: uppercase;

        color: #fff;
        background: #000;
    }
    .address_list-body {
        font-size: 24px;
        line-height: 34px;

        position: relative;

        overflow: hidden;

        box-sizing: border-box;
        margin-bottom: 20px;
        padding-bottom: 25px;

        color: #666;
        border-bottom: 1px solid #eaeaea;
        &:last-child {
            margin-bottom: 0;
        }
        &.select {
            padding: 20px;
            padding-top: 15px;

            border: 4px solid #000;
            &:after {
                position: absolute;
                right: 0;
                bottom: 0;

                width: 20px;
                height: 20px;
                margin-right: -10px;
                margin-bottom: -10px;

                content: "";
                transform: rotate(45deg);

                background-color: #000;
            }
        }
        .col:first-child {
            font-family: $FM;
            font-size: 34px;

            height: 60px;

            color: #000;
            .is_default {
                font-size: 24px;
                line-height: 36px;

                display: none;

                width: 86px;

                text-align: center;

                color: #fff;
                background: #000;
                &.select {
                    display: block;
                }
                &:before {
                    display: inline-block;

                    content: "default";
                    transform: scale(0.8);
                }
            }
            .name {
                margin-right: 16px;
            }
            .right {
                .button {
                    font-size: 24px;

                    margin-right: 28px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>
