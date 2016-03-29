'use strict';
var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var webpack = require('gulp-webpack');
var nib = require('nib')
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var data = require('gulp-data');
var rename = require('gulp-rename');

var PATHS = {
  jade: [ 'src/jade/**/*.jade' ],
  jadeEntry: [ 'src/jade/**/!(_)*.jade' ],
  jadeWork: 'src/jade/_works.jade',
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

var errorHandler = function (e) {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
    sound: false
  }).apply(this, args);
  this.emit("end");
};

gulp.task('jade', function () {
  var works = require('./data.json');
  return gulp.src(PATHS.jadeEntry)
    .pipe(data(function (file) { return { works: works }; }))
    .pipe(jade({ pretty: true }))
    .on('error', errorHandler)
    .pipe(gulp.dest(PATHS.htmlDir));
});
gulp.task('jade-works', function () {
  var works = require('./data.json');
  return works.map((work) => {
    return gulp.src(PATHS.jadeWork)
      .pipe(data(function (file) { return work; }))
      .pipe(jade({
        pretty: true,
        filename: work.uid + '.html'
      }))
      .pipe(rename('index.html'))
      .on('error', errorHandler)
      .pipe(gulp.dest(PATHS.htmlDir + '/works/' + work.uid));
  });
});

gulp.task('stylus', function () {
  return gulp.src(PATHS.stylusEntry)
    .pipe(stylus({ use: [ nib() ] }))
    .on("error", errorHandler)
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
    .on("error", errorHandler)
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
          var msg = req.method + " " + req.url;
          console.log(msg);
          next();
        }
      ]
    }
  });
  gulp.watch(PATHS.jade, [ 'jade', 'jade-works' ]);
  gulp.watch(PATHS.stylus, [ 'stylus' ]);
  gulp.watch(PATHS.jsx, [ "build" ]);
});
