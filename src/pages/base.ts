import { BASE_PAGE } from "@/unit/unit";

class U_PAGE extends BASE_PAGE {
    constructor() {
        super();
    }
}

U_PAGE.add_loaded_callback(["init_do"]);

export default U_PAGE;
