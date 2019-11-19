const gulp = require("gulp");

function CompilerCallback(options) {}

// 每个plugin都必须定义一个apply方法，webpack会自动调用这个方法
CompilerCallback.prototype.apply = function(compiler) {
    // apply方法中会传入Compiler的实例compiler
    // 'emit'是该插件监听的事件，插件工作的逻辑在回调函数中
    compiler.hooks.done.tapPromise(
        "CompilerCallback",
        (source, target, routesList) => {
            console.log("webpack-CompilerCallback");
            return new Promise(resolve => {
                gulp.src(["./dist/app.js", "./dist/lib.js"])
                    .pipe(gulp.dest("Z:\\js\\"))
                    .on("end", () => {
                        setTimeout(() => {
                            resolve();
                        });
                    });
            });
        }
    );
};

module.exports = CompilerCallback;
