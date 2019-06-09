/* *********************************
 * Gulpfile
 *
 */

const config      = require('./gulpfile.config.js');
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const util        = require('gulp-util');
const requireDir  = require('require-dir');

requireDir('./gulp-tasks');


/**
 * Default task
 */
let defaultTasks = ['scss'];

if (util.env.bump) {
  defaultTasks.push('bump');
}

gulp.task('default', gulp.series('cleanup', gulp.parallel(defaultTasks)), () => {
  return gulp.pipe(notify({ message: 'Successful build' }));
});

/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(config.src + '/scss/**/*.scss', gulp.parallel('scss:dev'));

  // Browsersync
  browserSync.init([
    config.dest + '/css/**/*.css',
    './**/*.htm',
  ], {
    proxy: 'localhost',
  });
});
