<template>
    <div class="loading_wrapper">
        <div class="loading_dom">
            <div class="loading_outer"></div>
            <div class="loading_inner"></div>
        </div>
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
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
.loading_wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    background: #fff;

    align-items: center;
    justify-content: center;
    .loading_dom {
        position: relative;

        width: 120px;
        height: 120px;
        .loading_outer,
        .loading_inner {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            border: 2px solid rgba(239, 239, 239, 1);
            border-radius: 100%;
        }
        .loading_inner {
            animation: spin 2s infinite linear;

            border-color: #000;
            border-top: 0;
            border-right: 0;
            border-left: none;
        }
    }
}
</style>
