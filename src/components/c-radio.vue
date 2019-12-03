<template>
    <div class="c_radio">
        <el-radio v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </el-radio>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {};
    }
});
</script>
<style lang="scss">
body {
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #eaeaea;
        background-color: #fff;
    }
    .el-radio__inner:hover {
        border-color: #eaeaea;
    }
    .el-radio__inner {
        width: 16px;
        height: 16px;
    }
    // .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) {
    //     .el-radio__inner {
    //         box-shadow: 0 0 2px 2px #000;
    //     }
    // }
    .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
        .el-radio__inner {
        box-shadow: none;
    }
    .el-radio__input.is-checked .el-radio__inner::after {
        background-color: #000;
    }
}
</style>
