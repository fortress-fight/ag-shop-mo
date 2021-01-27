import C_Button from "@/components/c-button.vue";
import C_Checkbox from "@/components/c-checkbox.vue";
import C_InputNumber from "@/components/c-input-number.vue";
import C_Input from "@/components/c-input.vue";
import C_Radio from "@/components/c-radio.vue";
import C_Select from "@/components/c-select.vue";
import C_Send_Code from "@/components/c-send-code.vue";
import C_Tab_Card_Box from "@/components/c-tab-card-box.vue";
import C_Telephone from "@/components/c-telephone.vue";
import C_Telephone_Pre from "@/components/c-telephone_pre.vue";
import mask_handle from "@/components/mask_handle";
import C_Dialog from "@/components/c-dialog.vue";
import {
    Button,
    Checkbox,
    Form,
    FormItem,
    Input,
    InputNumber,
    Option,
    Radio,
    Select,
    Upload
} from "element-ui";
// import lang from "element-ui/lib/locale/lang/en";
import Vue from "vue";

Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);

Vue.component("c-input", C_Input);
Vue.component("c-select", C_Select);
Vue.component("c-radio", C_Radio);
Vue.component("c-checkbox", C_Checkbox);
Vue.component("c-button", C_Button);
Vue.component("c-telephone", C_Telephone);
Vue.component("c-telephone-pre", C_Telephone_Pre);
Vue.component("c-input-number", C_InputNumber);
Vue.component("c-tab-card-box", C_Tab_Card_Box);
Vue.component("c-send-code", C_Send_Code);
Vue.component("c-dialog", C_Dialog);

// 设置语言
// locale.use(lang);

Vue.prototype.$mask = mask_handle;
