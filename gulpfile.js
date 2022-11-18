'use strict'
const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins
const rev = require('gulp-rev');
const usemin = require('gulp-usemin');
const cleanCss = require('gulp-cleancss');
const htmlmin = require('gulp-htmlmin');
const flatmap = require('gulp-flatmap');
const copy = require('gulp-copy');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('dist/*', {
        read: false
    })
        .pipe(clean());
}

// JS function

function js() {
    const source = 'js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./dist/js/'))
        .pipe(browsersync.stream());
}

// CSS function

function css() {
    const source = 'css/styles.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/css/'))
        .pipe(browsersync.stream());
}

// usemin function

function html() {
    const source = '*.html';

    return src(source)
        .pipe(changed(source))
        .pipe(flatmap(function (stream, file) {
            return stream.pipe(usemin({
                css: [rev()],
                html: [function (){return htmlmin({ collapseWhitespace: true })}],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat'],
            }))
        }))
        .pipe(dest('./dist'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('images/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}

// Watch files

function watchFiles() {
    watch('*.html', html);
    watch('css/*.scss', css);
    watch('js/*.js', js);
    watch('images/*', img);
}

// BrowserSync

function browserSync() {
    //const files = ['./*.html','./css/*.scss','./js/*.js','./img/*.{png,jpg,gif,jpeg}'];
    browsersync.init({
        server: {
            baseDir: './'
        }
    });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, html));