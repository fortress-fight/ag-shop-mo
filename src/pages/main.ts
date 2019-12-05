import U_PAGE from "@/pages/base";
import COLLECTION_PAGE from "@/pages/collection/collection";
import COMMUNITY_PAGE from "@/pages/community/community";
import IMAGES_PAGE from "@/pages/images/images";
import NOTICE_PAGE from "@/pages/notice/notice";
import STOCKISTS_PAGE from "@/pages/stockists/stockists";
import VIDEO_PAGE from "@/pages/video/video";

interface U_PAGE_TYPE {
    new (): U_PAGE_TYPE;
}
const pages: { [params: string]: U_PAGE_TYPE } = {};

if ($("body").hasClass("page-collection")) {
    new COLLECTION_PAGE();
} else if ($("body").hasClass("page-notice")) {
    new NOTICE_PAGE();
} else if ($("body").hasClass("page-stockists")) {
    new STOCKISTS_PAGE();
} else if ($("body").hasClass("page-video")) {
    new VIDEO_PAGE();
} else if ($("body").hasClass("page-images_list")) {
    new IMAGES_PAGE();
} else if ($("body").hasClass("page-community_list")) {
    new COMMUNITY_PAGE();
} else {
    new U_PAGE();
}
