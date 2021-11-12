const {
  src, dest, series, task, watch,
} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglifycss');

task('builSass', async () => {
  src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(
      uglify({
        maxLineLen: 80,
        uglyComments: true,
      }),
    )
    .pipe(dest('build'));
});

task('watchSass', async () => {
  watch('src/**/*.scss', series('builSass'));
});
