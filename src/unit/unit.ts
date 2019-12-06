// app.ts
interface U_PAGE_TYPE {
    loaded(): void;
    get_scroll_box_name(): string;
    [propName: string]: any;
}

function IS_U_PAGE_KEY(
    key: any,
    handle: U_PAGE_TYPE
): key is keyof U_PAGE_TYPE {
    return handle[key] && typeof handle[key] === "function";
}

export class BASE_PAGE implements U_PAGE_TYPE {
    page_wow: any;
    static loaded_callbacks: string[] = [];
    static add_loaded_callback(method_name: string | string[]) {
        if (typeof method_name === "string") {
            BASE_PAGE.loaded_callbacks.push(method_name);
        } else {
            BASE_PAGE.loaded_callbacks = BASE_PAGE.loaded_callbacks.concat(
                method_name
            );
        }
    }

    static remove_loaded_callback(method_name: string) {
        let callback = BASE_PAGE.loaded_callbacks;
        if (callback.includes(method_name)) {
            BASE_PAGE.loaded_callbacks = callback.splice(
                callback.indexOf(method_name),
                1
            );
        }
    }

    static scroll_box_name: string = "document";

    constructor(page_class_name: string = "body") {
        $(() => {
            $(page_class_name).each((i, e) => {
                this.loaded();
            });
        });
    }
    loaded(this: U_PAGE_TYPE) {
        BASE_PAGE.loaded_callbacks.forEach(method_name => {
            if (IS_U_PAGE_KEY(method_name, this)) {
                this[method_name]();
            }
        });
    }
    change_scroll_box_name(scroll_box_name: string) {
        BASE_PAGE.scroll_box_name = scroll_box_name;
    }
    get_scroll_box_name() {
        return BASE_PAGE.scroll_box_name;
    }
}

interface El_pos extends ClientRect {
    client_width?: number;
    client_height?: number;
}

function _get_el_pos(el: HTMLElement): El_pos;
function _get_el_pos(el: HTMLAllCollection | JQuery): El_pos[];
function _get_el_pos(el: HTMLElement | HTMLAllCollection | JQuery) {
    let result;
    if ((<HTMLAllCollection | JQuery>el).length) {
        result = [];
        for (let i = 0; i < (el as HTMLAllCollection | JQuery).length; i++) {
            const _el = (el as HTMLAllCollection)[i];
            let _el_pos: El_pos = _el.getBoundingClientRect();
            _el_pos.client_width = _el.clientWidth;
            _el_pos.client_height = _el.clientHeight;
            result.push(_el_pos);
        }
        return <El_pos[]>result;
    } else {
        let el_pos: El_pos = (<HTMLElement>el).getBoundingClientRect();
        el_pos.client_width = (<HTMLElement>el).clientWidth;
        el_pos.client_height = (<HTMLElement>el).clientHeight;
        result = el_pos;
        return <El_pos>result;
    }
}

export let get_el_pos = _get_el_pos;

export function get_el_dis_pos(
    el: HTMLElement,
    target_el: HTMLElement | Window = window
) {
    let result = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        el_pos: get_el_pos(el) as El_pos,
        target_el_pos:
            target_el == window
                ? {
                      top: 0,
                      left: 0,
                      right: window.innerWidth,
                      bottom: window.innerHeight,
                      width: window.innerWidth,
                      height: window.innerHeight,
                      client_width: window.innerWidth,
                      client_height: window.innerHeight
                  }
                : (get_el_pos(target_el as HTMLElement) as El_pos)
    };
    result.top = Math.round(result.el_pos.top - result.target_el_pos.top);
    result.left = Math.round(result.el_pos.left - result.target_el_pos.left);
    result.right = Math.round(result.el_pos.right - result.target_el_pos.right);
    result.bottom = Math.round(
        result.el_pos.bottom - result.target_el_pos.bottom
    );

    return result;
}

export function judge_is_dom(item: any): item is HTMLElement {
    // 首先判断是否支持HTMLELement，如果支持，使用HTMLElement，如果不支持，通过判断DOM的特征，如果拥有这些特征说明就是ODM节点，特征使用的越多越准确
    return typeof HTMLElement === "function"
        ? item instanceof HTMLElement
        : item &&
              typeof item === "object" &&
              item.nodeType === 1 &&
              typeof item.nodeName === "string";
}

export function adjustment_pos(
    oper_dom: HTMLElement,
    pos?: { left: number; top: number },
    option?: { distance: number }
) {
    let result: { left: number; top: number };
    let oper_dom_pos = get_el_pos(oper_dom);
    option = Object.assign({ distance: 0 }, option);

    if (!pos) {
        pos = { left: oper_dom_pos.left, top: oper_dom_pos.top };
    } else {
        pos.left = Math.max(option.distance, pos.left);
        pos.top = Math.max(option.distance, pos.top);
    }

    if (!oper_dom_pos.client_width) {
        oper_dom_pos.client_width = 0;
    }
    if (!oper_dom_pos.client_height) {
        oper_dom_pos.client_height = 0;
    }
    let beyond_width =
        pos.left + oper_dom_pos.client_width + option.distance >
        document.body.clientWidth;

    let beyond_height =
        pos.top + oper_dom_pos.client_height + option.distance >
        document.body.clientHeight;

    result = pos;
    if (!beyond_width && !beyond_height) return false;
    if (beyond_width) {
        result.left =
            document.body.clientWidth -
            oper_dom_pos.client_width -
            option.distance;
    }

    if (beyond_height) {
        if (
            oper_dom_pos.client_height >
            document.body.clientHeight + 2 * option.distance
        ) {
            result.top = option.distance;
        } else {
            result.top =
                document.body.clientHeight -
                oper_dom_pos.client_height -
                option.distance;
        }
    }

    return result;
}

function _copy() {
    var textArea: HTMLTextAreaElement, copy;

    // 判断是不是ios端
    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }
    //创建文本元素
    function createTextArea(text: string) {
        textArea = document.createElement("textArea") as HTMLTextAreaElement;
        textArea.style.position = "fixed";
        textArea.style.bottom = "0";
        textArea.style.left = "0";
        textArea.style.zIndex = "-1";
        textArea.value = text;
        document.body.appendChild(textArea);
    }
    //选择内容
    function selectText() {
        var range, selection: Selection | null;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, 999999);
            }
        } else {
            textArea.select();
        }
    }

    //复制到剪贴板
    function copyToClipboard(
        suc_callback?: Function,
        fall_callback?: Function
    ) {
        try {
            if (document.execCommand("Copy")) {
                suc_callback && suc_callback();
            } else {
                fall_callback && fall_callback();
            }
        } catch (err) {
            fall_callback && fall_callback();
        }
        document.body.removeChild(textArea);
    }

    copy = function(
        text: string,
        suc_callback?: Function,
        fall_callback?: Function
    ) {
        createTextArea(text);
        selectText();
        copyToClipboard(suc_callback, fall_callback);
    };

    return copy;
}
export const copy = _copy();

export function make_range(num: number, max = 1, min = 0) {
    return Math.max(min, Math.min(num, max));
}

export function reg_test(name: string, value: any) {
    let test_reg: {
        [prompt: string]: RegExp;
    } = {
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        not_empty: /\S/
    };

    return test_reg[name].test(value);
}
