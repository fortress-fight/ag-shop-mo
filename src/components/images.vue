<template>
    <div class="image-detail_panel" :class="{ show: show_panel }">
        <div class="button-close_panel button" @click="show_panel = false">
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="slider-image_detail">
            <div class="slider-item" v-for="(item, index) in list" :key="index">
                <img :src="item.img | upload_resource_link" alt />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import "slick-carousel";
import { get_images } from "@/api/api";
export default Vue.extend({
    data() {
        return {
            show_detail: 0,
            show_panel: false,
            slider: null,
            publicPath: process.env.BASE_URL,
            list: []
        };
    },
    watch: {
        show_panel(newValue) {
            if (!newValue) {
                setTimeout(() => {
                    $(".slider-image_detail").slick("unslick");
                    this.list = [];
                }, 360);
            }
        }
    },
    methods: {
        open_detail_panel(index) {
            this.show_detail = 0;
            this.show_panel = true;
        },
        set_list(link) {
            get_images(link).then(response => {
                this.list = response.data.widget.lists.value;
                this.$nextTick(() => {
                    $(".slider-image_detail").slick({
                        infinite: false,
                        slidesToShow: 1,
                        arrows: false
                    });
                });
            });
        },
        svg_mousemove(ev) {
            let dom = ev.currentTarget;
            let x = ev.clientX;
            let y = ev.clientY;
            let dom_size = dom.getBoundingClientRect();
            let distance = {
                x: x - dom_size.left,
                y: y - dom_size.top
            };
            $(dom)
                .find(".svg-big_arrow")
                .css({
                    left: distance.x,
                    top: distance.y
                });
        }
    },
    mounted() {
        $(".right_area,.left_area").on("mouseenter", function() {
            $(this).addClass("_mouseenter");
        });
        $(".right_area,.left_area").on("mouseleave", function() {
            $(this).removeClass("_mouseenter");
        });
    }
});
</script>
<style lang="scss">
.image-detail_panel {
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
        top: 40px;
        right: 40px;

        display: flex;

        width: 50px;
        height: 50px;

        align-items: center;
        justify-content: center;
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
        position: absolute;
        top: 0;

        width: 50vw;
        height: 100vh;

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

    .right_area {
        right: 0;
    }
    .left_area {
        left: 0;
        .svg-big_arrow {
            transform: translate3d(-50%, -50%, 0) rotate(180deg);
        }
    }
    .slider-image_detail {
        width: 100%;
        height: 100%;
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
}
</style>
