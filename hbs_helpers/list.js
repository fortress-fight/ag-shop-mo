import Handlebars from "handlebars";

export default function(context, options) {
    var ret = "";

    var data;
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    var arr = Array(context).fill(1);
    for (var i = 0, j = arr.length; i < j; i++) {
        if (data) {
            data.index = i;
        }
        if (i == 0) {
            data.first = true;
        } else {
            data.first = false;
        }
        ret = ret + options.fn(arr[i], { data: data });
    }

    return ret;
}
