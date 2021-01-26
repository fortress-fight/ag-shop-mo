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
                <span class="text">货品更换条款</span>
            </div>
            <div class="panel-order_notice-post">
                <p>1. 如货品不存在质量问题，所有已售出货品均不支持退货。</p>
                <p>
                    2. 除上述情况之外，其他未经使用，未经修改，<br />
                    无损坏及货品包装完好之货品，如需更换：
                </p>
                <p>
                    * 需凭订单编号或销售凭证于收到货品七日内办理。
                </p>
                <p>
                    * 有质量问题的货品，会优先更换同款式货品。
                </p>

                <p>
                    一切争议的解决将以中国现行法律为准。
                </p>
            </div>
            <div class="panel-order_notice-footer">
                <div class="btn--confirm" @click="confirmEvent">
                    确认已阅
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
