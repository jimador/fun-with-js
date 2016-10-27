'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
// var less = require('gulp-less');

var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Run "gulp server"
gulp.task('server', ['serve', 'watch']);

// bower directory for main-bower-files task to pull from
var config = {
    bowerDir: './bower_components'
};

// pull in all bower dependencies
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('main-bower-files', ['bower'], function() {
    var filterJS = gulpFilter('**/*.js', {
        restore: true
    });
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

gulp.task('build-css', function () {
    return gulp.src('assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build')).on('error', gutil.log);
});

// Default task
gulp.task('watch', function () {
    gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/less/**/*.less', ['build-css']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(['build/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});

// gulp.task('default', ['bower', 'main-bower-files', 'build-less']);
