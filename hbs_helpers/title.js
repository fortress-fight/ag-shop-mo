module.exports = function(arg, options) {
    if (arg) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
