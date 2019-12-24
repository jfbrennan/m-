const gulp = require('gulp');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const csso = require('gulp-csso');

function css() {
  const postcssPlugins = [
    atImport(),
    autoprefixer(), // TODO can we save bytes with optimized browser list?
    customProperties({preserve: false}) // Saving as many bytes as possible
  ];

  return gulp.src('src/m-all.css')
    .pipe(postcss(postcssPlugins))
    .pipe(csso())
    .pipe(gulp.dest('dist'))
}

function buildComponentsFile() {
  const hyper = './node_modules/hyperhtml-element/min.js';
  const lighter = './node_modules/lighterhtml/min.js';
  return gulp.src([lighter, 'src/*.js'])
    .pipe(concat('m-.js'))
    // .pipe(terser())
    .pipe(gulp.dest('dist'))
}

function copyToDocs() {
  return gulp.src('dist/**/*').pipe(gulp.dest('docs/public'));
}

function fonts() {
  return gulp.src('src/**/*.woff2').pipe(gulp.dest('dist'));
}

function watch(cb) {
  gulp.series(css, fonts, buildComponentsFile, copyToDocs);
  gulp.watch('src', gulp.series(css, fonts, buildComponentsFile, copyToDocs));
  cb();
}

exports.css = css;
exports.fonts = fonts;
exports.buildComponentsFile = buildComponentsFile;
exports.build = gulp.series(css, fonts, buildComponentsFile, copyToDocs);
exports.watch = watch;