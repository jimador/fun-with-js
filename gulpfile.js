'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var less = require('gulp-less');

var config = {
    bowerDir: './bower_components'
};


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('main-bower-files', ['bower'], function(){
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    ignore: true
                }
            }
        }))
        .pipe(filterJS)
        .pipe(filterJS.restore)
        .pipe(gulp.dest('./scripts/libs'));
});

gulp.task('build-less', ['bower'], function(){
    return gulp.src('./less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('./less/css'));
});

gulp.task('default', ['bower', 'main-bower-files', 'build-less']);
