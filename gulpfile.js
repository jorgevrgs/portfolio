const { src, dest, series, task, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglifycss");

task("builSass", async function () {
  src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(
      uglify({
        maxLineLen: 80,
        uglyComments: true,
      })
    )
    .pipe(dest("assets"));
});

task("watchSass", async function () {
  watch("src/**/*.scss", series("builSass"));
});
