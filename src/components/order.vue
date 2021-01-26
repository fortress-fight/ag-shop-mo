<template>
    <div class="order_container">
        <div class="address_group">
            <div class="address_header">
                <span class="text">SHIPPING ADDRESS</span>
            </div>
            <div class="address_body">
                <template v-if="!address_list.length">
                    <add-address-panel
                        @save="add_address_save"
                    ></add-address-panel>
                </template>
                <template v-else>
                    <div
                        class="address_list"
                        :data-select_address_id="select_address"
                    >
                        <div
                            class="address_list-body row"
                            :class="{ select: select_address == address.id }"
                            v-for="(address, index) in address_list"
                            :key="index"
                            @click="change_address_select(address.id)"
                        >
                            <div class="col flex-yc flex-sb">
                                <div class="left flex flex-yc">
                                    <span class="name text">{{
                                        address.username
                                    }}</span>

                                    <div
                                        class="is_default button"
                                        :class="{
                                            select: address.is_default == 1
                                        }"
                                    ></div>
                                </div>
                            </div>
                            <div class="col">
                                <span class="text">{{ address.mobile }}</span>
                            </div>
                            <div class="col">
                                <span class="text"
                                    >{{ address.country_name
                                    }}{{ address.city_name
                                    }}{{ address.state_name
                                    }}{{ address.address }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="button button-effect button-add_address"
                        @click="add_address_dialog_show = true"
                    >
                        <span class="text">Add</span>
                    </div>
                </template>
            </div>
        </div>
        <div class="pay_method_group" :data-select_pay="pay_method">
            <div class="pay_method_header">
                <span class="text">Payment method</span>
            </div>
            <div class="pay_method_body flex flex-sb">
                <div class="item">
                    <c-radio v-model="pay_method" label="paypal">
                        <img :src="publicPath + 'image/paypal.png'" alt class />
                    </c-radio>
                </div>
            </div>
        </div>
        <template v-if="this.order_info.order_goods">
            <div class="order-list">
                <div
                    class="order-list_item"
                    v-for="(item, index) in order_info.order_goods"
                    :key="index"
                >
                    <div class="order-item_body">
                        <div class="order_detail-list">
                            <div class="order_detail-col">
                                <img
                                    :src="
                                        item.sku.goods.img
                                            | upload_resource_link
                                    "
                                    alt
                                    class="image_preview"
                                />
                            </div>
                            <div class="order_detail-col">
                                <div class="des">
                                    <div class="text des_text">
                                        {{ item.sku.goods.name_cn }}
                                    </div>
                                    <div class="text good_price">
                                        ${{ item.price }}
                                    </div>
                                </div>
                                <div class="bottom des_spec">
                                    <div class="row">
                                        <span class="name">SIZE</span>
                                        <span class="value">{{
                                            item.sku.size
                                        }}</span>
                                    </div>
                                    <div class="row">
                                        <span class="name">COLOR</span>
                                        <span class="value">{{
                                            item.sku.color
                                        }}</span>
                                    </div>
                                    <div class="row">
                                        <span class="name">QUANTITY</span>
                                        <span class="value">
                                            {{ item.num }}
                                        </span>
                                    </div>
                                </div>
                                <div class="text price">
                                    ${{ multipliedBy(item.price, item.num) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-list_footer">
                    <div class="price_info">
                        <div class="item flex flex-sb">
                            <span class="name">Over value</span>
                            <div class="value">
                                <span class="text unit">$</span>
                                <span class="text">{{
                                    this.order_info.price
                                }}</span>
                            </div>
                        </div>
                        <div class="item flex flex-sb">
                            <span class="name">Shipping&handing</span>
                            <div class="value">
                                <span class="text"
                                    >${{ this.order_info.shipping_price }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="order-item_order-ext">
                        <div class="left">Order Remarks</div>
                        <div class="right">
                            <c-input
                                class="mini"
                                type="textarea"
                                name="ext"
                                placeholder="* Enter a order remark"
                                v-model="orderExt"
                            ></c-input>
                        </div>
                    </div>
                    <div class="order-item_total-price flex flex-sb">
                        <div class="left">TOTAL</div>
                        <div class="right">
                            ${{
                                plus(
                                    Number(this.order_info.shipping_price),
                                    Number(this.order_info.price)
                                )
                            }}
                        </div>
                    </div>
                    <div class="button pay_button" @click="pay_order">
                        PROCEED TO CHECKOUT
                    </div>
                </div>
            </div>
        </template>
        <add-address-dialog
            :show="add_address_dialog_show"
            v-on:close="close_add_address_dialog"
            @address_save="address_save"
        ></add-address-dialog>
        <OrderNotice
            v-if="showNotice"
            @confirmEvent="confirmEvent"
        ></OrderNotice>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import add_address_panel from "@/components/panel-add_address.vue";
import dialog_add_address from "@/components/dialog-add_address.vue";
import { get_address, order_info, to_pay } from "@/api/api";
import OrderNotice from "./OrderNotice.vue";
import { address_data } from "@/api/fake_data";
import BigNumber from "bignumber.js";
export default Vue.extend({
    data() {
        return {
            showNotice: false,
            orderExt: "",
            add_address_dialog_show: false,
            publicPath: process.env.BASE_URL,
            pay_method: "paypal",
            select_address: -1,
            order_info: {},
            address_list: address_data
        };
    },

    components: {
        OrderNotice,
        "add-address-panel": add_address_panel,
        "add-address-dialog": dialog_add_address
    },
    methods: {
        plus(num: number, num2: number) {
            return new BigNumber(num).plus(new BigNumber(num2)).toFixed(2);
        },
        multipliedBy(num: number, num2: number) {
            return new BigNumber(num)
                .multipliedBy(new BigNumber(num2))
                .toFixed(2);
        },
        close_add_address_dialog() {
            this.add_address_dialog_show = false;
        },
        address_save() {
            this.updateAddressList();
        },
        change_address_select(id: number) {
            this.select_address = id;

            this.update_order_info(id);
        },
        show_add_address_dialog() {
            this.add_address_dialog_show = true;
        },
        add_address_save() {
            this.updateAddressList();
        },
        update_order_info(id: number) {
            order_info({
                address_id: id
            }).then(res => {
                if (res.data.order) {
                    this.order_info = res.data.order;
                }
            });
            // this.order_info = {
            //     id: 356,
            //     user_id: 2,
            //     order_sn: "Order202101201536541564",
            //     price: "1298.00",
            //     is_paid: 0,
            //     status: 0,
            //     shipping_sn: null,
            //     shipping_type: null,
            //     create_time: "2021-01-20 15:36:54",
            //     update_time: "2021-01-20 15:47:00",
            //     pay_time: null,
            //     pay_way: null,
            //     name: "陆宇",
            //     mobile: "18059223627",
            //     address: "中国北京北京市朝阳区三里屯陆33号一层1108号",
            //     goods_num: 1,
            //     shipping_price: "0.00",
            //     delete_time: null,
            //     ext: null,
            //     status_name: "未支付",
            //     order_goods: [
            //         {
            //             id: 433,
            //             order_id: 356,
            //             order_sn: "Order202101201536541564",
            //             sys_sku: "149bffd65c3a9c5194612bc5088c631f",
            //             num: 1,
            //             price: "1298.00",
            //             sku: {
            //                 id: 428,
            //                 goods_id: 5485,
            //                 goods_sn: null,
            //                 color: "产品颜色",
            //                 size: "F",
            //                 sku: null,
            //                 goods_attr: null,
            //                 stock: 111,
            //                 sys_sku: "149bffd65c3a9c5194612bc5088c631f",
            //                 goods: {
            //                     id: 5485,
            //                     type: "page",
            //                     site_id: 13450,
            //                     user_id: 0,
            //                     url: "/index.php?id=5485",
            //                     need_login: 0,
            //                     module_id: 4908,
            //                     module_list_id: 0,
            //                     attr_code_cat: "tops",
            //                     level: 1,
            //                     state: null,
            //                     cost: "1298.00",
            //                     sort: 0,
            //                     cid: 1,
            //                     pid: 4907,
            //                     is_dir: 0,
            //                     ext: null,
            //                     name_cn: "Agender做旧马甲",
            //                     name_en: "AS0050109",
            //                     view: null,
            //                     create_time: "2020-12-17 09:58:38",
            //                     update_time: "2021-01-20 14:44:52",
            //                     expire_time: null,
            //                     img:
            //                         "/uploads/13450/5d032bc8b80e9b231094118cb5a1ac91.jpg",
            //                     desc: null,
            //                     search_type: 0,
            //                     configs: null,
            //                     type_name: "开放",
            //                     template: "product_post",
            //                     state_name: null,
            //                     origin_cost: "1298.00"
            //                 }
            //             }
            //         }
            //     ]
            // };
        },
        pay_order() {
            if (this.select_address != -1) {
                to_pay({
                    ext: this.orderExt,
                    order_id: this.order_info.id,
                    payment: this.pay_method
                });
            }
        },
        updateAddressList() {
            return get_address().then(response => {
                this.address_list = response.data;
                if (!this.address_list.length) {
                    this.update_order_info(0);
                } else {
                    let defaultAddress;
                    let hasDefaultAddress = this.address_list.some(
                        (address: any) => {
                            if (address.is_default == 1) {
                                defaultAddress = address;
                                return true;
                            }
                        }
                    );
                    if (hasDefaultAddress) {
                        if (this.select_address == -1) {
                            this.select_address = defaultAddress.id;
                        }
                    } else {
                        this.select_address = this.address_list[0].id;
                    }
                    this.update_order_info(this.select_address);
                }
            });
        },
        openNoticePanel() {
            this.showNotice = true;
        },
        confirmEvent() {
            this.showNotice = false;
        }
    },
    mounted() {
        this.updateAddressList().finally(() => {
            this.openNoticePanel();
        });
    }
});
</script>
<style lang="scss">
.order_container {
    .order-item_order-ext {
        padding: 4.533vw 0;

        border-top: 1px solid #e8e8e8;
        .left {
            font-size: 3.733vw;
            line-height: 5.067vw;
            margin-bottom: 40px;
        }
        .c_input.mini .el-textarea {
            // font-size: 3.733vw;
            // line-height: 5.067vw;
            .el-textarea__inner {
                line-height: 1.3;

                width: 100%;
                height: 180px;
                padding: 20px;
                font-size: 4.3vw;
                // line-height: 6.067vw;
                // width: 13em;
                // padding: 0;
                // text-align: right;
                // border: none;

                resize: none;

                border: 1px solid #e8e8e8;
            }
        }
    }
    .pay_button {
        &.state-disable {
            pointer-events: none;

            background-color: #afafaf !important;
        }
    }
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
