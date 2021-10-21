const { src, dest, series, task, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
// const uglify = require("gulp-uglifycss");

// exports.default = function () {
//   return src("src/**/*.css").pipe(autoprefixer()).pipe(dest("css"));
// };

task("styles", async function () {
  src("src/**/*.css")
    .pipe(autoprefixer())
    // .pipe(
    //   uglify({
    //     maxLineLen: 80,
    //     uglyComments: true,
    //   })
    // )
    .pipe(dest("assets"));
});

task("watch", async function () {
  watch("src/**/*.css", series("styles"));
});
