var gulp = require("gulp"),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    print = require('gulp-print'),
    _ = require('underscore'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    es2015 = require('babel-preset-es2015'),
    sourcemaps = require('gulp-sourcemaps');

var enviroment = 'development';
var setTaskList = [];

gulp.task('transpile', function() {

    return gulp.src('public/**/*.js')
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('less', function() {

    return gulp.src('public/**/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist'));
});


gulp.task('includePublic', ['transpile', 'less'], function() {

    var target = gulp.src('views/*.html');

    var sources = gulp.src(
        ['dist/*.js', 'dist/*.css'], { read: false, relative: true }
    );

    return target.pipe(inject(sources, { ignorePath: 'dist', addRootSlash: true }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));;
});


gulp.task('includeScripts', ['transpile', 'less', 'includePublic'], function() {

    var target = gulp.src('views/*.html');

    var sources = gulp.src(
        ['scripts/*.js'], { read: false, relative: true }
    );

    return target.pipe(inject(sources, { ignorePath: 'scripts', addRootSlash: true, name: 'scripts' }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));;
});

gulp.task('watch', ['less', 'transpile', 'includeScripts', 'includePublic'], function() {

    livereload.listen( );

    var stream = nodemon({
        script: 'bin/server.js',
        env: { 'NODE_ENV': 'development' }
    }).on('restart', function() {

    });

    gulp.watch("public/**/*.js", ["transpile"]);

    return stream
})

gulp.task('default', ['watch']);

