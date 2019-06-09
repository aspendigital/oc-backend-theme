/**
 * Cleanup
 */

const config = require('../gulpfile.config.js');
const gulp   = require('gulp');
const rimraf = require('gulp-rimraf');

gulp.task('cleanup', () => {
  return gulp
    .src([
      config.dest + '/css/styles*'
    ], {
      read: false,
      allowEmpty: true,
    })
    .pipe(rimraf());
});
