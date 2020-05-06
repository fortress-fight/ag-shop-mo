<template>
    <div class="wrapper-my_page">
        <div class="top_tab_bar">
            <div
                class="item"
                :class="{ active: sidebar_active == 'security' }"
                @click="set_sider('security')"
            >
                <span class="text">security setting</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'order' }"
                @click="set_sider('order')"
            >
                <span class="text">Order</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'address' }"
                @click="set_sider('address')"
            >
                <span class="text">address</span>
            </div>
            <div
                class="item"
                :class="{ active: sidebar_active == 'comment' }"
                @click="set_sider('comment')"
            >
                <span class="text">upload pictures</span>
            </div>
        </div>
        <div class="body-my_page">
            <div
                class="my_page-container setting_panel"
                v-if="sidebar_active == 'security'"
            >
                <div class="container-header">
                    <span class="text">Account information</span>
                </div>

                <div class="container-body">
                    <transition-group
                        name="tab_panel"
                        mode="in-out"
                        tag="div"
                        class="setting_panel-container"
                        v-on:enter="enter"
                        v-on:leave="leave"
                    >
                        <div
                            class="col setting_panel-base"
                            v-if="setting_panel == 'base'"
                            key="base"
                        >
                            <div class="row">
                                <div class="name">
                                    <span class="text">Name</span>
                                </div>
                                <div class="value">
                                    <span class="text">{{
                                        user_info.alias
                                    }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">
                                    <span class="text">Phone</span>
                                </div>
                                <div class="value flex">
                                    <span class="text">{{
                                        user_info.mobile
                                    }}</span>
                                    <div
                                        class="verification_button button-effect2 button col"
                                        @click="setting_panel = 'editor_phone'"
                                    >
                                        <span class="text">Verification ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">
                                    <span class="text">E-mail</span>
                                </div>
                                <div class="value flex">
                                    <span class="text">{{
                                        user_info.email
                                    }}</span>
                                    <div
                                        class="verification_button button-effect2 button col"
                                        @click="setting_panel = 'editor_email'"
                                    >
                                        <span class="text">Verification ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="button button-setting_editor_submit button-setting_submit button-effect"
                                    @click="setting_panel = 'editor_name'"
                                >
                                    <span class="text">EDIT</span>
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="button button-change_password"
                                    @click="setting_panel = 'password'"
                                >
                                    <span class="text">Change Password</span>
                                </div>
                            </div>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_name'"
                            key="editor_name"
                        >
                            <el-form
                                ref="name_register"
                                :model="setting"
                                :rules="v_form_test"
                            >
                                <el-form-item prop="username">
                                    <div class="row">
                                        <div class="name col flex-yc">
                                            <span class="text">Username</span>
                                        </div>
                                        <div class="value col">
                                            <c-input
                                                v-model="setting.alias"
                                            ></c-input>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="update_user_name()"
                                    >
                                        <span class="text">SUBMIT</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_phone'"
                            key="editor_phone"
                        >
                            <el-form
                                ref="phone_register"
                                :model="setting"
                                :rules="v_form_test"
                            >
                                <el-form-item prop="phone">
                                    <div class="row">
                                        <div class="name flex-yc col">
                                            <span class="text">Phone</span>
                                        </div>
                                        <div class="value col">
                                            <c-telephone-pre
                                                v-model="setting.phone"
                                            ></c-telephone-pre>
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item prop="phone_code">
                                    <div class="row phone_verification">
                                        <div class="name flex-yc col"></div>
                                        <div class="value col">
                                            <c-send-code
                                                v-model="setting.phone_code"
                                                :send_code_target="{
                                                    type: 'phone',
                                                    value: setting.phone
                                                }"
                                            ></c-send-code>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="submit_phone"
                                    >
                                        <span class="text">Confirm</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-edit"
                            v-if="setting_panel == 'editor_email'"
                            key="editor_email"
                        >
                            <el-form
                                ref="email_register"
                                :model="setting"
                                :rules="v_form_test"
                            >
                                <el-form-item prop="e_mail">
                                    <div class="row">
                                        <div class="name col flex-yc">
                                            <span class="text">E-mail</span>
                                        </div>
                                        <div class="value col">
                                            <c-input
                                                v-model="setting.e_mail.value"
                                            ></c-input>
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item prop="e_mail_code">
                                    <div class="row mail_verification">
                                        <div class="name col"></div>
                                        <div class="value col">
                                            <c-send-code
                                                v-model="setting.e_mail_code"
                                                :send_code_target="{
                                                    type: 'email',
                                                    value: setting.e_mail.value
                                                }"
                                            ></c-send-code>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="row">
                                    <div
                                        class="button button-setting_submit button-effect col"
                                        @click="submit_email"
                                    >
                                        <span class="text">Conform</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password col"
                                        @click="setting_panel = 'base'"
                                    >
                                        <span class="text">Back</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>

                        <div
                            class="col setting_panel-change_password"
                            v-if="setting_panel == 'password'"
                            key="password"
                        >
                            <el-form
                                ref="password_register"
                                :model="change_password_data"
                                :rules="v_form_test"
                            >
                                <div class="row">
                                    <el-form-item prop="old_password">
                                        <c-input
                                            placeholder="Old password"
                                            v-model="
                                                change_password_data.old_password
                                            "
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>
                                </div>
                                <div class="row">
                                    <el-form-item prop="new_password">
                                        <c-input
                                            v-model="
                                                change_password_data.new_password
                                            "
                                            placeholder="New password"
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>

                                    <div class="message">
                                        <span class="text"
                                            >Please enter 8-16 alphanumeric
                                            characters</span
                                        >
                                    </div>
                                </div>
                                <div class="row">
                                    <el-form-item prop="confirm_password">
                                        <c-input
                                            placeholder="Confirm password"
                                            v-model="
                                                change_password_data.confirm_password
                                            "
                                            show-password
                                            type="password"
                                        ></c-input>
                                    </el-form-item>

                                    <div
                                        class="error_message text"
                                        v-if="error_message"
                                    >
                                        {{ error_message }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button-setting_submit button button-effect button-setting_submit"
                                        @click="change_password_submit"
                                    >
                                        <span class="text">Submit</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="button button-change_password_cancel button-effect2"
                                        @click="change_password_cancel"
                                    >
                                        <span class="text">Cancel</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </transition-group>
                </div>
            </div>

            <div
                class="my_page-container order_panel"
                v-if="sidebar_active == 'order'"
            >
                <transition-group
                    name="tab_panel"
                    mode="in-out"
                    tag="div"
                    class="order_panel-container"
                    v-on:enter="enter"
                    v-on:leave="leave"
                >
                    <div v-if="!order_detail.show" key="order-list">
                        <div class="container-header flex-sb flex-yc">
                            <span class="text">Order</span>

                            <el-select
                                v-model="order_status.select"
                                placeholder="ALL"
                                class="select-order_status"
                                popper-class="select_popper-order_status"
                            >
                                <el-option
                                    v-for="item in order_status.list"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>

                        <div class="container-body">
                            <div class="order-list">
                                <div
                                    class="order-list_item"
                                    v-for="(order, index) in order_list"
                                    :key="index"
                                >
                                    <div class="order-item_header">
                                        <div
                                            class="order-detail_header flex flex-sb"
                                        >
                                            <span class="text">{{
                                                order.order_sn
                                            }}</span>
                                            <span class="text">{{
                                                order.status_name
                                            }}</span>
                                        </div>
                                    </div>

                                    <div class="order-item_body">
                                        <template
                                            v-for="(order_commodity,
                                            index) in order.order_goods"
                                        >
                                            <a
                                                :href="
                                                    order_commodity.sku.goods
                                                        .url
                                                "
                                                class="order_detail-list"
                                                v-if="order_commodity.sku.goods"
                                                :key="index"
                                            >
                                                <div class="order_detail-col">
                                                    <img
                                                        :src="
                                                            order_commodity.sku
                                                                .goods.img
                                                                | upload_resource_link
                                                        "
                                                        alt
                                                        class="image_preview"
                                                    />
                                                </div>
                                                <div class="order_detail-col">
                                                    <div class="des">
                                                        <div class="top">
                                                            <span
                                                                class="text des_text"
                                                            >
                                                                {{
                                                                    order_commodity
                                                                        .sku
                                                                        .goods
                                                                        .name_cn
                                                                }}
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="bottom des_spec"
                                                        >
                                                            <span class="text"
                                                                >{{
                                                                    order_commodity
                                                                        .sku
                                                                        .size
                                                                }}-{{
                                                                    order_commodity
                                                                        .sku
                                                                        .color
                                                                }}</span
                                                            >
                                                            <span class="text">
                                                                {{
                                                                    order_commodity.num
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="text price">
                                                        ${{
                                                            order_commodity.sku
                                                                .goods.cost
                                                        }}
                                                    </div>
                                                </div>
                                            </a>
                                        </template>
                                        <div
                                            class="order-item_total-price flex flex-sb"
                                        >
                                            <div class="left">
                                                TOTAL(including freight an tax)
                                            </div>
                                            <div class="right">
                                                ${{
                                                    plus(
                                                        order.price,
                                                        order.shipping_price
                                                    )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="order-item_footer">
                                        <div
                                            class="button button-order_detail button-effect2"
                                            @click="show_detail(order.id)"
                                            v-if="order.status !== 0"
                                        >
                                            <span class="text"
                                                >Order detail</span
                                            >
                                        </div>
                                        <template v-else>
                                            <a
                                                class="button button-order_pay button-effect"
                                                target="_blank"
                                                :href="
                                                    `/user/order_info.html?id=${order.id}`
                                                "
                                            >
                                                <span class="text"
                                                    >Payment</span
                                                >
                                            </a>
                                            <div
                                                class="button button-order_cancel button-effect2"
                                                @click="order_cannel(order.id)"
                                            >
                                                <span class="text">Cancel</span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key="order_panel-detail" v-else>
                        <div
                            class="container-body"
                            v-if="order_detail.data && order_detail.data.id"
                        >
                            <div class="order_panel-detail">
                                <div
                                    class="back-button button button-effect2"
                                    @click="order_detail.show = false"
                                >
                                    <i class="ic"><&nbsp;</i>
                                    <span class="text">Back</span>
                                </div>
                                <div class="reveive_info">
                                    <div class="title">
                                        <span class="text"
                                            >Order Information</span
                                        >
                                    </div>
                                    <div class="list">
                                        <div class="item">
                                            <span class="name text"
                                                >Username:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.name
                                            }}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text"
                                                >Phone:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.mobile
                                            }}</span>
                                        </div>
                                        <div
                                            class="item"
                                            v-if="order_detail.data.address"
                                        >
                                            <span class="name text"
                                                >Address:</span
                                            >

                                            <span class="value text">{{
                                                order_detail.data.address
                                            }}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text"
                                                >Delivery:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.shipping_type
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order_info">
                                    <div class="title">
                                        <span class="text"
                                            >ORDER INFORMATION</span
                                        >
                                    </div>
                                    <div class="list">
                                        <div class="item">
                                            <span class="name text"
                                                >OrderID:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.order_sn
                                            }}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text"
                                                >Order time:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.create_time
                                            }}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text"
                                                >Payment time:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.pay_time
                                            }}</span>
                                        </div>
                                        <div class="item">
                                            <span class="name text"
                                                >Logistics number:</span
                                            >
                                            <span class="value text">{{
                                                order_detail.data.shipping_sn
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-list">
                                    <div class="order-list_item">
                                        <div class="order-item_header">
                                            <div
                                                class="order-detail_header flex flex-sb"
                                            >
                                                <span class="text">{{
                                                    order_detail.data.order_sn
                                                }}</span>
                                                <span class="text">{{
                                                    order_detail.data
                                                        .status_name
                                                }}</span>
                                            </div>
                                        </div>

                                        <div class="order-item_body">
                                            <template
                                                v-for="(order_commodity,
                                                index) in order_detail.data
                                                    .order_goods"
                                            >
                                                <a
                                                    :href="
                                                        order_commodity.sku
                                                            .goods.url
                                                    "
                                                    class="order_detail-list"
                                                    v-if="
                                                        order_commodity.sku
                                                            .goods
                                                    "
                                                    :key="index"
                                                >
                                                    <div
                                                        class="order_detail-col"
                                                    >
                                                        <img
                                                            :src="
                                                                order_commodity
                                                                    .sku.goods
                                                                    .img
                                                                    | upload_resource_link
                                                            "
                                                            alt
                                                            class="image_preview"
                                                        />
                                                    </div>
                                                    <div
                                                        class="order_detail-col"
                                                    >
                                                        <div class="des">
                                                            <div class="top">
                                                                <span
                                                                    class="text des_text"
                                                                >
                                                                    {{
                                                                        order_commodity
                                                                            .sku
                                                                            .goods
                                                                            .name_cn
                                                                    }}
                                                                </span>
                                                            </div>
                                                            <div
                                                                class="bottom des_spec"
                                                            >
                                                                <span
                                                                    class="text"
                                                                    >{{
                                                                        order_commodity
                                                                            .sku
                                                                            .size
                                                                    }}-{{
                                                                        order_commodity
                                                                            .sku
                                                                            .color
                                                                    }}</span
                                                                >
                                                                <span
                                                                    class="text"
                                                                >
                                                                    {{
                                                                        order_commodity.num
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="text price">
                                                            ${{
                                                                order_commodity
                                                                    .sku.goods
                                                                    .cost
                                                            }}
                                                        </div>
                                                    </div>
                                                </a>
                                            </template>
                                            <div
                                                class="order-item_total-price flex flex-sb"
                                            >
                                                <div class="left">
                                                    TOTAL(including freight and
                                                    tax)
                                                </div>
                                                <div class="right">
                                                    ${{
                                                        plus(
                                                            order_detail.data
                                                                .price,
                                                            order_detail.data
                                                                .shipping_price
                                                        )
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>

            <div
                class="my_page-container address_panel"
                v-if="sidebar_active == 'address'"
            >
                <div class="container-header">
                    <span class="text">SHIPPING ADDRESS</span>
                </div>
                <div class="container-body">
                    <div class="address_list">
                        <div
                            class="address_list-body row"
                            v-for="address in address_list"
                            :key="address.id"
                        >
                            <div class="col flex-yc flex-sb">
                                <div class="left flex flex-yc">
                                    <span class="name text">{{
                                        address.username
                                    }}</span>

                                    <div
                                        class="is_default button"
                                        :class="{
                                            select: address.is_default == 1
                                        }"
                                    ></div>
                                </div>
                                <div class="right flex">
                                    <div
                                        class="button"
                                        @click="edit_address(address)"
                                    >
                                        EDIT
                                    </div>
                                    <div
                                        class="button"
                                        @click="del_address(address)"
                                    >
                                        DELETE
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <span class="text">{{ address.mobile }}</span>
                            </div>
                            <div class="col">
                                <span class="text"
                                    >{{ address.country_name
                                    }}{{ address.city_name
                                    }}{{ address.state_name
                                    }}{{ address.address }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="button button-effect button-add_address"
                        @click="add_address_dialog_show = true"
                    >
                        <span class="text">ADD</span>
                    </div>
                </div>
            </div>

            <div
                class="my_page-container comment_panel"
                v-if="sidebar_active == 'comment'"
            >
                <div class="container-header">
                    <span class="text">Buying show</span>
                </div>
                <div class="container-body">
                    <div class="comment_list">
                        <div
                            class="item flex flex-sb"
                            v-for="item in comment_list"
                            :key="item.id"
                        >
                            <div class="left flex">
                                <div class="title text">{{ item.title }}</div>
                                <div class="date text">
                                    {{ item.update_time }}
                                </div>
                            </div>
                            <div class="right flex flex-sb">
                                <div
                                    class="button button-comment_edit"
                                    @click="edit_comment(item)"
                                >
                                    EDIT
                                </div>
                                <div
                                    class="button button-comment_remove"
                                    @click="del_comment(item)"
                                >
                                    <i class="ic ag-icon ag-close_1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="button button-effect button-create_comment"
                        @click="upload_image_panel_show = true"
                    >
                        <span class="text">添加</span>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="dialog-upload_image_panel"
            :class="{ show: upload_image_panel_show }"
        >
            <div class="dialog-container w">
                <div
                    class="dialog-close_button button"
                    @click="upload_image_panel_show = false"
                >
                    <i class="ic ag-icon ag-close_1"></i>
                </div>
                <div class="row require title">
                    <div class="name">
                        <span class="text">Title</span>
                    </div>
                    <div class="value">
                        <c-input v-model="upload_data.title"></c-input>
                    </div>
                </div>
                <div class="row">
                    <div class="name">Describe</div>
                    <div class="value">
                        <textarea
                            v-model="upload_data.des"
                            name="describe"
                        ></textarea>
                    </div>
                </div>
                <div class="row require pic">
                    <div class="name">Picture</div>
                    <div class="value">
                        <div
                            class="upload-com"
                            v-if="!upload_data.pictures.length"
                        >
                            <el-upload
                                class="avatar-uploader"
                                action="/api/upload_img.html"
                                name="Filedata"
                                accept="image/x-png, image/gif, image/jpeg, image/bmp"
                                :show-file-list="false"
                                :on-success="upload_handle"
                                :before-upload="beforeUpload_handle"
                            ></el-upload>
                            <i class="ic ag-icon ag-upload"></i>
                            <span class="text">Upload</span>
                        </div>
                        <div class="upload-com upload-list" v-else>
                            <draggable
                                v-model="upload_data.pictures"
                                draggable=".item-img_preview"
                                class="image_list"
                            >
                                <div
                                    class="item item-img_preview"
                                    v-for="(img, index) in upload_data.pictures"
                                    :key="index"
                                >
                                    <img
                                        :src="img | upload_resource_link"
                                        alt
                                        class="image_preview"
                                    />
                                    <div
                                        class="button button-oper flex flex-c"
                                        @click="delete_img(index)"
                                    >
                                        <i class="ic ag-icon ag-delete"></i>
                                    </div>
                                </div>
                                <div
                                    class="item item-img_upload"
                                    v-if="!(upload_data.pictures.length >= 4)"
                                >
                                    <el-upload
                                        class="avatar-uploader"
                                        action="/api/upload_img.html"
                                        name="Filedata"
                                        accept="image/x-png, image/gif, image/jpeg, image/bmp"
                                        :show-file-list="false"
                                        :on-success="upload_handle"
                                        :before-upload="beforeUpload_handle"
                                    ></el-upload>
                                    <div class="button button-oper flex flex-c">
                                        <i class="ic ag-icon ag-add"></i>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div
                        class="button button-publish button-effect"
                        @click="publish_handler"
                    >
                        <span class="text">Release</span>
                    </div>
                </div>
            </div>
        </div>
        <add-address-dialog
            :show="add_address_dialog_show"
            v-on:close="close_add_address_dialog"
            :address="edit_address_data"
        ></add-address-dialog>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import BigNumber from "bignumber.js";
import { v_form_test } from "@/unit/vue";
import {
    order_list,
    get_address,
    user_picture_list,
    upload_picture,
    add_address,
    get_user,
    user_update,
    order_detail,
    send_code,
    user_info_bind,
    change_pwdt,
    order_cannel
} from "@/api/api";
import {
    order_data,
    order_detail_data,
    address_data,
    comment_list_data
} from "@/api/fake_data";
import anime from "animejs";
import dialog_add_address from "@/components/dialog-add_address";
import draggable from "vuedraggable";
export default Vue.extend({
    data() {
        return {
            sidebar_active: "security",
            setting_panel: "base",
            setting: {
                alias: "",
                phone: {
                    code: "",
                    number: ""
                },
                phone_code: "",
                e_mail: {
                    value: ""
                },
                e_mail_code: ""
            },
            v_form_test,
            user_info: {
                alias: "",
                mobile: "",
                email: ""
            },
            change_password_data: {
                new_password: "",
                old_password: "",
                confirm_password: ""
            },
            error_message: "",

            order_status: {
                select: "",
                list: [
                    {
                        label: "All",
                        value: "All"
                    },
                    {
                        label: "unpaid",
                        value: "unpaid"
                    },
                    {
                        label: "paid",
                        value: "paid"
                    },
                    {
                        label: "completed",
                        value: "completed"
                    },
                    {
                        label: "cancelled",
                        value: "cancelled"
                    }
                ]
            },
            order_list: order_data,

            order_detail: {
                show: false,
                data: order_detail_data
            },
            address_list: address_data,
            add_address_dialog_show: false,
            edit_address_data: {},
            comment_list: comment_list_data,
            upload_image_panel_show: false,

            upload_data: {
                id: "",
                title: "",
                des: "",
                pictures: []
            }
        };
    },
    components: { draggable, "add-address-dialog": dialog_add_address },
    watch: {
        setting_panel() {
            window.scrollTo(0, 0);
        },
        sidebar_active(new_value) {
            switch (new_value) {
                case "security":
                    get_user().then(res => {
                        this.user_info = {
                            alias: res.data.alias || "",
                            mobile: res.data.mobile || "",
                            email: res.data.email || ""
                        };
                    });
                    break;
                case "order":
                    order_list().then(response => {
                        this.order_list = response.data;
                    });
                    break;
                case "address":
                    get_address().then(response => {
                        this.address_list = response.data;
                    });
                    break;
                case "comment":
                    user_picture_list().then(response => {
                        this.comment_list = response.data;
                    });
                    break;

                default:
                    break;
            }
        }
    },
    methods: {
        order_cannel(id) {
            order_cannel({
                id
            })
                .then(res => {
                    return order_list();
                })
                .then(response => {
                    this.order_list = response.data;
                });
        },
        plus(num, num2) {
            return new BigNumber(num).plus(new BigNumber(num2)).toFixed(2);
        },
        delete_img(id: number) {
            this.upload_data.pictures.splice(id, 1);
        },
        enter(el: HTMLElement, done: Function) {
            anime({
                targets: el,
                left: ["100%", 0],
                opacity: [0, 1],
                duration: 260,
                complete() {
                    $(el).css({
                        postion: "relative"
                    });
                    $(el)
                        .siblings()
                        .css({
                            postion: "absolute"
                        });
                    done();
                },
                easing: "linear"
            });
        },
        leave(el: HTMLElement, done: any) {
            anime({
                targets: el,
                opacity: [1, 0],
                duration: 260,
                complete: done,
                easing: "linear"
            });
        },
        set_sider(name: string) {
            this.sidebar_active = name;
            window.scrollTo(0, 0);
        },
        update_user_name(this: any) {
            this.$refs.name_register.validate((valid: Boolean) => {
                if (valid) {
                    user_update({
                        alias: this.setting.alias
                    }).then(() => {
                        this.user_info.alias = this.setting.alias;
                        this.setting.alias = "";
                        this.setting_panel = "base";
                    });
                }
            });
        },
        close_add_address_dialog() {
            this.add_address_dialog_show = false;
            get_address().then(response => {
                this.address_list = response.data;
            });
        },
        submit_phone(this: any) {
            this.$refs.phone_register.validate((valid: Boolean) => {
                if (valid) {
                    user_info_bind({
                        code: this.setting.phone_code,
                        device: this.setting.phone.number
                    }).then(res => {
                        this.setting_panel = "base";
                        this.setting.phone_code = "";
                        this.setting.phone.number = "";
                        this.update_user_info();
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submit_email(this: any) {
            this.$refs.email_register.validate((valid: Boolean) => {
                if (valid) {
                    user_info_bind({
                        code: this.setting.e_mail_code,
                        device: this.setting.e_mail.value
                    }).then(res => {
                        this.setting_panel = "base";
                        this.setting.e_mail_code = "";
                        this.setting.e_mail.value = "";
                        this.update_user_info();
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        change_password_cancel() {
            this.setting_panel = "base";
            this.change_password_data = {
                new_password: "",
                old_password: "",
                confirm_password: ""
            };
        },
        change_password_submit(this: any) {
            this.$refs.password_register.validate((valid: any) => {
                if (valid) {
                    if (this.change_password_data !== this.confirm_password) {
                        this.error_message =
                            "Two input password must be consistent!";
                    } else {
                        change_pwdt({
                            pwd: this.change_password_data.old_password,
                            new_pwd: this.change_password_data.new_password
                        }).then(res => {
                            this.$message({
                                message: "SUCCESS",
                                type: "success"
                            });
                            this.change_password_data = {
                                new_password: "",
                                old_password: "",
                                confirm_password: ""
                            };
                        });
                    }
                }
            });
        },
        show_detail(id: string) {
            this.order_detail.show = true;
            console.log("this.order_list:", this.order_list);
            this.order_detail.data = this.order_list[id];

            order_detail({ id: id }).then(response => {
                this.order_detail.data = response.data;
            });
            window.scrollTo(0, 0);
        },
        set_address_default(index: number, address: any) {
            add_address({
                act: "set_default",
                id: address.id
            }).then(response => {
                get_address().then(response => {
                    this.address_list = response.data;
                });
            });
        },

        edit_address(address: any) {
            this.edit_address_data = address;

            this.add_address_dialog_show = true;
        },
        del_address(address: any) {
            add_address({
                act: "del",
                id: address.id
            }).then(response => {
                get_address().then(response => {
                    this.address_list = response.data;
                });
            });
        },

        upload_handle(response: any) {
            if (response.data.url) {
                (this.upload_data as any).pictures.push(response.data.url);
            }
        },
        beforeUpload_handle(file: any) {
            const isImg = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif"
            ].includes(file.type);
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isImg) {
                this.$message.error("Please upload a picture in JPG format");
            }
            if (!isLt5M) {
                this.$message.error("Please upload pictures up to 5M!");
            }
            return isImg && isLt5M;
        },
        publish_handler() {
            $(".require .value").removeClass("error");

            if (!this.upload_data.title.length) {
                $(".require.title .value").addClass("error");
                return false;
            }

            if (!this.upload_data.pictures.length) {
                $(".require.pic .value").addClass("error");
                return false;
            }
            let img_json: any = {};
            this.upload_data.pictures.forEach((url, index) => {
                img_json[index] = url;
            });

            let data: any = {
                title: this.upload_data.title,
                desc: this.upload_data.des,
                img: img_json
            };

            if (this.upload_data.id) {
                data.id = this.upload_data.id;
            }

            upload_picture(data).then(response => {
                this.upload_image_panel_show = false;

                user_picture_list().then(response => {
                    this.comment_list = response.data;
                });
            });
        },
        edit_comment(data: any) {
            let pics: string[] = [];
            if (data.imgs) {
                data.imgs.forEach((url: string) => {
                    pics.push(url);
                });
            }
            (this.upload_data as any) = {
                id: data.id,
                title: data.title,
                des: data.desc,
                pictures: pics
            };
            this.upload_image_panel_show = true;
        },
        del_comment(data: any) {
            upload_picture({ id: data.id, act: "del" }).then(response => {
                user_picture_list().then(response => {
                    this.comment_list = response.data;
                });
            });
        },
        update_user_info() {
            get_user().then(res => {
                this.user_info = {
                    alias: res.data.alias || "",
                    mobile: res.data.mobile || "",
                    email: res.data.email || ""
                };
            });
        }
    },
    created() {
        let search_str = window.location.search.slice(1);
        let search_str_arr = [];
        let search_str_data: any = {};
        if (search_str) {
            search_str_arr = search_str.split("&");
            search_str_arr.forEach(item => {
                if (item) {
                    let arr = item.split("=");
                    search_str_data[arr[0]] = arr[1];
                }
            });
        }

        if (search_str_data.tab) {
            this.sidebar_active = search_str_data.tab;
        }

        this.update_user_info();
    },
    mounted() {
        $(".dialog-upload_image_panel").on("touchmove", function(event) {
            event.preventDefault();
        });
        window.scrollTo(0, 0);
    }
});
</script>
<style lang="scss">
.top_tab_bar {
    line-height: 77px;

    overflow: auto;

    width: 100%;

    white-space: nowrap;

    border-bottom: 1px solid #eaeaea;
    .item {
        font-family: $FM;
        font-size: 24px;

        display: inline-block;

        margin-right: 55px;

        transition: 0.36s ease;
        text-transform: uppercase;

        color: #999;
        &:last-child {
            margin: 0;
        }
        &.active {
            color: #000;
        }
    }
}
.select_popper-order_status {
    font-family: $FM;

    text-transform: uppercase;
}
.my_page-container {
    .order_panel-detail {
        & > div {
            margin: 0;
            margin-bottom: 26px;
            padding-bottom: 40px;

            border-bottom: 1px solid #eaeaea;
        }
        .back-button {
            font-size: 24px;
            line-height: 74px;

            margin: 0;
            padding: 0;

            border: none;
            .ic {
                font-size: 30px;
            }
        }
        .order-list {
            border: none;
        }
        .title {
            font-family: $FM;
            font-size: 34px;
            line-height: 62px;

            text-transform: uppercase;
        }
        .item {
            font-size: 28px;
            .name {
                line-height: 47px;

                margin-right: 6px;

                color: #666;
            }
        }
        .order-item_header {
            background-color: #faf9f9;
            .text {
                line-height: 60px;

                display: inline-block;
            }
        }
    }
    .order_panel-container {
        position: relative;

        overflow: hidden;

        width: 100%;
        & > div {
            position: absolute;
            top: 0;
            left: 100%;

            background: #fff;
            &:first-child {
                position: relative;
                left: 0;
            }
        }
    }
    &.order_panel {
        .order-list_item {
            margin-bottom: 52px;

            border-bottom: 1px solid #eaeaea;
            &:last-child {
                border: none;
            }
        }
        .order-item_header {
            font-size: 24px;
            line-height: 28px;

            margin-bottom: 17px;
            padding: 0 20px;
        }
        .order-item_footer {
            padding: 0 20px;
            .button {
                font-size: 24px;
                line-height: 80px;

                width: 100%;

                text-align: center;

                color: #fff;
                background: #000;
            }
            .button-order_detail,
            .button-order_cancel {
                color: #999;
                background: transparent;
            }
        }
        .order_detail-list {
            display: flex;
            flex: 0 1 auto;

            box-sizing: border-box;
            padding: 20px 20px;

            border-bottom: 1px solid #eaeaea;
            .order_detail-col {
                position: relative;

                display: flex;
                flex: 0 1 auto;

                box-sizing: border-box;
                height: 150px;

                text-align: left;

                align-items: center;
                .price {
                    font-family: $FM;
                    font-size: 24px;

                    position: absolute;
                    right: 0;
                    bottom: 8px;
                }
                .des {
                    display: flex;
                    flex-direction: column;

                    height: 100%;

                    justify-content: space-between;
                    .text {
                        display: block;
                    }
                }
                .des_spec {
                    font-family: MTTMILANO-regular;
                    font-size: 24px;
                    line-height: 26px;

                    padding-bottom: 4px;

                    color: #202020;
                }
                .des_text {
                    font-family: $FM;
                    font-size: 28px;

                    overflow: hidden;

                    white-space: nowrap;
                    text-transform: uppercase;
                    text-overflow: ellipsis;

                    color: #000;
                }
                &:nth-child(1) {
                    flex: 0 0 auto;

                    width: 112px;

                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                &:nth-child(2) {
                    flex: 1 1 auto;

                    padding-left: 30px;
                }
            }
        }
        .order-item_total-price {
            font-family: $FM;
            font-size: 26px;
            line-height: 80px;

            padding: 0 20px;
        }
    }
    .container-header {
        font-family: $FM;
        font-size: 34px;
        line-height: 132px;

        text-transform: uppercase;

        color: #000;
        .el-select {
            font-family: $FM;
            font-size: 24px;

            width: 220px;
            height: 76px;

            .el-input,
            .el-input .el-input__inner {
                line-height: 76px;

                box-sizing: border-box;
                height: 76px;
                padding: 0;

                text-transform: uppercase;

                border: none;
            }
            .el-input__suffix {
                right: 0;
            }
        }
    }
    .button-setting_submit {
        font-family: $FM;
        font-size: 28px;

        display: flex;

        width: 290px;
        height: 80px;
        margin-top: 38px;
        margin-bottom: 33px;

        color: #fff;
        background: #000;

        align-items: center;
        justify-content: center;
    }
    &.setting_panel {
        .setting_panel-container {
            position: relative;

            overflow-x: hidden;
            & > .col {
                position: absolute;
                top: 0;
                left: 100%;

                background: #fff;
                &:first-child {
                    position: relative;
                    left: 0;
                }
            }
        }
        .row {
            font-family: $FM;
            font-size: 28px;
            line-height: 50px;

            display: flex;

            margin-bottom: 20px;
        }
        .name {
            flex: 0 0 auto;

            width: 120px;

            color: #666;
        }
        .value {
            font-family: MTTMILANO-REGULAR;

            flex: 1 1 auto;

            color: #000;
            .text:first-child {
                display: inline-block;

                min-width: 220px;
            }
        }
        .verification_button {
            font-size: 24px;

            margin-left: 26px;

            color: #999;
        }
        .button-change_password {
            font-size: 24px;
            line-height: 36px;

            margin-top: 12px;

            text-decoration: underline;

            color: #999;
        }
        .setting_panel-change_password {
            .row {
                font-family: MTTMILANO-REGULAR;

                display: block;
            }
            .message {
                font-size: 24px;
                line-height: 30px;

                box-sizing: border-box;
                width: 564px;
                padding: 13px 0;
                padding-left: 40px;

                color: #999;
            }

            .button-setting_submit {
                width: 100%;
                margin-bottom: 0;
            }
        }

        .button-change_password_cancel {
            font-size: 24px;

            text-align: center;

            color: #999;
        }
    }
    .error_message {
        font-size: 24px;
        line-height: 28px;

        padding-top: 20px;

        text-transform: uppercase;

        color: #f56c6c;
    }
    &.address_panel {
        .address_list-body {
            font-size: 24px;
            line-height: 34px;

            margin-bottom: 20px;
            padding-bottom: 25px;

            color: #666;
            border-bottom: 1px solid #eaeaea;
            &:last-child {
                margin-bottom: 0;
            }
            .col:first-child {
                font-family: $FM;
                font-size: 34px;

                height: 60px;

                color: #000;
                .is_default {
                    font-size: 24px;
                    line-height: 36px;

                    display: none;

                    width: 86px;

                    text-align: center;

                    color: #fff;
                    background: #000;
                    &.select {
                        display: block;
                    }
                    &:before {
                        display: inline-block;

                        content: "默认";
                        transform: scale(0.8);
                    }
                }
                .name {
                    margin-right: 16px;
                }
                .right {
                    .button {
                        font-size: 24px;

                        margin-right: 28px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
    &.comment_panel {
        font-size: 28px;
        line-height: 80px;
        .item {
            border-bottom: 1px solid #eaeaea;
        }
        .button-comment_edit {
            font-size: 24px;

            margin-right: 35px;
        }
        .button-comment_remove {
            font-size: 24px;
        }
        .title {
            font-family: $FM;

            overflow: hidden;

            width: 120px;
            margin-right: 22px;

            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .button-create_comment,
    .button-add_address {
        font-family: $FM;
        font-size: 28px;
        line-height: 80px;

        width: 290px;
        margin-top: 50px;

        text-align: center;
        text-transform: uppercase;

        color: #fff;
        background-color: #000;
    }
}
.dialog-upload_image_panel {
    position: fixed;
    z-index: 900;
    top: 0;
    left: 0;

    visibility: hidden;
    overflow: auto;

    width: 100%;
    height: 100%;

    transition: 0.36s ease;
    transform: translateY(30px);

    opacity: 0;
    background-color: #fff;
    &.show {
        visibility: visible;

        transform: translateY(0px);

        opacity: 1;
    }
    .dialog-container {
        position: relative;

        padding-top: 88px;
        .row {
            margin-bottom: 20px;
        }
        .name {
            font-family: $FM;
            font-size: 28px;
            line-height: 50px;
        }
        textarea {
            font-size: 28px;
            line-height: 38px;

            box-sizing: border-box;
            width: 100%;
            height: 316px;
            padding: 18px 42px;

            resize: none;

            border: 1px solid #eaeaea;
        }
        .button-publish {
            font-family: $FM;
            line-height: 92px;

            margin-top: 56px;

            text-align: center;

            color: #fff;
            background-color: #000;
        }
        .upload-com {
            position: relative;

            display: flex;
            flex-direction: column;

            width: 100%;
            height: 280px;

            color: #c7c7c7;
            border: 1px dashed #eaeaea;

            align-items: center;
            justify-content: center;
            &.upload-list {
                display: block;
                overflow: hidden;

                box-sizing: border-box;
                height: auto;
                padding: 20px;
            }
            .ic {
                font-size: 30px;
                line-height: 1;
            }
            .avatar-uploader {
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;

                opacity: 0;
                .el-upload {
                    position: absolute;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;
                }
            }
            .image_list {
                overflow: hidden;

                height: 100%;
                margin-right: -10px;
                margin-bottom: -10px;
            }
            .item {
                position: relative;

                float: left;
                overflow: hidden;

                width: calc(25% - 10px);
                margin-right: 10px;
                margin-bottom: 10px;
                &:hover {
                    .button-oper {
                        opacity: 1;
                    }
                }
                .button-oper {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    height: 50px;

                    transition: 0.36s ease;

                    background: rgba(#000, 0.3);
                }
                .ic {
                    font-size: 16px;

                    position: absolute;
                    top: 50%;
                    left: 50%;

                    transform: translate3d(-50%, -50%, 0);

                    color: #fff;
                }
                &:after {
                    display: block;

                    padding-top: 100%;

                    content: "";
                }
                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;

                    min-width: 100%;
                    min-height: 100%;

                    transform: translate3d(-50%, -50%, 0);
                }
            }
            .item-img_upload {
                background: #fff;

                .button-oper {
                    top: 0;

                    height: auto;

                    opacity: 1;
                    border: 1px dashed #000;
                    background: transparent;
                    .ic {
                        font-size: 36px;

                        color: #000;
                    }
                }
            }
        }
    }
    .dialog-close_button {
        font-size: 24px;
        line-height: 88px;

        position: absolute;
        top: 0;
        right: 0;

        padding-left: 20px;
    }
}
</style>
