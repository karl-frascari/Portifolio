// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

var ts = require('gulp-typescript');
 
gulp.task('transpile', function () {
    return gulp.src('js/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('compiled/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.ts', ['transpile']);
});

// Default Task
gulp.task('default', ['watch']);