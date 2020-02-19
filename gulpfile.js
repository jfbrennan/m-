const gulp = require('gulp');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const csso = require('gulp-csso');
const exec = require('child_process').exec;


function css() {
  const postcssPlugins = [
    atImport(),
    autoprefixer(), // TODO can we save bytes with optimized browser list?
    customProperties({preserve: false}) // Saving as many bytes as possible
  ];

  return gulp.src('src/m-all.css')
    .pipe(concat('min.css'))
    .pipe(postcss(postcssPlugins))
    .pipe(csso())
    .pipe(gulp.dest('dist'))
}

function customPropsCopy() {
  return gulp.src('src/custom-props.css')
    .pipe(gulp.dest('dist'))
}

function styles(cb) {
  gulp.parallel(css, customPropsCopy);
  cb();
}


function buildComponentsFile() {
  return gulp.src('src/*.js')
    .pipe(concat('min.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist'))
}

function copyToDocs() {
  return gulp.src('dist/**/*').pipe(gulp.dest('docs/public'));
}

function fonts() {
  return gulp.src('src/**/*.woff2').pipe(gulp.dest('dist'));
}

function build(cb) {
  gulp.series(css, customPropsCopy, fonts, buildComponentsFile, copyToDocs);
  cb();
}

function versionBump(cb) {
  exec('npm version prerelease && (cd docs && npm version prerelease)', function (err, stdout, stderr) {
    // Replace version in ./README.md
    const pkg = require('./package');
    gulp.src('./README.md', {base: './'})
      .pipe(replace(/(?:https:\/\/unpkg\.com\/m-@)(.*)(?=\/dist)/g, '$1', pkg.version))
      .pipe(gulp.dest('./'));

    cb(err);
  });
}

function watch(cb) {
  gulp.series(css, customPropsCopy, fonts, buildComponentsFile, copyToDocs);
  gulp.watch('src', gulp.series(css, customPropsCopy, fonts, buildComponentsFile, copyToDocs));
  cb();
}

exports.styles = styles;
exports.fonts = fonts;
exports.buildComponentsFile = buildComponentsFile;
exports.build = build;
exports.release = gulp.series(build, versionBump);
exports.watch = watch;