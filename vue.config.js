const glob = require("glob");

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CompilerCallback = require("./webpack-plugin");
function analysis_path(file_path) {
    let files = glob.sync(file_path);
    let result = [];
    files.forEach(_path => {
        const dirname = path.dirname(_path);
        const extname = path.extname(_path);
        const basename = path.basename(_path, extname);
        const pathname = path.join(dirname, basename);
        result.push({
            dirname,
            extname,
            basename,
            pathname
        });
    });
    return result;
}
function get_pages_data(file_path) {
    // let result = {};
    // analysis_path(file_path + "**/*.html").map(v => {
    //     if (!/components/.test(v.pathname)) {
    //         result[v.basename] = {
    //             entry: v.dirname + "/entry.ts",
    //             template: v.pathname + ".html",
    //             filename: v.basename + ".html",
    //             chunks: "all"
    //         };
    //     }
    // });
    // return result;
    let result = [];
    let entry_ts = "";
    analysis_path(file_path + "**/*.html").map(v => {
        if (!/components/.test(v.pathname)) {
            result.push(
                new htmlWebpackPlugin({
                    templateParameters: function() {
                        /* omitted long function */
                    },
                    minify: {
                        removeComments: false,
                        collapseWhitespace: false,
                        removeAttributeQuotes: false,
                        collapseBooleanAttributes: false,
                        removeScriptTypeAttributes: false
                    },
                    template: v.pathname + ".html",
                    filename: v.basename + ".html"
                })
            );

            entry_ts += `import "${path
                .resolve(__dirname, v.dirname + "/entry.ts")
                .replace(/\\/g, "/")}"; \n`;
        }
    });
    if (entry_ts.length) {
        // fs.writeFileSync("./src/app.ts", entry_ts);
    }
    return result;
}
function generate_html_entry(file_path) {
    let result = {};
    if (process.env.NODE_ENV !== "development") return result;
    let import_str = "/* eslint-disable */ \n";

    analysis_path(file_path + "**/*.html").map(v => {
        import_str += `import "${path
            .resolve(__dirname, v.pathname + ".html")
            .replace(/\\/g, "/")}"; \n`;
    });

    if (import_str.length) {
        fs.writeFileSync("./src/html_entry.ts", import_str);
        result = {
            html_entry: path
                .resolve(__dirname, "./src/html_entry.ts")
                .replace(/\\/g, "/")
        };
        // result = {
        //     html_entry: {
        //         entry: path
        //             .resolve(__dirname, "./src/html_entry.ts")
        //             .replace(/\\/g, "/")
        //     }
        // };
    }

    return result;
}

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    filenameHashing: false,
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    },
    // devServer: {
    //     port: 80,
    //     disableHostCheck: true,
    //     proxy: {
    //         "/service": {
    //             target: "http://www.a-agender.com/",
    //             changeOrigin: true, // target是域名的话，需要这个参数，
    //             secure: false // 设置支持https协议的代理
    //             // pathRewrite: {
    //             //     "^/service": ""
    //             // }
    //         }
    //     }
    // },
    chainWebpack: config => {
        config.module
            .rule("html")
            .test(/\.html$/)
            .use("html-loader")
            .loader("html-loader")
            .options({
                interpolate: true,
                attrs: ["img:src", "video:src", "video:poster", ":data-src"]
            })
            .end();

        config.module
            .rule("handlebars")
            .test(/\.(handlebars|hbs)$/)
            .use("handlebars-loader")
            .loader("handlebars-loader")
            .options({
                helperDirs: path.resolve(__dirname, "./hbs_helpers"),
                inlineRequires: "@/asset/"
            })
            .end();

        // config.module
        //     .rule("handlebars")
        //     .use("html-loader")
        //     .loader("html-loader")
        //     .options({
        //         interpolate: true,
        //         attrs: ["img:src", "video:src", "video:poster", ":data-src"]
        //     })
        //     .end();
        config.resolve.alias
            .set("@", path.resolve(__dirname, "./src"))
            .set("@assets", path.resolve(__dirname, "./src/assets"))
            .set("@img", path.resolve(__dirname, "./src/assets/images"));
        // config.resolve.plugins.delete("html");
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/style/mixin.scss"; @import "@/style/base.scss";`,
                use: [
                    "vue-style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    { loader: "resolve-url-loader" },
                    "sass-loader"
                ]
            }
        }
    },
    // pages: {
    //     app: { entry: "./src/app.ts" },
    //     ...get_pages_data("./src/pages/"),
    //     ...generate_html_entry("./src/pages/")
    // },
    configureWebpack: {
        entry: {
            app: "./src/app.ts",
            ...generate_html_entry("./src/pages/")
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    lib: {
                        test: /[\\/]node_modules[\\/].+\.js$/,
                        name: "lib",
                        priority: 10,
                        minChunks: 1,
                        minSize: 1000,
                        chunks: "all",
                        enforce: true
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: false, // Must be set to true if using source-maps in production
                    parallel: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        }
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    }
                })
            ]
        },
        watchOptions: {
            // 不监听的 node_modules 目录下的文件
            ignored: /node_modules/
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                Velocity: "velocity-animate",
                axios: "axios",
                slick: "slick-carousel"
            }),
            ...get_pages_data("./src/pages/")
            // new CompilerCallback()
        ]
    }
};
