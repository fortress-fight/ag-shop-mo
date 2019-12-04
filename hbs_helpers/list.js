export default function(context, options) {
    var ret = "";
    var arr = Array(context).fill(1);
    for (var i = 0, j = arr.length; i < j; i++) {
        ret = ret + options.fn(arr[i]);
    }

    return ret;
}
