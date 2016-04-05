"use strict";
var gulp = require("gulp");
var jade = require("gulp-jade");
var stylus = require("gulp-stylus");
var webpack = require("gulp-webpack");
var nib = require("nib")
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var data = require("gulp-data");
var rename = require("gulp-rename");
var tumblr = require("tumblr.js");

var PATHS = {
  data: "./data.json",

  jade: [ "src/jade/**/*.jade" ],
  jadeEntry: [ "src/jade/**/!(_)*.jade" ],
  jadeWork: "src/jade/_works.jade",
  jadeProgressIndex: "src/jade/_progress.jade",
  jadeProgressEntry: "src/jade/_progress-entry.jade",
  htmlDir: "./",

  jsx: [ "src/jsx/**/*.jsx" ],
  jsxMain: "src/jsx/main.jsx",
  js: [ "./js/**/*.js" ],
  jsDir: "./js",
  jsMain: "./js/main.js",

  stylus: [ "src/stylus/**/*.styl" ],
  stylusEntry: [ "src/stylus/**/!(_)*.styl" ],
  css: [ "./css/**/*.css" ],
  cssDir: "./css",
};

var tumblrClient = new tumblr.Client({
  consumer_key: "kqOF3qpqG94eq5vEN3juzj4GYkUerh61mpRjet2BCKgVjIWUE5",
});

var errorHandler = function (e) {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
    sound: false
  }).apply(this, args);
  this.emit("end");
};
var convertMonthToText = function (monthNum) {
  switch(monthNum) {
    case 0: return "January"; break;
    case 1: return "February"; break;
    case 2: return "March"; break;
    case 3: return "April"; break;
    case 4: return "May"; break;
    case 5: return "June"; break;
    case 6: return "July"; break;
    case 7: return "August"; break;
    case 8: return "September"; break;
    case 9: return "October"; break;
    case 10: return "November"; break;
    case 11: return "December"; break;
    default: return monthNum;
  }
};

gulp.task("jade", function () {
  var works = require(PATHS.data);
  return gulp.src(PATHS.jadeEntry)
    .pipe(data(function (file) { return { works: works }; }))
    .pipe(jade({ pretty: true }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.htmlDir));
});
gulp.task("jade-works", function (cb) {
  var works = require(PATHS.data);
  works.map((work) => {
    gulp.src(PATHS.jadeWork)
      .pipe(data(function (file) { return work; }))
      .pipe(jade({ pretty: true }))
      .pipe(rename("index.html"))
      .on("error", errorHandler)
      .pipe(gulp.dest(PATHS.htmlDir + "/works/" + work.uid));
  });
  cb();
});
gulp.task("jade-progress", function (cb) {
  tumblrClient.posts("ranagram", { limit: 999 }, function (err, res) {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      var posts = res.posts.map((post) => {
        var date = new Date(post.date);
        var month = date.getMonth();
        var year = date.getFullYear();
        post.date = convertMonthToText(month) + ", " + year;
        post.photos = post.photos.map((photo) => {
          return photo.original_size.url;
        });
        post.title = "RANAGRAM | PROGRESS";
        if (post.tags && post.tags.length) {
          post.title += " | " + post.tags.join(",");
        }
        return post;
      });
      gulp.src(PATHS.jadeProgressIndex)
        .pipe(data(function (file) { return { posts: posts }; }))
        .pipe(jade({ pretty: true }))
        .pipe(rename("index.html"))
        .on("error", errorHandler)
        .pipe(gulp.dest(PATHS.htmlDir + "/progress"));
      posts.forEach((post) => {
        gulp.src(PATHS.jadeProgressEntry)
          .pipe(data((file) => { return { post: post } }))
          .pipe(jade({ pretty: true }))
          .pipe(rename("index.html"))
          .on("error", errorHandler)
          .pipe(gulp.dest(PATHS.htmlDir + "/progress/" + post.id));
      });
      cb();
    }
  });
});

gulp.task("stylus", function () {
  return gulp.src(PATHS.stylusEntry)
    .pipe(stylus({ use: [ nib() ] }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.cssDir))
});
gulp.task("build", function () {
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack({
      output: { filename: "[name].js" },
      module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/, loader: "babel" }
        ],
        resolve: {
          extensions: [ "", ".js", ".jsx" ]
        }
      },
      externals: {
        "react": "React",
        "react/addons": "React",
        "immutable": "Immutable",
      }
    }))
    .on("error", errorHandler)
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});


gulp.task("default", function () {
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
  gulp.watch(PATHS.jade, [ "jade", "jade-works", "jade-progress" ]);
  gulp.watch(PATHS.stylus, [ "stylus" ]);
  gulp.watch(PATHS.jsx, [ "build" ]);
  gulp.watch(PATHS.data, [ "jade", "jade-works" ]);
});
gulp.task("deploy", [ "jade", "jade-works", "jade-progress" ]);
