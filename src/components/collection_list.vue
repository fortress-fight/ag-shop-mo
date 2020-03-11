<template>
    <div class="detail_panel" :class="{ show: show_panel }">
        <div class="button-close_panel button" @click="show_panel = false">
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="container">
            <div class="detail_list w">
                <div
                    class="detail_item"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <img
                        :src="item.img | upload_resource_link"
                        v-if="item.img"
                        alt
                        class
                        @click="open_img"
                    />
                </div>
            </div>
        </div>

        <loading v-if="loading"></loading>
        <div class="big_img" :class="{ open: big_img.open }">
            <div class="back_btn" @click="close_img">
                <i class="ic ag-left-arrow ag-icon"></i>
            </div>
            <img :src="big_img.url" alt @load="big_img.loading = false" />
            <loading v-if="big_img.loading"></loading>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { get_collect } from "@/api/api";
import Loading from "@/components/c-loading.vue";

export default Vue.extend({
    data() {
        return {
            loading: true,
            show_panel: false,
            show_detail: 0,
            big_img: {
                open: false,
                url: "",
                loading: true
            },
            publicPath: process.env.BASE_URL,
            list: [
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                },
                {
                    title: "2019 Spring/Summer",
                    datas: []
                }
            ]
        };
    },
    components: {
        loading: Loading
    },
    methods: {
        open_detail_panel() {
            this.show_panel = true;
        },
        close_img(ev: Event) {
            this.big_img.open = false;
            setTimeout(() => {
                this.big_img.url = "";
                this.big_img.loading = true;
            }, 400);
        },
        open_img(ev: Event) {
            if (ev.currentTarget) {
                let src = $(ev.currentTarget).attr("src");

                this.big_img.open = true;
                this.big_img.url = src || "";
            }
        },
        set_data(link: string) {
            this.loading = true;
            get_collect(link).then(response => {
                this.loading = false;
                this.list = response.data.widget.lists.value;
            });
        }
    },
    mounted() {}
});
</script>
<style lang="scss">
.big_img {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    visibility: hidden;

    padding: 10px;
    padding-top: 80px;

    transition: 0.36s;

    opacity: 0;
    background: #fff;

    align-items: center;
    justify-content: center;
    .back_btn {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;

        width: 80px;
        height: 80px;

        align-items: center;
        justify-content: center;
    }
    img {
        max-width: 96%;
        max-height: 96%;
    }
    &.open {
        visibility: visible;

        opacity: 1;
    }
}
.detail_panel {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;

    visibility: hidden;

    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding: 80px 0;

    transition: 0.36s ease;
    transform: translateY(10vh);

    opacity: 0;
    background-color: #fff;

    .loading_wrapper {
        top: 80px;
    }
    .container {
        overflow: auto;

        box-sizing: border-box;
        max-height: calc(100vh - 40px);
        padding-bottom: 80px;
    }
    &.show {
        visibility: visible;

        transform: translateY(0);

        opacity: 1;
    }

    .button-close_panel {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 80px;

        align-items: center;
        justify-content: center;
        .ic {
            display: block;

            transition: 0.26s ease;
            transform: scale(1);
        }
    }
}
.detail_list {
    &:after {
        display: block;
        clear: both;

        content: "";
    }
}
.detail_item {
    float: left;

    box-sizing: border-box;
    width: calc(33.3333%);
    padding: 2px;
    &:nth-child(3n + 1) {
        clear: left;
    }
}
</style>
