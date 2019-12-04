import Handlebars from "handlebars";

const nav_data = [
    {
        name: "shop",
        subtitle: [
            { name: "All" },
            { name: "Tops" },
            { name: "Coat&Jackets" },
            { name: "Shirts" },
            { name: "Knitwear" },
            { name: "Trousers" },
            { name: "Caps" },
            { name: "Bags" },
            { name: "Accessories" },
            { name: "Discount" }
        ]
    },
    { name: "collection", href: "./collection.html" },
    { name: "editorial", subtitle: [{ name: "Images" }, { name: "Video" }] },
    { name: "agender", href: "./about.html" },
    { name: "community" },
    { name: "stockist" },
    { name: "billboard" },
    { name: "contact" }
];

export default function(options) {
    var ret = "";
    var data;
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }
    for (var i = 0, j = nav_data.length; i < j; i++) {
        if (data) {
            data.index = i;
        }
        if (i == 0) {
            data.first = true;
        } else {
            data.first = false;
        }
        ret = ret + options.fn(nav_data[i], { data: data });
    }

    return ret;
}