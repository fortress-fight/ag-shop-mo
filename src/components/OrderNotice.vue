<!--
 * @Description: 订单页面提示面板
 * @Author: Fu Fei
 * @Date: 2021-01-26 16:13:12
 * @LastEditTime: 2021-01-26 16:13:12
 * @LastEditors: Fu Fei
 * @FilePath: \ag-web\src\pages\components\OrderNotice.vue
-->

<template>
    <div class="panel-order_notice flex-cc">
        <div class="panel-order_notice-body">
            <div class="panel-order_notice-header">
                <span class="text">Goods Change Article</span>
            </div>
            <div class="panel-order_notice-post">
                <p>
                    1、If there were no problem about quality of the goods,all
                    the cargo that have been sold out are not permitted to
                    return.
                </p>
                <p>
                    2、 In addition to the above condition, other cargos not
                    being utilized, not adapted,<br />
                    not damaged, and with intact package, if they need to be
                    changed;
                </p>
                <p>
                    * it should be tackled within seven days when you received
                    the goods,and with the order code or sales voucher
                </p>
                <p>
                    * goods with bad quality will be prioritily to change into
                    products with the same style
                </p>

                <p>
                    solution of all the dispute will subject to the current law
                    of China.
                </p>
            </div>
            <div class="panel-order_notice-footer">
                <div class="btn--confirm" @click="confirmEvent">
                    Confirm I have read
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({ name: "OrderNotice" })
export default class OrderNotice extends Vue {
    confirmEvent() {
        this.$emit("confirmEvent");
    }
}
</script>
<style lang="scss">
.panel-order_notice {
    position: fixed;
    z-index: 1111;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgba(#fff, 0.6);
    &-header {
        font-size: 28px;
        line-height: 50px;

        margin-bottom: 16px;

        text-align: center;
    }
    &-body {
        width: 630px;
        padding-top: 70px;

        background-color: #fff;
        box-shadow: 0 11px 50px rgba(0, 0, 0, 0.15);
    }
    &-post {
        line-height: 32px;
        font-size: 22px;

        width: 522px;
        margin: 0 auto;
        margin-bottom: 108px;
        p {
            margin-bottom: 30px;

            color: #666;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .btn--confirm {
        line-height: 73px;

        width: 450px;
        margin: 0 auto;
        margin-bottom: 82px;

        cursor: pointer;
        text-align: center;

        color: #fff;
        background-color: #000;
    }
}
</style>
