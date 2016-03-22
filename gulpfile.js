'use strict';
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var webpack = require('gulp-webpack');
var nib = require('nib')
var browserSync = require('browser-sync');

var PATHS = {
  jade: [ 'src/jade/**/*.jade' ],
  jadeEntry: [ 'src/jade/**/!(_)*.jade' ],
  htmlDir: './',

  jsx: [ 'src/jsx/**/*.jsx' ],
  jsxMain: 'src/jsx/main.jsx',
  js: [ './js/**/*.js' ],
  jsDir: './js',
  jsMain: './js/main.js',

  stylus: [ 'src/stylus/**/*.styl' ],
  stylusEntry: [ 'src/stylus/**/!(_)*.styl' ],
  css: [ './css/**/*.css' ],
  cssDir: './css',
};

gulp.task('jade', function () {
  gulp.src(PATHS.jadeEntry)
    .pipe(jade())
    .pipe(gulp.dest(PATHS.htmlDir));
});
gulp.task('stylus', function () {
  gulp.src(PATHS.stylusEntry)
    .pipe(stylus({ use: [ nib() ] }))
    .pipe(gulp.dest(PATHS.cssDir))
});
gulp.task('build', function () {
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack({
      output: { filename: '[name].js' },
      module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' }
        ],
        resolve: {
          extensions: [ '', '.js', '.jsx' ]
        }
      },
      externals: {
        'react': 'React',
        'react/addons': 'React',
        'immutable': 'Immutable',
      }
    }))
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});


gulp.task('default', function () {
  browserSync.init({
    open: false,
    //files: [ PATHS.css, PATHS.js, PATHS.jade ],
    server: {
      baseDir: "./",
      middleware: [
        function (req, res, next) {
          var msg = req.method;
          msg += " ";
          msg += req.url;
          msg += "  ";
          msg += req.statusCode;
          msg += " ";
          msg += req.statusMessage;
          console.log(msg);
          next();
        }
      ]
    }
  });
  gulp.watch('./src/stylus/*.jade', [ 'jade' ]);
  gulp.watch('./src/stylus/*.styl', [ 'stylus' ]);
  gulp.watch(PATHS.jsx, [ "build" ]);
});
