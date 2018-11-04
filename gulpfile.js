const
    timer = require('./gulp/lib/timer'),
    gulp = require('gulp'),
    // server
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    notifier = require('node-notifier');


// --- RELOAD
/**
 * Reload: Livereload
 */
gulp.task('reload:browser', function () {
    var options = {
        // base will check changes on 'public' folder
        base: "public"
    };
    livereload.listen(options);
    gulp.watch([
            'public/**/*.html',
            'public/**/*.css',
            'public/js/app.browserify.js',
            'public/js/bower_components.min.js',
        ])
        .on('change', function (event) {
            livereload.changed(event);
            notifier.notify({
                message: timer.lapse() + ': Browser refreshed'
            });
        });
});
/**
 * Reload: Node server
 */
gulp.task('reload:server', function () {
    nodemon({
            script: './bin/www', // script to start the server
            ext: 'js, hbs', // file type to watch, for example *.js, *.hbs 
            watch: [
                'bin/www', // server script
                'app.js', // app script
                'views', // hbs files
                'routes' // routes
            ]
        })
        .on('change', function (event) {
            notifier.notify({
                message: timer.lapse() + ': Node CHANGE: ' + event
            });
        })
        .on('start', function (event) {
            notifier.notify({
                message: timer.lapse() + ': Node start'
            });
            setTimeout(function () {
                livereload.changed('/');
                notifier.notify({
                    message: timer.lapse() + ': Livereload: Node start'
                });
            }, 1000);
        })
        .on('restart', function (event) {
            notifier.notify({
                message: timer.lapse() + ': Node restarted'
            });
            setTimeout(function () {
                livereload.changed('/');
                notifier.notify({
                    message: timer.lapse() + ': Livereload: Node restart'
                });
            }, 1000);
        });
});


// --- COMBINED TASKS
gulp.task('reload', ['reload:server', 'reload:browser']);