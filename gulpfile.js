'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve',
            'gulp-bower': 'bower',
            'gulp-main-bower-files': 'bowerFiles'
        }
    });

var del = require('del');


// Start Watching: Run "gulp"
gulp.task('default', ['bower', 'thin:bower', 'build:css']);

// Clean all EXCEPT bower components task.
// del takes 2 params, patterns (paths or globs) and options (and files prepended with a .dot)
// prepend with a ! [bang] to tell del NOT to delete something
gulp.task('clean', function () {
    return del(['assets/css/**', 'assets/js/**'], {dot: true});
});

// Clean bower too
gulp.task('clean:all', function () {
    return del(['assets/css/**', 'assets/js/**', 'bower_components/**'], {dot: true});
});

// Run "gulp server"
gulp.task('server', ['serve', 'watch']);

// watch task
gulp.task('watch', function () {
    gulp.watch('scripts/libs/**/*.js', ['thin:bower']);
    gulp.watch('scripts/app/**/*.js', ['build:js']);
    gulp.watch('less/**/*.less', ['build:css']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(['scripts/**/*', 'less/**/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});

// Build with minified JS. You can use gulp-inject to automate the
// building of all of the script tags in your index.html so you don't
// have to maintain what's pointing where by hand.
gulp.task('build:min', ['default', 'build:js']);

// Build and run app on 8888
gulp.task('build:run', ['default', 'server']);

// pull in all bower dependencies: "gulp bower"
gulp.task('bower', function () {
    return plugins.bower()
        .pipe(gulp.dest('./bower_components'));
});

// This task will loop through all of the bower components and pull out the
// .js files we care about: -> "gulp thin-bower"
gulp.task('thin:bower', ['bower'], function () {
    var filterJS = plugins.filter('**/*.js', {
        restore: true
    });
    return gulp.src('./bower.json')
        .pipe(plugins.bowerFiles({
            overrides: {
                bootstrap: {
                    ignore: true
                }
            }
        }))
        .pipe(filterJS)
        .pipe(filterJS.restore)
        .pipe(gulp.dest('scripts/libs'));
});

// Minify Custom JS: -> "gulp build-js"
gulp.task('build:js', function () {
    return gulp.src('scripts/app/**/*.js')
        .pipe(plugins.iife({
            useStrict: true,
            trimCode: true,
            prependSemicolon: false,
            bindThis: false,
            params: ["window", "document", "$", "angular", "undefined"],
            args: ["window", "document", "jQuery", "angular"]
        }))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('app.min.js'))
        .pipe(gulp.dest('assets/js'));
});

// compile less into css -> "gulp build-css"
gulp.task('build:css', function () {
    return gulp.src('less/*.less')
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
        .pipe(gulp.dest('./assets/css')).on('error', gutil.log);
});

