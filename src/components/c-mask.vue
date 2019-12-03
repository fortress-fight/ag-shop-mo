<template>
    <transition v-on:enter="fadeEnter" v-on:leave="leave">
        <div
            class="c-mask"
            v-if="show"
            :style="{ zIndex: zIndex, background: background }"
            @click="mask_click_ev"
        ></div>
    </transition>
</template>
<script lang="ts">
import Vue from "vue";
import anime from "animejs";
export default Vue.extend({
    data() {
        return {
            show: true,
            zIndex: 920,
            background: "#fff",
            mask_click_ev() {}
        };
    },
    methods: {
        fadeEnter(el: HTMLElement, done: any) {},
        leave(el: HTMLElement, done: any) {
            anime({
                targets: el,
                easing: "linear",
                duration: 360,
                opacity: [1, 0],
                complete: done
            });
        }
    },
    mounted() {
        anime({
            targets: this.$el,
            easing: "linear",
            duration: 200,
            opacity: [0, 1]
        });
    },
    destroyed() {
        $(this.$el).remove();
    }
});
</script>
<style lang="scss">
.c-mask {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
}
</style>
