import U_PAGE from "@/pages/base";

export default class VIDEO_PAGE extends U_PAGE {
    constructor() {
        super();
    }
    video_handle() {
        $(".page-video .item").on("click", function() {
            let video = $(this).find("video")[0] as HTMLMediaElement;
            if (video.paused) {
                $(this).addClass("state_play");
                video.play();
            } else {
                $(this).removeClass("state_play");
                video.pause();
            }
        });
    }
}

VIDEO_PAGE.add_loaded_callback(["video_handle"]);
