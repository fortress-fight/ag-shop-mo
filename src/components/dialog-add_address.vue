<template>
    <div class="dialog-add_address" :class="{ show: show }">
        <div class="dialog-container">
            <div class="dialog-close_button button" @click="close_panel">
                <i class="ic ag-icon ag-close_1"></i>
            </div>
            <div class="dialog-header">
                <span class="text">shipping address</span>
            </div>
            <add-address-panel @save="address_save" :address="address" :reset="reset"></add-address-panel>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

import add_address_panel from "./panel-add_address.vue";
export default Vue.extend({
    data() {
        return {
            mask_handle: null,
            reset: false
        };
    },
    props: {
        address: {
            type: Object,
            default() {
                return {};
            }
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show(this: any, new_value, old_value) {
            if (new_value) {
                this.mask_handle = this.$mask({
                    background: "rgba(255, 255, 255, 0.8)"
                });

                this.mask_handle.mask_click_ev = () => {
                    this.close_panel();
                };
            } else if (this.mask_handle) {
                this.mask_handle.show = false;
            }
        }
    },
    methods: {
        close_panel() {
            this.$emit("close");
            this.reset = !this.reset;
        },
        address_save() {
            this.close_panel();
            this.$emit("address_save");
        }
    },
    components: {
        "add-address-panel": add_address_panel
    }
});
</script>
<style lang="scss">
.dialog-add_address {
    position: fixed;
    z-index: 930;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    visibility: hidden;

    transition: 0.26s ease;
    transform: translateY(60px);
    pointer-events: none;

    opacity: 0;

    align-items: flex-end;
    .address-add_panel {
        padding: 35px 0;
        .form_group {
            width: 90%;
            margin: 0 auto;
        }
    }
    &.show {
        visibility: visible;

        transform: translateY(10px);

        opacity: 1;
    }
    .dialog-container {
        position: relative;

        width: 92%;
        margin: 0 auto;

        pointer-events: all;

        border: 1px solid #eaeaea;
        border-radius: 14px 14px 0 0;
        background-color: #fff;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
    }
    .dialog-close_button {
        font-size: 36px;

        position: absolute;
        top: 2px;
        right: 0;

        display: flex;

        width: 90px;
        height: 90px;

        align-items: center;
        justify-content: center;
        .ic {
            transform: scale(0.6);
        }
    }
    .dialog-header {
        font-family: MTTMILANO-BOLD;
        font-size: 28px;
        line-height: 90px;

        box-sizing: border-box;

        text-align: center;
        text-transform: uppercase;
    }
    .address-save_button {
        background-color: #000;
        &:hover {
            span {
                &:after {
                    width: 110%;
                }
            }
        }
        span {
            position: relative;
            &:after {
                position: absolute;
                bottom: -7px;
                left: 50%;

                width: 0;
                height: 3px;

                content: "";
                transition: 0.26s ease;
                transform: translateX(-50%);

                background-color: #fff;
            }
        }
    }
}
</style>
