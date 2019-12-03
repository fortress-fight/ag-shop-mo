<template>
    <div class="c-button">
        <el-button v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </el-button>
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
    .el-button {
        width: 100%;
        height: 100%;

        color: #fff;
        border-color: #000;
        border-radius: 0;
        background-color: #000;
    }
    .el-button:focus,
    .el-button:hover {
        color: #fff;
        border-color: #000;
        background-color: #000;
    }
}
</style>
