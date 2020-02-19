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

function js() {
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
  gulp.series(styles, fonts, js, copyToDocs);
  cb();
}

function versionBump(cb) {
  // Bump version in both package.json files, then update version in ./README.md
  exec('npm version prerelease && (cd docs && npm version prerelease)', function (err, stdout, stderr) {
    const pkg = require('./package');
    gulp.src('./README.md', {base: './'})
      .pipe(replace(/(https:\/\/unpkg\.com\/m-@)(.*)(\/dist\/.*)/g, (match, p1, p2, p3) => p1 + pkg.version + p3))
      .pipe(gulp.dest('./'));

    cb(err);
  });
}

function commit(cb) {
  // Commit version changes
  const pkg = require('./package');
  exec(`git pull && git commit -a -m "Released new version: ${pkg.version}" && git push`, function (err, stdout, stderr) {
    cb(err);
  });
}

function publish(cb) {
  // Publish to NPM
  const pkg = require('./package');
  exec('npm publish --access public', function (err, stdout, stderr) {
    if (!err) {
      console.log(`Version ${pkg.version} has been built, committed, and published. You can now zip /docs and upload to AWS.`)
    }
    cb(err);
  });
}

function watch(cb) {
  gulp.series(styles, fonts, js, copyToDocs);
  gulp.watch('src', gulp.series(styles, fonts, js, copyToDocs));
  cb();
}

exports.build = build;
exports.release = gulp.series(build, versionBump, commit, publish);
exports.watch = watch;