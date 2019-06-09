/**
 * SCSS
 *
 * Compiles and minifies SCSS
 */

const config       = require('../gulpfile.config.js');
const gulp         = require('gulp');
const notifier     = require('node-notifier');
const notify       = require('gulp-notify');
const path         = require('path');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const sassGlob     = require('gulp-sass-glob');
const scssLint     = require('gulp-scss-lint');
const lintStylish  = require('gulp-scss-lint-stylish');
const sourcemaps   = require('gulp-sourcemaps');
const tildeImport  = require('node-sass-tilde-importer');

gulp.task('scss:compile', () => {
  return gulp
    .src(config.src + '/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['node_modules/'],
      importer: tildeImport,
      outputStyle: 'expanded',
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('scss:minify', () => {
  return gulp
    .src(config.dest + '/css/styles.css')
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

gulp.task('scss:lint', () => {
  return gulp.src(config.src + '/scss/**/*.scss')
  .pipe(scssLint({
    config: '.scsslint.yml',
    customReport: lintStylish,
  }))
  .pipe(notify({
    message: 'Successfully linted SCSS',
  }));
});

gulp.task('scss:dev', gulp.series('scss:compile'));

gulp.task('scss', gulp.series('scss:compile', 'scss:minify'), () => {
  notifier.notify({
    message: 'Successfully compiled SCSS',
  });
  return gulp;
});
