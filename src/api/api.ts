import axios from "axios";

var axios_instance = axios.create();
axios_instance.interceptors.response.use(
    function(response) {
        if (!response.data || typeof response.data === "string")
            return response;

        if (response.data.code === 999) {
            window.V.$store.dispatch("login/open");

            return Promise.reject("Not Logged");
        }
        if (response.data.code === 998) {
            window.location.href = response.data.msg;
            return Promise.resolve("重定向");
        }
        if (response.data.code === 1) {
            alert(response.data.msg);

            return Promise.reject("code=1 ERROR：" + response.data.msg);
        }
        return response.data;
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
export function login(data: any) {
    return axios.post("/service/login.html", data).then((response: any) => {
        if (response.data.code == 0) {
            let search_str = window.location.search;
            if (search_str && search_str.includes("tab=login")) {
                window.location.search = search_str.replace("tab=login", "");
            } else {
                window.location.reload();
            }
        } else {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }
    });
}
export function register(data: any) {
    return axios.post("/service/resister.html", data).then((response: any) => {
        if (response.data.code == 0) {
            window.location.reload();
        } else {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }
    });
}

export function add_to_cart(data: any) {
    return axios_instance.post("/api/add_to_cart.html", data);
}
export function goods_buy_now(data: any) {
    return axios_instance.post("/api/add_to_cart.html", data);
}
export function get_cart(data: any) {
    return axios_instance.post("/api/get_cart.html", data);
}
export function add_address(data: any) {
    return axios_instance.post("/api/add_address.html", data);
}
export function get_region(data?: any) {
    return axios_instance.post("/api/get_region.html", data);
}
export function get_address(data: any) {
    return axios_instance.post("/api/get_address.html", data);
}

export function order_list() {
    return axios_instance.get("/api/order_list.html");
}
export function upload_picture(data: any) {
    return axios_instance.post("/api/upload_picture.html", data);
}
export function user_picture_list() {
    return axios_instance.get("/api/user_picture_list.html");
}
export function order_detail(data: any) {
    return axios_instance.post("/api/order_detail.html", data);
}
export function save_msg(data: any) {
    return axios_instance.post("/api/save_msg.html", data);
}
export function change_pwdt(data: any) {
    return axios_instance.post("/api/change_pwdt.html", data);
}
export function get_collect(href: string) {
    return axios_instance.get(href);
}
export function get_images(href: string) {
    return axios_instance.get(href);
}
export function get_user() {
    return axios_instance.get("/api/get_user.html");
}
export function user_update(data: any) {
    return axios_instance.post("/api/user_update.html", data);
}
export function send_code(data: any) {
    return axios_instance.post("/api/send_code.html", data);
}
export function user_info_bind(data: any) {
    return axios_instance.post("/api/user_info_bind.html", data);
}
export function login_by_code(data: any) {
    return axios_instance.post("/api/login_by_code.html", data);
}
export function order_info(data: any) {
    if (process.env.NODE_ENV === "production") {
        return axios_instance.post(
            window.location.pathname + window.location.search,
            data
        );
    } else {
        return axios_instance.post("/page/user/order_info.html?id=52", data);
    }
}

export function to_pay(data: any) {
    let ret = "";
    for (let it in data) {
        if (!ret.length) {
            ret += "?";
        } else {
            ret += "&";
        }
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]);
    }
    window.open("/user/to_pay.html" + ret);
}
