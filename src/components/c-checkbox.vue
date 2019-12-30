<template>
    <div class="c_checkbox">
        <el-checkbox v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </el-checkbox>
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
    .el-checkbox__label {
        font-size: 24px;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #eee;
        background-color: #fff;
    }
    .el-checkbox,
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: inherit;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #000;
        background-color: #000;
    }
    .el-checkbox__inner {
        width: 32px;
        height: 32px;

        border-color: #eaeaea;
        border-radius: 0;
    }
    .el-checkbox__inner::after {
        top: 1px;
        left: 8px;

        width: 10px;
        height: 16px;

        border-width: 1px;
        border-color: #fff;
    }
    .el-checkbox__inner:hover {
        border-color: #eaeaea;
    }
}
</style>
