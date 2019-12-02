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
