<template>
    <div class="c-input_number">
        <el-input-number v-bind="$attrs" v-on="$listeners"></el-input-number>
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
    :focus {
        outline: none;
    }
    .c-input_number {
        .el-input {
            input {
                line-height: 1;

                height: auto;
                padding: 0;

                color: #000;
                border: none;
            }
        }
    }
    .el-input-number {
        line-height: 1;

        position: relative;

        display: inline-block;

        width: 90px;
    }
    .el-input-number__decrease,
    .el-input-number__increase {
        display: inline-block;

        width: 20px;
        height: 20px;

        vertical-align: top;

        border: none;
        background: none;
        &:hover {
            color: #000;
        }
    }
}
</style>
