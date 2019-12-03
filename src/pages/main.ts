import U_PAGE from "@/pages/base";

interface U_PAGE_TYPE {
    new (): U_PAGE_TYPE;
}
const pages: { [params: string]: U_PAGE_TYPE } = {};

new U_PAGE();
