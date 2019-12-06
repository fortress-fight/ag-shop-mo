<template>
    <div id="ag-shopping_carts" :class="is_open ? 'show' : ''">
        <div class="carts_container">
            <div class="carts_header">
                <span class="text">my cart</span>
            </div>
            <template v-if="goods.length">
                <div class="carts_body">
                    <div class="carts_list">
                        <transition-group v-on:leave="leave" tag="div">
                            <div
                                class="item"
                                :class="{ no_stock: item.stock == 0 }"
                                v-for="(item, index) in goods"
                                :key="item.sys_sku"
                            >
                                <div class="container flex flex-sb">
                                    <div class="left">
                                        <div class="preview_image">
                                            <img :src="item.img| upload_resource_link" alt class />
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div
                                            class="btn-remove_item"
                                            :data-index="index"
                                            @click="remove_item(item.sys_sku)"
                                        >
                                            <i class="ic ag-close_1 ag-icon"></i>
                                        </div>
                                        <div class="header">
                                            <div class="title">
                                                <span class="text">{{ item.name_cn }}</span>
                                            </div>
                                            <div class="price">
                                                <span class="text unit">$</span>
                                                <span class="text">{{ item.price }}</span>
                                            </div>
                                        </div>

                                        <div class="spec">
                                            <div class="spec_item flex">
                                                <span class="text name">Size</span>
                                                <span class="text value">{{ item.size }}</span>
                                            </div>
                                            <div class="spec_item flex">
                                                <span class="text name">Colour</span>
                                                <span class="text value">{{ item.color }}</span>
                                            </div>
                                            <div class="spec_item flex">
                                                <span class="text name">Quantity</span>
                                                <div class="value">
                                                    <template v-if="item.stock == 0">
                                                        <span
                                                            class="text"
                                                            style="font-family: MTTMILANO-BOLD;"
                                                        >Sold out</span>
                                                    </template>
                                                    <c-input-number
                                                        v-else
                                                        v-model="item.num"
                                                        :min="1"
                                                        :max="item.stock"
                                                        @change="item_num_change(item.sys_sku,item.num)"
                                                    ></c-input-number>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="total_price">
                                            <span class="text unit">$</span>
                                            <span class="text">
                                                {{
                                                "multipliedBy"
                                                | compute_accuracy(
                                                item.num,
                                                item.price
                                                )
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
                <div class="carts_footer">
                    <div class="price_info">
                        <div class="item flex flex-sb">
                            <span class="name">Over value</span>
                            <div class="value">
                                <span class="text unit">$</span>
                                <span class="text">{{ goods_total_price }}</span>
                            </div>
                        </div>
                        <div class="item flex flex-sb">
                            <span class="name">Shipping&handing</span>
                            <div class="value">
                                <template v-if="express_price === 0">
                                    <span class="text">Free</span>
                                </template>
                                <template v-else>
                                    <span class="text unit">$</span>
                                    <span class="text">{{ express_price }}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="check_order">
                        <div class="item flex flex-sb">
                            <span class="text name">TOTAL</span>
                            <div class="value">
                                <span class="text unit">$</span>
                                <span class="text">{{ goods_total_price + express_price }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <a href="/user/checkout.html" class="btn-check_order button">
                                <span class="text">Proceed to checkout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="empty_panel flex-cc">
                    <span class="text">your shopping bag is empty</span>
                </div>
            </template>
        </div>
        <loading v-if="loading"></loading>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import anime from "animejs";
import BigNumber from "bignumber.js";
import Loading from "@/components/c-loading.vue";
import { carts_data } from "@/api/fake_data";
import { get_cart } from "@/api/api";

export default Vue.extend({
    data() {
        return {
            loading: true,
            express_price: 0,
            goods: []
        };
    },
    components: {
        loading: Loading
    },
    computed: {
        goods_total_price() {
            let result = new BigNumber(0);
            this.goods.forEach((item: any) => {
                if (item.stock > 0) {
                    result = result.plus(
                        new BigNumber(item.num).multipliedBy(
                            new BigNumber(item.price)
                        )
                    );
                }
            });
            return result.toNumber();
        },
        is_open: {
            get() {
                let result = this.$store.state.carts.show;
                if (result) {
                    this.loading = true;
                    get_cart()
                        .then(response => {
                            this.loading = false;
                            this.goods = response.data;
                        })
                        .catch(error => {
                            this.loading = false;
                        });
                }
                return result;
            },
            set(value) {
                this.$store.dispatch("carts/open");
            }
        }
    },
    methods: {
        close() {
            this.$store.dispatch("carts/close");
        },
        remove_item(this: any, sys_sku: string) {
            get_cart({
                act: "del",
                sys_sku: sys_sku
            }).then(response => {
                let len = this.goods.length;
                for (let i = len; i > 0; i--) {
                    if (this.goods[i - 1].sys_sku == sys_sku) {
                        this.goods.splice([i - 1], 1);
                    }
                }
            });
        },
        item_num_change(sys_sku: string, num: number) {
            get_cart({
                act: "update",
                num,
                sys_sku: sys_sku
            });
        },
        leave(el: HTMLElement, done: any) {
            anime({
                targets: el,
                height: "0px",
                translateX: "40px",
                easing: "linear",
                opacity: 0,
                duration: 300,
                complete: done
            });
        }
    },
    mounted() {
        let search_str = window.location.search.slice(1);
        let search_str_arr: string[] = [];
        let search_str_data: { tab?: string; [prompt: string]: any } = {};
        if (search_str) {
            search_str_arr = search_str.split("&");
            search_str_arr.forEach((item: any) => {
                let arr: string[0] = item.split("=");
                search_str_data[arr[0]] = arr[1];
            });
        }

        if (search_str_data.tab == "cart") {
            setTimeout(() => {
                this.is_open = true;
            });
        }
    }
});
</script>
<style lang="scss">
#ag-shopping_carts {
    position: fixed;
    z-index: 990;
    top: 0;
    right: -672px;

    visibility: hidden;

    width: 672px;
    height: 100%;

    transition: 0.36s ease;

    color: #000;
    background: #fff;
    &.show {
        right: 0;

        visibility: visible;
    }
    .carts_container {
        position: relative;

        width: 576px;
        height: 100vh;
        margin: 0 auto;
    }
    .carts_body {
        overflow: auto;

        height: calc(100% - 450px);
    }
    .carts_header {
        font-size: 21px;
        line-height: 78px;

        text-align: center;
        text-transform: uppercase;

        border-bottom: 1px solid #eaeaea;
    }

    .carts_footer {
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 41px;
        left: 0;

        flex: 0 0 auto;

        border-top: 1px solid #eaeaea;
        background: #fff;
        .price_info {
            font-size: 21px;
            line-height: 51px;

            padding: 25px 0;
        }

        .check_order {
            font-family: $FM;
            font-size: 24px;
            font-weight: bold;
            line-height: 89px;

            border-top: 1px solid #eaeaea;
        }
        .btn-check_order {
            font-size: 21px;
            line-height: 82px;

            display: block;

            width: 100%;

            text-align: center;
            text-transform: uppercase;

            color: #fff;
            background: #000;
        }
    }
    .loading_wrapper {
        top: 80px;
    }
    .empty_panel {
        font-family: $FM;

        height: calc(100vh - 90px);

        text-transform: uppercase;
    }
}

.carts_body {
    .item {
        overflow: hidden;

        border-bottom: 1px solid #eaeaea;
        &:after {
            display: block;
            clear: both;

            content: "";
        }
        &:last-child {
            border: none;
        }
        .container {
            height: 245px;
            padding: 38px 0;
        }
        .title {
            font-family: $FM;
            font-size: 21px;
            font-weight: bold;
            line-height: 31px;

            text-transform: uppercase;
        }
        .price {
            font-family: $FM;
            font-size: 19px;
            line-height: 27px;

            color: #666;
        }
        .right {
            position: relative;

            display: flex;
            flex-direction: column;
            flex: 1 1 auto;

            padding: 26px 0 0;

            justify-content: space-between;
        }
        .total_price {
            font-size: 20px;
            line-height: 35px;

            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
    .btn-remove_item {
        font-size: 12px;
        line-height: 1;

        position: absolute;
        top: 0;
        right: 0;

        cursor: pointer;
    }
    .spec_item {
        font-size: 16px;
        line-height: 35px;

        margin-bottom: 2px;

        text-transform: capitalize;
        .name {
            flex: 0 0 auto;

            width: 96px;
        }
    }
    .preview_image {
        overflow: hidden;

        width: 185px;
        height: 100%;
        margin-right: 32px;
    }
}
</style>
