module.exports = {
    plugins: {
        // to edit target browsers: use "browserslist" field in package.json
        "postcss-write-svg": {
            uft8: false
        },
        "postcss-cssnext": {},
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 750, // 设计稿宽度
            viewportHeight: 2416, // 设计稿高度，可以不指定
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: "vw", // 转换成vw单位
            selectorBlackList: [".ignore", ".hairlines"], // 不转换的类名
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false // 允许媒体查询中转换
        },
        // Automatically append content property for viewport-units-buggyfill.
        // viewport-units-buggyfill [https://github.com/rodneyrehm/viewport-units-buggyfill]
        /*
         * viewport-units-buggyfill 的补充，将会对图片产生意外的影响，可以使用
         * img { content: normal !important; } 来解决问题
         */
        "postcss-viewport-units": {},
        cssnano: {}
    }
};
