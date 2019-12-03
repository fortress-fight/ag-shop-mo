import C_Mask from "@/components/c-mask.vue";
export default function(option: any) {
    const MaskInstance = new C_Mask({
        data: option
    });

    MaskInstance.$mount();
    document.body.appendChild(MaskInstance.$el);
    MaskInstance.$nextTick(() => {
        MaskInstance.show = true;
    });
    return MaskInstance;
}
