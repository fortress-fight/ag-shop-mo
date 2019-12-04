import U_PAGE from "@/pages/base";
import COLLECTION_PAGE from "@/pages/collection/collection";
import NOTICE_PAGE from "@/pages/notice/notice";

interface U_PAGE_TYPE {
    new (): U_PAGE_TYPE;
}
const pages: { [params: string]: U_PAGE_TYPE } = {};

if ($("body").hasClass("page-collection")) {
    new COLLECTION_PAGE();
} else if ($("body").hasClass("page-notice")) {
    new NOTICE_PAGE();
} else {
    new U_PAGE();
}
