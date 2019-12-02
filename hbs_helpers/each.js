import Handlebars from "handlebars";

export default function(context, options) {
    var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
        ret =
            ret +
            options.fn({
                data: new Handlebars.SafeString(
                    Handlebars.escapeExpression(context[i])
                )
            });
    }

    return ret;
}
