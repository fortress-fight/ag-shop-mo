<template>
    <div class="detail_panel" :class="{ show: show_panel }">
        <div class="button-close_panel button" @click="show_panel = false">
            <i class="ic ag-icon ag-close_1"></i>
        </div>
        <div class="container">
            <div class="detail_list w">
                <div class="detail_item" v-for="(item, index) in list" :key="index">
                    <img :src="item.img | upload_resource_link" v-if="item.img" alt class />
                </div>
            </div>
        </div>

        <loading v-if="loading"></loading>
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

    width: calc(33.3333%);
    &:nth-child(3n + 1) {
        clear: left;
    }
}
</style>
