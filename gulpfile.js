const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

function css() {
  const postcssPlugins = [
    atImport(),
    autoprefixer(),
  ];

  return gulp.src('src/m-all.css')
    .pipe(postcss(postcssPlugins))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
}

function copyToDocs() {
  return gulp.src('dist/**/*').pipe(gulp.dest('docs/public'))
}

exports.css = css;
exports.build = gulp.series(css, copyToDocs);