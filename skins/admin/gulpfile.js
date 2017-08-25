/**
 * Gulpfile
 *
 */

var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  cleancss     = require('gulp-clean-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  rename       = require('gulp-rename'),
  path         = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  livereload   = require('gulp-livereload');

var paths = {
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

gulp.task('css', ['css:compile', 'css:minify']);

gulp.task('css:compile', function() {
  return gulp
    .src(paths.src + '/less/october.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

gulp.task('css:minify', ['css:compile'], function() {
  return gulp
    .src(paths.dest + '/css/october.css')
    .pipe(cleancss({compatibility: 'ie9'}))
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully minified CSS' }));
});


/**
 * Javascript:
 *
 * Concatenates and minifies scripts
 */

gulp.task('js', function() {
  var scripts = [
    paths.modules + '/backend/assets/js/october-min.js',
    paths.src + '/js/october-edits.js'
  ];

  return gulp
    .src(scripts)
    .pipe(concat('october-min.js'))
    .pipe(gulp.dest(paths.dest + '/js'))
    .pipe(notify({ message: 'Successfully compiled javascript' }));
});



/*
 * Cleanup
 */

gulp.task('rimraf', function() {
  return gulp
    .src([
      paths.dest + '/css',
      paths.dest + '/js'
    ], {read: false})
    .pipe(rimraf());
});


/*
 * Default task
 */

gulp.task('default', ['rimraf'], function() {
  gulp.start('css', 'js');
});


/*
 * Watch
 */

gulp.task('watch', function() {
  // Watch LESS and JS files
  gulp.watch('src/less/**/*.less', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);

  // Livereload
  livereload.listen();
  gulp.watch(paths.dest + '/**/*').on('change', livereload.changed);
});
