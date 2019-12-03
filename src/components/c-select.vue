<template>
    <div class="c_select">
        <el-select v-bind="$attrs">
            <slot></slot>
        </el-select>
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
<style lang="scss"></style>
