<template>
    <div class="c_telephone">
        <div class="c_select" v-if="!no_code">
            <el-select v-model="code" popper-class="c_telephone-popper">
                <el-option
                    v-for="item in code_data"
                    :key="item['country-code']"
                    :label="
                        `${item['country-code'].toUpperCase()}+${
                            item['dial-code']
                        }`
                    "
                    :value="item['country-code']"
                ></el-option>
            </el-select>
        </div>
        <c-input
            type="text"
            v-model="default_value"
            name="phonenumber"
            @change="value_change"
            placeholder="手机号"
        ></c-input>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            code: "",
            default_value: "",
            code_data: [
                { "dial-code": "93", "country-code": "af" },
                { "dial-code": "355", "country-code": "al" },
                { "dial-code": "213", "country-code": "dz" },
                { "dial-code": "1684", "country-code": "as" },
                { "dial-code": "376", "country-code": "ad" },
                { "dial-code": "244", "country-code": "ao" },
                { "dial-code": "1264", "country-code": "ai" },
                { "dial-code": "1268", "country-code": "ag" },
                { "dial-code": "54", "country-code": "ar" },
                { "dial-code": "374", "country-code": "am" },
                { "dial-code": "297", "country-code": "aw" },
                { "dial-code": "61", "country-code": "au" },
                { "dial-code": "43", "country-code": "at" },
                { "dial-code": "994", "country-code": "az" },
                { "dial-code": "1242", "country-code": "bs" },
                { "dial-code": "973", "country-code": "bh" },
                { "dial-code": "880", "country-code": "bd" },
                { "dial-code": "1246", "country-code": "bb" },
                { "dial-code": "375", "country-code": "by" },
                { "dial-code": "32", "country-code": "be" },
                { "dial-code": "501", "country-code": "bz" },
                { "dial-code": "229", "country-code": "bj" },
                { "dial-code": "1441", "country-code": "bm" },
                { "dial-code": "975", "country-code": "bt" },
                { "dial-code": "591", "country-code": "bo" },
                { "dial-code": "387", "country-code": "ba" },
                { "dial-code": "267", "country-code": "bw" },
                { "dial-code": "55", "country-code": "br" },
                { "dial-code": "246", "country-code": "io" },
                { "dial-code": "1284", "country-code": "vg" },
                { "dial-code": "673", "country-code": "bn" },
                { "dial-code": "359", "country-code": "bg" },
                { "dial-code": "226", "country-code": "bf" },
                { "dial-code": "257", "country-code": "bi" },
                { "dial-code": "855", "country-code": "kh" },
                { "dial-code": "237", "country-code": "cm" },
                { "dial-code": "1", "country-code": "ca" },
                { "dial-code": "238", "country-code": "cv" },
                { "dial-code": "599", "country-code": "bq" },
                { "dial-code": "1345", "country-code": "ky" },
                { "dial-code": "236", "country-code": "cf" },
                { "dial-code": "235", "country-code": "td" },
                { "dial-code": "56", "country-code": "cl" },
                { "dial-code": "86", "country-code": "cn" },
                { "dial-code": "61", "country-code": "cx" },
                { "dial-code": "61", "country-code": "cc" },
                { "dial-code": "57", "country-code": "co" },
                { "dial-code": "269", "country-code": "km" },
                { "dial-code": "243", "country-code": "cd" },
                { "dial-code": "242", "country-code": "cg" },
                { "dial-code": "682", "country-code": "ck" },
                { "dial-code": "506", "country-code": "cr" },
                { "dial-code": "225", "country-code": "ci" },
                { "dial-code": "385", "country-code": "hr" },
                { "dial-code": "53", "country-code": "cu" },
                { "dial-code": "599", "country-code": "cw" },
                { "dial-code": "357", "country-code": "cy" },
                { "dial-code": "420", "country-code": "cz" },
                { "dial-code": "45", "country-code": "dk" },
                { "dial-code": "253", "country-code": "dj" },
                { "dial-code": "1767", "country-code": "dm" },
                { "dial-code": "1", "country-code": "do" },
                { "dial-code": "593", "country-code": "ec" },
                { "dial-code": "20", "country-code": "eg" },
                { "dial-code": "503", "country-code": "sv" },
                { "dial-code": "240", "country-code": "gq" },
                { "dial-code": "291", "country-code": "er" },
                { "dial-code": "372", "country-code": "ee" },
                { "dial-code": "251", "country-code": "et" },
                { "dial-code": "500", "country-code": "fk" },
                { "dial-code": "298", "country-code": "fo" },
                { "dial-code": "679", "country-code": "fj" },
                { "dial-code": "358", "country-code": "fi" },
                { "dial-code": "33", "country-code": "fr" },
                { "dial-code": "594", "country-code": "gf" },
                { "dial-code": "689", "country-code": "pf" },
                { "dial-code": "241", "country-code": "ga" },
                { "dial-code": "220", "country-code": "gm" },
                { "dial-code": "995", "country-code": "ge" },
                { "dial-code": "49", "country-code": "de" },
                { "dial-code": "233", "country-code": "gh" },
                { "dial-code": "350", "country-code": "gi" },
                { "dial-code": "30", "country-code": "gr" },
                { "dial-code": "299", "country-code": "gl" },
                { "dial-code": "1473", "country-code": "gd" },
                { "dial-code": "590", "country-code": "gp" },
                { "dial-code": "1671", "country-code": "gu" },
                { "dial-code": "502", "country-code": "gt" },
                { "dial-code": "44", "country-code": "gg" },
                { "dial-code": "224", "country-code": "gn" },
                { "dial-code": "245", "country-code": "gw" },
                { "dial-code": "592", "country-code": "gy" },
                { "dial-code": "509", "country-code": "ht" },
                { "dial-code": "504", "country-code": "hn" },
                { "dial-code": "852", "country-code": "hk" },
                { "dial-code": "36", "country-code": "hu" },
                { "dial-code": "354", "country-code": "is" },
                { "dial-code": "91", "country-code": "in" },
                { "dial-code": "62", "country-code": "id" },
                { "dial-code": "98", "country-code": "ir" },
                { "dial-code": "964", "country-code": "iq" },
                { "dial-code": "353", "country-code": "ie" },
                { "dial-code": "44", "country-code": "im" },
                { "dial-code": "972", "country-code": "il" },
                { "dial-code": "39", "country-code": "it" },
                { "dial-code": "1876", "country-code": "jm" },
                { "dial-code": "81", "country-code": "jp" },
                { "dial-code": "44", "country-code": "je" },
                { "dial-code": "962", "country-code": "jo" },
                { "dial-code": "7", "country-code": "kz" },
                { "dial-code": "254", "country-code": "ke" },
                { "dial-code": "686", "country-code": "ki" },
                { "dial-code": "383", "country-code": "xk" },
                { "dial-code": "965", "country-code": "kw" },
                { "dial-code": "996", "country-code": "kg" },
                { "dial-code": "856", "country-code": "la" },
                { "dial-code": "371", "country-code": "lv" },
                { "dial-code": "961", "country-code": "lb" },
                { "dial-code": "266", "country-code": "ls" },
                { "dial-code": "231", "country-code": "lr" },
                { "dial-code": "218", "country-code": "ly" },
                { "dial-code": "423", "country-code": "li" },
                { "dial-code": "370", "country-code": "lt" },
                { "dial-code": "352", "country-code": "lu" },
                { "dial-code": "853", "country-code": "mo" },
                { "dial-code": "389", "country-code": "mk" },
                { "dial-code": "261", "country-code": "mg" },
                { "dial-code": "265", "country-code": "mw" },
                { "dial-code": "60", "country-code": "my" },
                { "dial-code": "960", "country-code": "mv" },
                { "dial-code": "223", "country-code": "ml" },
                { "dial-code": "356", "country-code": "mt" },
                { "dial-code": "692", "country-code": "mh" },
                { "dial-code": "596", "country-code": "mq" },
                { "dial-code": "222", "country-code": "mr" },
                { "dial-code": "230", "country-code": "mu" },
                { "dial-code": "262", "country-code": "yt" },
                { "dial-code": "52", "country-code": "mx" },
                { "dial-code": "691", "country-code": "fm" },
                { "dial-code": "373", "country-code": "md" },
                { "dial-code": "377", "country-code": "mc" },
                { "dial-code": "976", "country-code": "mn" },
                { "dial-code": "382", "country-code": "me" },
                { "dial-code": "1664", "country-code": "ms" },
                { "dial-code": "212", "country-code": "ma" },
                { "dial-code": "258", "country-code": "mz" },
                { "dial-code": "95", "country-code": "mm" },
                { "dial-code": "264", "country-code": "na" },
                { "dial-code": "674", "country-code": "nr" },
                { "dial-code": "977", "country-code": "np" },
                { "dial-code": "31", "country-code": "nl" },
                { "dial-code": "687", "country-code": "nc" },
                { "dial-code": "64", "country-code": "nz" },
                { "dial-code": "505", "country-code": "ni" },
                { "dial-code": "227", "country-code": "ne" },
                { "dial-code": "234", "country-code": "ng" },
                { "dial-code": "683", "country-code": "nu" },
                { "dial-code": "672", "country-code": "nf" },
                { "dial-code": "850", "country-code": "kp" },
                { "dial-code": "1670", "country-code": "mp" },
                { "dial-code": "47", "country-code": "no" },
                { "dial-code": "968", "country-code": "om" },
                { "dial-code": "92", "country-code": "pk" },
                { "dial-code": "680", "country-code": "pw" },
                { "dial-code": "970", "country-code": "ps" },
                { "dial-code": "507", "country-code": "pa" },
                { "dial-code": "675", "country-code": "pg" },
                { "dial-code": "595", "country-code": "py" },
                { "dial-code": "51", "country-code": "pe" },
                { "dial-code": "63", "country-code": "ph" },
                { "dial-code": "48", "country-code": "pl" },
                { "dial-code": "351", "country-code": "pt" },
                { "dial-code": "1", "country-code": "pr" },
                { "dial-code": "974", "country-code": "qa" },
                { "dial-code": "262", "country-code": "re" },
                { "dial-code": "40", "country-code": "ro" },
                { "dial-code": "7", "country-code": "ru" },
                { "dial-code": "250", "country-code": "rw" },
                { "dial-code": "590", "country-code": "bl" },
                { "dial-code": "290", "country-code": "sh" },
                { "dial-code": "1869", "country-code": "kn" },
                { "dial-code": "1758", "country-code": "lc" },
                { "dial-code": "590", "country-code": "mf" },
                { "dial-code": "508", "country-code": "pm" },
                { "dial-code": "1784", "country-code": "vc" },
                { "dial-code": "685", "country-code": "ws" },
                { "dial-code": "378", "country-code": "sm" },
                { "dial-code": "239", "country-code": "st" },
                { "dial-code": "966", "country-code": "sa" },
                { "dial-code": "221", "country-code": "sn" },
                { "dial-code": "381", "country-code": "rs" },
                { "dial-code": "248", "country-code": "sc" },
                { "dial-code": "232", "country-code": "sl" },
                { "dial-code": "65", "country-code": "sg" },
                { "dial-code": "1721", "country-code": "sx" },
                { "dial-code": "421", "country-code": "sk" },
                { "dial-code": "386", "country-code": "si" },
                { "dial-code": "677", "country-code": "sb" },
                { "dial-code": "252", "country-code": "so" },
                { "dial-code": "27", "country-code": "za" },
                { "dial-code": "82", "country-code": "kr" },
                { "dial-code": "211", "country-code": "ss" },
                { "dial-code": "34", "country-code": "es" },
                { "dial-code": "94", "country-code": "lk" },
                { "dial-code": "249", "country-code": "sd" },
                { "dial-code": "597", "country-code": "sr" },
                { "dial-code": "47", "country-code": "sj" },
                { "dial-code": "268", "country-code": "sz" },
                { "dial-code": "46", "country-code": "se" },
                { "dial-code": "41", "country-code": "ch" },
                { "dial-code": "963", "country-code": "sy" },
                { "dial-code": "886", "country-code": "tw" },
                { "dial-code": "992", "country-code": "tj" },
                { "dial-code": "255", "country-code": "tz" },
                { "dial-code": "66", "country-code": "th" },
                { "dial-code": "670", "country-code": "tl" },
                { "dial-code": "228", "country-code": "tg" },
                { "dial-code": "690", "country-code": "tk" },
                { "dial-code": "676", "country-code": "to" },
                { "dial-code": "1868", "country-code": "tt" },
                { "dial-code": "216", "country-code": "tn" },
                { "dial-code": "90", "country-code": "tr" },
                { "dial-code": "993", "country-code": "tm" },
                { "dial-code": "1649", "country-code": "tc" },
                { "dial-code": "688", "country-code": "tv" },
                { "dial-code": "1340", "country-code": "vi" },
                { "dial-code": "256", "country-code": "ug" },
                { "dial-code": "380", "country-code": "ua" },
                { "dial-code": "971", "country-code": "ae" },
                { "dial-code": "44", "country-code": "gb" },
                { "dial-code": "1", "country-code": "us" },
                { "dial-code": "598", "country-code": "uy" },
                { "dial-code": "998", "country-code": "uz" },
                { "dial-code": "678", "country-code": "vu" },
                { "dial-code": "39", "country-code": "va" },
                { "dial-code": "58", "country-code": "ve" },
                { "dial-code": "84", "country-code": "vn" },
                { "dial-code": "681", "country-code": "wf" },
                { "dial-code": "212", "country-code": "eh" },
                { "dial-code": "967", "country-code": "ye" },
                { "dial-code": "260", "country-code": "zm" },
                { "dial-code": "263", "country-code": "zw" },
                { "dial-code": "358", "country-code": "ax" }
            ]
        };
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        no_code: {
            default: false,
            type: Boolean
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.default_value = newValue;
        }
    },
    methods: {
        value_change(value: any) {
            this.$emit("input", value);
        }
    }
});
</script>
<style lang="scss">
.c_telephone {
    display: flex;
}
.c_telephone-popper {
    width: 225px;
}
.c_select {
    flex: 0 0 auto;

    width: 102px;
    margin-right: 14px;
}
body {
    .el-select .el-input .el-input__inner {
        padding: 12px 24px;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #000;
    }
    .el-select .el-input__inner:focus,
    .el-select:hover .el-input__inner {
        border-color: #eaeaea;
    }
    .el-select-dropdown__item.selected {
        color: #000;
    }
    .el-select .el-input .el-select__caret {
        color: #808080;
    }
    .el-select-dropdown {
        border-color: #eaeaea;
        border-radius: 0;
    }
    .el-select-dropdown {
        .el-popper .popper__arrow {
            display: none;
        }
    }
}
</style>
