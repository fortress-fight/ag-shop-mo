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
    .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #eaeaea;
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
        width: 16px;
        height: 16px;

        border-color: #eaeaea;
        border-radius: 0;
    }
    .el-checkbox__inner::after {
        top: 1px;
        left: 5px;
        border-width: 2px;
        border-color: #fff;
    }
    .el-checkbox__inner:hover {
        border-color: #eaeaea;
    }
}
</style>
