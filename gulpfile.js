const gulp = require('gulp');
const replace = require('gulp-replace');
const exec = require('child_process').exec;


function versionBump(cb) {
  exec('npm version patch && (cd docs && npm version patch)', function (err, stdout, stderr) {
    // Update version mentioned in ./README.md
    const pkg = require('./package');
    gulp.src('./README.md', {base: './'})
      .pipe(replace(/(https:\/\/unpkg\.com\/m-@)(.*)(\/dist\/.*)/g, (match, p1, p2, p3) => p1 + pkg.version + p3))
      .pipe(gulp.dest('./'));

    cb(err);
  });
}

function build(cb) {
  exec('npm run build', function (err, stdout, stderr) {
    cb(err);
  });
}

function pushNewVersion(cb) {
  const pkg = require('./package');
  exec(`git pull && git commit -a -m "Released new version: ${pkg.version}" && git push --tags origin master`, function (err, stdout, stderr) {
    cb(err);
  });
}

function publishToNPM(cb) {
  const pkg = require('./package');
  exec('npm publish --access public', function (err, stdout, stderr) {
    if (!err) {
      console.log(`Version ${pkg.version} has been successfully built and published. You can now zip /docs and deploy to AWS.`)
    }
    cb(err);
  });
}

exports.release = gulp.series(build, versionBump, pushNewVersion, publishToNPM);
exports.publishToNPM = gulp.series(publishToNPM)