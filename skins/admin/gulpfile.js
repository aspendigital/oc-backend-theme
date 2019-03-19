/**
 * Gulpfile
 *
 */

const gulp         = require('gulp');
const less         = require('gulp-less');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const notifier     = require('node-notifier');
const notify       = require('gulp-notify');
const path         = require('path');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');
const rimraf       = require('gulp-rimraf');

var config = {
  src:     'src',
  dest:    'assets',
  vendor:  'node_modules',
  modules: '../../../../../modules'
};


/*
 * Stylesheets:
 *
 * Compiles and minifies stylesheets
 */

gulp.task('less:compile', () => {
  return gulp
    .src(config.src + '/less/october.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('less:minify', () => {
  return gulp
    .src(config.dest + '/css/october.css')
    .pipe(postcss([
      cssnano(),
    ]))
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(config.dest + '/css'));
});
gulp.task('less:dev', gulp.series('less:compile'));

gulp.task('less', gulp.series('less:compile', 'less:minify'), () => {
  notifier.notify({
    message: 'Successfully compiled LESS',
  });
  return gulp;
});


/**
 * Javascript:
 *
 * Concatenates and minifies scripts
 */

gulp.task('js', () => {
  var scripts = [
    config.modules + '/backend/assets/js/october-min.js',
    config.src + '/js/october-edits.js'
  ];

  return gulp
    .src(scripts)
    .pipe(concat('october-min.js'))
    .pipe(gulp.dest(config.dest + '/js'))
    .pipe(notify({ message: 'Successfully compiled javascript' }));
});


/*
 * Cleanup
 */

gulp.task('cleanup', () => {
  return gulp
    .src([
      config.dest + '/css',
      config.dest + '/js'
    ], {
      read: false,
      allowEmpty: true,
    })
    .pipe(rimraf());
});


/*
 * Default task
 */
let defaultTasks = ['less', 'js'];

gulp.task('default', gulp.series('cleanup', gulp.parallel(defaultTasks)), () => {
  return gulp.pipe(notify({ message: 'Successful build' }));
});


/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(config.src + '/less/**/*.less', gulp.parallel('less:dev'));
  gulp.watch(config.src + '/js/**/*.js',  gulp.parallel('js'));

  // Browsersync
  browserSync.init([
    config.dest + '/js/**/*.js',
    config.dest + '/css/**/*.css',
    './**/*.htm',
  ], {
    proxy: 'localhost',
  });
});
