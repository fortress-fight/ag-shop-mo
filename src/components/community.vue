<template>
    <div class="community-detail_panel" :class="{ show: show_panel }">
        <div
            class="button-close_panel button"
            @click="
                show_panel = false;
                show_detail = false;
            "
        >
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="detail" :class="{ show: show_detail }">
            <div class="title">
                <span class="text">{{ list.title }}</span>
            </div>
            <div class="des">
                {{ list.des }}
            </div>
        </div>
        <div
            class="open_detail_btn flex-cc"
            :class="{ show: show_detail }"
            @click="tab_show_detail"
        >
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="slider-preview_image">
            <div
                class="slider-item"
                v-for="(img, key) in list.images"
                :key="key"
            >
                <img :src="img" alt />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import "slick-carousel";
export default Vue.extend({
    data() {
        return {
            show_detail: false,
            show_panel: false,
            publicPath: process.env.BASE_URL,

            list: {
                title: "",
                images: [],
                des: ""
            }
        };
    },
    watch: {
        show_panel(this: any, newValue) {
            if (!newValue) {
                setTimeout(() => {
                    let slider = $(
                        ".community-detail_panel .slider-preview_image"
                    ) as any;
                    slider.slick("unslick");
                    this.list = [];
                }, 360);
            }
        }
    },
    methods: {
        tab_show_detail() {
            this.show_detail = !this.show_detail;
        },
        mouse_effect() {},
        open_detail_panel() {
            this.show_panel = true;
        },

        set_list(this: any, list: any) {
            this.list = list;
            this.$nextTick(() => {
                const slider = $(
                    ".community-detail_panel .slider-preview_image"
                ) as any;
                slider.slick({
                    infinite: false,
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                });
            });
        }
    },
    mounted() {}
});
</script>
<style lang="scss">
.community-detail_panel {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;

    display: flex;
    visibility: hidden;

    width: 100vw;
    height: 100vh;

    transition: 0.36s ease;
    transform: translateY(10vh);

    opacity: 0;
    background-color: #fff;

    justify-content: center;
    &.show {
        visibility: visible;

        transform: translateY(0);

        opacity: 1;
    }
    .button-close_panel {
        position: absolute;
        z-index: 100;
        top: 20px;
        left: 50%;

        display: flex;

        width: 50px;
        height: 50px;
        margin-left: -25px;

        align-items: center;
        justify-content: center;
    }
    .detail {
        position: absolute;
        z-index: 20;
        top: 130px;
        right: 0;
        bottom: 0;

        visibility: hidden;

        box-sizing: border-box;
        width: 672px;
        padding: 62px 80px;

        transition: 0.36s ease;
        transform: translate3d(40px, 40px, 0);

        opacity: 0;
        background: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        &.show {
            visibility: visible;

            transform: translate3d(0, 0, 0);

            opacity: 1;
        }
        .title {
            font-family: MTTMILANO-BOLD;
            font-size: 34px;
            line-height: 50px;

            margin-bottom: 22px;

            color: #000;
        }
        .des {
            font-size: 28px;
            line-height: 32px;

            color: #666;
        }
    }
    .slider-preview_image {
        flex: 0 0 auto;

        width: 100%;
        .slider-item {
            display: flex !important;

            height: 100vh;

            align-items: center;
            justify-content: center;
        }
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }

    .svg-big_arrow {
        position: absolute;
        right: 20px;
        bottom: 0;
        path {
            stroke: #000;
            stroke-width: 1px;
            fill: none;
            fill-rule: evenodd;
        }
    }
    .right_area,
    .left_area {
        position: relative;

        flex: 1 1 auto;

        cursor: none;

        .svg-big_arrow {
            transition: opacity 0.2s ease;
            transform: translate3d(-50%, -50%, 0);
            pointer-events: none;

            opacity: 0;
        }
        &:hover {
            .svg-big_arrow {
                opacity: 1;
            }
        }
    }

    .left_area {
        .svg-big_arrow {
            transform: translate3d(-50%, -50%, 0) rotate(180deg);
        }
    }
    .open_detail_btn {
        position: absolute;
        z-index: 30;
        right: 0;
        bottom: 0;

        width: 118px;
        height: 118px;

        .ic {
            transition: 0.36s ease;
            transform: rotate(45deg);
        }
        &.show {
            .ic {
                transform: rotate(0);
            }
        }
    }
}
</style>
