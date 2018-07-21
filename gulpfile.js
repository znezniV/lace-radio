const devAssets = './src/';
const prodAssets = './assets/';

const   gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        pump = require('pump'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        cssnano = require('gulp-cssnano');

// TASKS

//// JS
gulp.task('js', function (cb) {
    pump([
        gulp.src(devAssets + '/js/*.js'),
        uglify({
            sourceMap: true
        }),
        gulp.dest(prodAssets + '/js/')
    ],
    cb
  );
});

//// Sass
gulp.task('sass', function (cb) {
    pump([
        gulp.src(devAssets + '/css/style.scss'),
        sourcemaps.init(),
        sass({outputStyle: 'compressed'}).on('error', sass.logError),
        autoprefixer(),
        cssnano(),
        sourcemaps.write('./maps'),
        gulp.dest(prodAssets + '/css/')
    ],
    cb
    );
});

// WATCH

// Primary task to watch other tasks
gulp.task('default', function() {

    // Watch JS
    gulp.watch(devAssets + 'js/**/*.js', ['js']);

    // Watch Sass
    gulp.watch([devAssets + 'css/**/*.scss'], ['sass']);

});
