const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer') // prefixex
const cleanCSS = require('gulp-clean-css') // minify css
const concat = require('gulp-concat') // unit files
const uglify = require('gulp-uglify') // minify js
const del = require('del') // delete all in production folder
const sass = require('gulp-sass') // scss sass

// sources
const paths = {
    styles: {
        src: {
            custom: './dev/scss/**/*.scss',
            other: [
                './node_modules/normalize.css/normalize.css',
                './node_modules/bootstrap/dist/css/bootstrap.css',
                './node_modules/summernote/dist/summernote.css'
            ]
        },
        dist: './dist/css'
    },
    scripts: {
        src: {
            custom: './dev/js/**/*.js',
            other: [
                './node_modules/vue/dist/vue.js',
                './node_modules/jquery/dist/jquery.js',
                './node_modules/vue-infinite-loading/dist/vue-infinite-loading.js',
                './node_modules/summernote/dist/summernote.js'
            ]
        },
        dist: './dist/js'
    },
    production: './dist/'
}

sass.compiler = require('node-sass');

// styles custom optimize
function customStyles() {
    return gulp.src(paths.styles.src.custom)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({ browsers: ['> 0.1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
        
}

// styles libs optimize
function staticStyles() {
    return gulp.src(paths.styles.src.other)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
        
}

// scripts custom optimize
function customScripts() {
    return gulp.src(paths.scripts.src.custom)
        .pipe(concat('script.js'))
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest(paths.scripts.dist))
        
}

// scripts libs optimize
function staticScripts() {
    return gulp.src(paths.scripts.src.other)
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest(paths.scripts.dist))
        
}

// optimize images
function images() {
    gulp.src(paths.images.src)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 10
        }))
        .pipe(gulp.dest(paths.images.dist))
}

// watchin' onchange
function watch() {
    gulp.watch(paths.styles.src.custom, customStyles)
    gulp.watch(paths.scripts.src.custom, customScripts)
}

function fuckProduction(){
    return del([paths.production + '*'])
}

gulp.task('styles', customStyles)
gulp.task('scripts', customScripts)
gulp.task('images', images)
gulp.task('watch', watch)

gulp.task('build', gulp.series(fuckProduction, gulp.parallel(customStyles, staticStyles, customScripts, staticScripts)))
gulp.task('default', gulp.series('build', 'watch'))