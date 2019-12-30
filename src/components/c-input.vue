<template>
    <div class="c_input">
        <el-input v-bind="$attrs" v-on="$listeners"></el-input>
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
    .el-select .el-input .el-select__caret {
        font-size: 24px;
    }
    .el-form-item__content {
        font-size: 32px;
        line-height: 94px;
    }
    .c_input {
        font-size: 32px;

        width: 100%;

        color: #666;
    }
    .el-input .el-input__clear {
        font-size: 32px;
        line-height: 94px;
    }
    .el-input {
        font-size: inherit;

        position: relative;

        display: inline-block;

        width: 100%;
        .el-input__inner {
            font-size: inherit;
            line-height: 56px;

            display: inline-block;

            box-sizing: border-box;
            width: 100%;
            height: 94px;
            padding: 0 42px;

            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

            color: #7a7a7a;
            border: 1px solid #eaeaea;
            border-radius: 0;
            outline: 0;
            background-color: #fff;
        }
    }
    .el-textarea__inner {
        color: #7a7a7a;
        border-color: #dcdfe6;
        border-radius: 0;
    }
    .el-textarea__inner:focus {
        border-color: #dcdfe6;
        outline: none;
    }
}
</style>
