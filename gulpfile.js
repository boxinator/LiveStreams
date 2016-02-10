var gulp = require('gulp');
var babelify = require('babelify');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var merge = require("merge-stream");
var jsx = require('babel-plugin-jsx/gen')
var config = {
  "mainApp": "./src/js/main.js",
  "js": "./src/js/**/*.js",
  "less": "./src/less/**/*.less",
  "tests": "./test/js/**/*.js"
};

gulp.task('dev', ['js', 'css', 'webserver:dev', 'watch']);

gulp.task('css', function() {
  return gulp.src("./src/less/*.less")
        .pipe(less())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('js', function() {
  return browserify(config.mainApp)
        .transform(babelify)
        .bundle()
        .pipe(source('compiled.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
})

gulp.task('webserver:dev', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      //directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(config.js, ['js']);
  gulp.watch(config.less, ['css']);
})

var mocha = require('gulp-mocha');
gulp.task('test', function() {
  //var source = gulp.src('src/**/*.js')
  //  .pipe(babel({"plugins": ["transform-react-jsx"]}));

  var tests = gulp.src(config.tests, {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({compilers:{js:babel}}));

    return tests;
});
