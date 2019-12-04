<template>
    <div class="notice_list-detail_panel" :class="{ show: show_panel }">
        <div class="button-close_panel button" @click="show_panel = false">
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="poster" v-html="desc_data"></div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            show_panel: false,

            show_detail: 0,
            desc_data: ""
        };
    },
    watch: {
        show_panel(this: any, new_value, old_value) {
            if (new_value) {
                this.mask_handle = this.$mask({
                    background: "rgba(255, 255, 255, 0.8)"
                });
            } else if (this.mask_handle) {
                this.mask_handle.show = false;
            }
        }
    },
    methods: {
        open_detail_panel() {
            this.show_panel = true;
            this.show_detail = 0;
        },

        set_data(data: string) {
            this.desc_data = data;
        }
    }
});
</script>
<style lang="scss">
.notice_list-detail_panel {
    font-size: 26px;
    line-height: 38px;

    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 70px;

    box-sizing: border-box;
    margin: auto;
    padding: 100px 60px;

    transition: 0.36s ease;
    transform: translateX(100%);

    color: #666;
    background-color: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    justify-content: center;
    &.show {
        transform: translateX(0);
    }
    .button-close_panel {
        position: absolute;
        z-index: 100;
        top: 30px;
        left: 40px;

        display: flex;

        width: 50px;
        height: 50px;

        align-items: center;
        justify-content: center;
    }
}
</style>
