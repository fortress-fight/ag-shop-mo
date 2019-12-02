import U_PAGE from "@/pages/base";

interface U_PAGE_TYPE {
    new (): U_PAGE_TYPE;
}
const pages: { [params: string]: U_PAGE_TYPE } = {};

Object.keys(pages).forEach(item => {
    if ($("body").hasClass(item)) {
        new pages[item]();
    } else {
        new U_PAGE();
    }
});
