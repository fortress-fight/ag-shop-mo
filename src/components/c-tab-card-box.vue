<template>
    <div class="c-tab-card-box">
        <div class="c-tab-cards">
            <div class="c-tab-cards_container" ref="cards_container">
                <div class="c-tab-card" v-for="(item, key) in cards" :key="key" ref="tab_card">
                    <slot :name="item.slot_name"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { make_range } from "@/unit/unit";
import anime from "animejs";

export default Vue.extend({
    data() {
        return {
            c_active_card: 0
        };
    },
    props: {
        begin_index: {
            type: Number,
            default: 0
        },
        active_card: {
            type: Number,
            default: 0
        },
        cards: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        begin_index(new_value) {
            this.c_active_card = make_range(new_value, this.cards.length);
        },
        c_active_card(new_value, old_value) {
            this.$emit("change", new_value);
            this.reset_ui(false, old_value, new_value);
        },
        active_card(new_value) {
            this.change_to(new_value);
        }
    },
    methods: {
        change_to(index: number) {
            this.c_active_card = make_range(index, this.cards.length - 1);
        },
        reset_ui(
            this: any,
            immediately: boolean,
            old_value = this.c_active_card,
            new_value = this.c_active_card
        ) {
            const v_this = this;
            if (immediately) {
                _reset_ui(0);
            } else {
                if (old_value == new_value) return;
                _reset_ui(260);
            }

            function _reset_ui(transition: number) {
                const $cards = $(v_this.$refs.tab_card);
                const $old_active_card = $cards.eq(old_value);
                const $new_active_card = $cards.eq(new_value);
                const $cards_container = $(v_this.$refs.cards_container);
                const old_card_h = $old_active_card.outerHeight() + "px";
                const new_card_h = $new_active_card.outerHeight() + "px";
                const $prev_cards = $new_active_card.prevAll();
                const $next_cards = $new_active_card.nextAll();

                const container_anime = anime({
                    targets: $cards_container.toArray(),
                    height: [old_card_h, new_card_h],
                    easing: "easeOutSine",
                    duration: transition
                });
                const new_card_anime = anime({
                    targets: $new_active_card.toArray(),
                    translateX: "0",
                    easing: "easeOutSine",
                    begin: function(anim) {
                        $new_active_card.css({ opacity: 1 });
                    },
                    duration: transition
                });
                const prev_anime = anime({
                    targets: $prev_cards.toArray(),
                    translateX: "-100%",
                    easing: "easeOutSine",
                    begin: function(anim) {
                        $new_active_card.css({ opacity: 1 });
                    },
                    duration: transition
                });
                const next_anime = anime({
                    targets: $next_cards.toArray(),
                    translateX: "100%",
                    easing: "easeOutSine",
                    begin: function(anim) {
                        $new_active_card.css({ opacity: 1 });
                    },
                    duration: transition
                });

                Promise.all([
                    container_anime.finished,
                    prev_anime.finished,
                    next_anime.finished
                ]).then(() => {
                    $cards_container.height("auto");
                    $cards.removeClass("active");
                    $cards.css({
                        opacity: ""
                    });
                    $new_active_card.addClass("active");
                });
            }
        }
    },
    mounted() {
        $(window).on("resize", () => {
            this.reset_ui(true);
        });
        this.$nextTick(() => {
            this.reset_ui(true);
        });
    }
});
</script>
<style lang="scss">
.c-tab-cards {
    position: relative;

    overflow: hidden;
}
.c-tab-card {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;

    width: 100%;

    opacity: 0;
    &.active {
        position: relative;
        z-index: 100;

        opacity: 1;
    }
}
</style>
