<template>
    <div class="address-add_panel">
        <el-form :model="data" class="form_group" ref="form_address" :rules="form_rules">
            <el-form-item class="item require" prop="country">
                <div class="name">Country</div>
                <div class="value">
                    <el-select
                        class="mini"
                        v-model="data.country"
                        popper-class="c_address-popper"
                        no-data-text=" "
                    >
                        <el-option
                            v-for="(item) in country_list"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id"
                        ></el-option>
                    </el-select>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="name">
                <div class="name">Name</div>
                <div class="value">
                    <c-input class="mini" type="text" name="name" placeholder v-model="data.name"></c-input>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="province">
                <div class="name">Province/state</div>
                <div class="value">
                    <el-select
                        class="mini"
                        v-model="data.province"
                        popper-class="c_address-popper"
                        no-data-text="请先选择 country"
                    >
                        <el-option
                            v-for="(item) in province_list"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id"
                        ></el-option>
                    </el-select>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="city">
                <div class="name">City</div>
                <div class="value">
                    <el-select
                        class="mini"
                        v-model="data.city"
                        popper-class="c_address-popper"
                        no-data-text="请先选择 Province"
                    >
                        <el-option
                            v-for="(item) in city_list"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id"
                        ></el-option>
                    </el-select>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="address">
                <div class="name">Address</div>
                <div class="value">
                    <c-input
                        class="mini"
                        type="text"
                        name="address"
                        placeholder
                        v-model="data.address"
                    ></c-input>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="zip">
                <div class="name">ZIP code</div>
                <div class="value">
                    <c-input class="mini" type="text" name="address" placeholder v-model="data.zip"></c-input>
                </div>
            </el-form-item>

            <el-form-item class="item require" prop="phone">
                <div class="name">Phone</div>
                <div class="value">
                    <c-telephone class="mini" v-model="data.phone" no_code></c-telephone>
                </div>
            </el-form-item>
            <el-form-item class="item check_default" prop="is_default">
                <div class="name"></div>
                <div class="value">
                    <c-checkbox
                        v-model="data.is_default"
                        label="default"
                        :true-label="1"
                        :false-label="0"
                    >
                        <span class="button-set_default text">Set as default address</span>
                    </c-checkbox>
                </div>
            </el-form-item>
            <div class="item">
                <div class="button address-save_button" @click="save_address">
                    <span class="text">SAVE</span>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { get_region, add_address } from "@/api/api";
export default Vue.extend({
    data() {
        return {
            id: false,
            data: {
                country: "",
                name: "",
                province: "",
                city: "",
                address: "",
                phone: "",
                is_default: 0,
                zip: ""
            },
            country_list: [],
            city_list: [],
            province_list: [],

            form_rules: {
                country: [{ required: true, message: " ", trigger: "submit" }],
                name: [{ required: true, message: " ", trigger: "submit" }],
                province: [{ required: true, message: " ", trigger: "submit" }],
                city: [{ required: true, message: " ", trigger: "submit" }],
                address: [{ required: true, message: " ", trigger: "submit" }],
                phone: [{ required: true, message: " ", trigger: "submit" }],
                zip: [{ required: true, message: " ", trigger: "submit" }]
            }
        };
    },
    props: {
        address: {
            type: Object
        },
        reset: {
            type: Boolean
        }
    },
    watch: {
        "data.country"(newValue) {
            get_region({ id: newValue }).then(response => {
                this.province_list = response.data;
            });
        },
        "data.province"(newValue) {
            get_region({ id: newValue }).then(response => {
                this.city_list = response.data;
            });
        },
        address(newValue) {
            if (newValue.id) {
                this.id = newValue.id;
                this.data = {
                    country: newValue.country_id,
                    name: newValue.username,
                    province: newValue.state_id,
                    city: newValue.city_id,
                    address: newValue.address,
                    phone: newValue.mobile,
                    is_default: newValue.is_default,
                    zip: newValue.zip_code
                };
            } else {
                this.id = false;
                this.data = {
                    country: "",
                    name: "",
                    province: "",
                    city: "",
                    address: "",
                    phone: "",
                    is_default: 0,
                    zip: ""
                };
            }
        },
        reset() {
            this.id = false;
            this.data = {
                country: "",
                name: "",
                province: "",
                city: "",
                address: "",
                phone: "",
                is_default: 0,
                zip: ""
            };
            this.city_list = [];
            this.province_list = [];
        }
    },
    methods: {
        save_address(this: any) {
            this.$refs.form_address.validate((valid: any) => {
                if (valid) {
                    if (this.id) {
                        add_address({ id: this.id, ...this.data }).then(
                            response => {
                                this.$emit("save");
                            }
                        );
                    } else {
                        add_address(this.data).then(response => {
                            this.$emit("save");
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    created() {
        get_region().then(response => {
            console.log(response);
            this.country_list = response.data;
        });
    }
});
</script>
<style lang="scss">
.address-add_panel {
    padding-top: 19px;

    border-top: 1px solid #eaeaea;
    .button-set_default {
        color: #404040;
    }
    .item {
        margin-bottom: 20px;
        &.require {
            .name {
                &:after {
                    content: "*";

                    color: #eb3030;
                }
            }
        }
        &.check_default {
            margin: 30px 0 0 0;
            .name {
                &:after {
                    display: none;
                }
            }
        }
    }
    .el-form-item__content {
        font-family: MTTMILANO-regular;

        display: flex;

        margin-bottom: 14px;

        align-items: center;

        &:last-child {
            margin-bottom: 0;
        }
        .name {
            flex: 0 0 auto;

            width: 190px;
            margin-right: 20px;
        }
        .value {
            flex: 1 1 auto;
            .el-select {
                width: 100%;
            }
        }
    }
    .address-save_button {
        font-family: MTTMILANO-BOLD;
        font-size: 28px;
        line-height: 74px;

        width: 100%;
        margin-top: 38px;

        transition: 0.36s ease;
        text-align: center;

        color: #fff;
        background-color: #afafaf;
        &:hover {
            background-color: #000;
        }
    }
}
</style>
