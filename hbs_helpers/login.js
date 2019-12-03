const is_login = false;
module.exports = function(options) {
    if (is_login) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
