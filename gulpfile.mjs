import gulp from 'gulp'
import browserSync from 'browser-sync'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

const sassToCSS = async () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sass(
            { outputStyle: 'compressed' }
        ).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'))
}

const minifyJs = async () => {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js'))
}

const server = async () => {
    const browser = browserSync.create()
    browser.init({
        server: 'public'
    })
    browser.watch('public/**/*').on('change', browser.reload)
}

const watchFiles = async () => {
    gulp.watch('app/scss/*.scss', gulp.series(sassToCSS))
    gulp.watch('app/js/*.js', gulp.series(minifyJs))
}

const build = gulp.parallel(watchFiles, server)

export {
    minifyJs,
    sassToCSS,
    server,
    build as default
}