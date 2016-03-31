var gulp = require("gulp"),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    print = require('gulp-print'),
    _ = require('underscore');


gulp.task('less', function() {

    livereload.listen();

    return gulp.src('public/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
});


gulp.task('includeScripts', function() {

    livereload.listen();

    var target = gulp.src('views/*.html');

    var sources = gulp.src(
        ['public/**/*.js', 'public/**/*.css'], { read: false, relative: true}
    ).pipe(print());


    return target.pipe(inject(sources, {ignorePath: 'public'}))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));;
});



gulp.task('watch', ['less', 'includeScripts'], function() {

    var stream = nodemon({
        script: 'bin/server.js',
        watch: 'public',
        tasks: ['less', 'includeScripts']
    }).on('start', function() {
        console.log('restarted!')
    })

    return stream
})

gulp.task('default', ['watch']);
