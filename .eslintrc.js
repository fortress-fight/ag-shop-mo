module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/prettier",
        "@vue/typescript",
        "plugin:prettier/recommended"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    globals: {
        $: true,
        jQuery: true,
        axios: true
    }
};
