const project = [1, 2, 3, 4, 5, 6];

module.exports = function(options) {
    var ret = "";

    for (var i = 0, j = project.length; i < j; i++) {
        ret = ret + options.fn(project[i]);
    }

    return ret;
};
