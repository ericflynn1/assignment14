'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let lint = require('gulp-html-lint');

gulp.task('default', ['html', 'css', 'js']);
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(htmlLint())
        .pipe(htmlLint.format())
        .pipe(htmlLint.failOnError())
        .pipe(gulp.dest('public/'));
});
gulp.task('css', function (){
    return gulp.src('style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/'));
});
gulp.task('js', function (){
    return gulp.src('app.js')
    .pipe(gulp.dest('public/'));
});
gulp.task('watch', function (){
    gulp.watch('index.html', ['html']);
    gulp.watch('scss/*.scss', ['css']);
    gulp.watch('app.js', ['js']);
});