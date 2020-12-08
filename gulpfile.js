require('dotenv').config();
const gulp = require('gulp');
const bSync = require('browser-sync');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

//browserify for transpiling "imports"

function reload(done) {
    bSync.reload();
    done();
}

gulp.task('sass', () => {
    return gulp
        .src('./style/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(cleanCSS({ compatibility: 'ie11' }))
        .pipe(gulp.dest('./public/style'))
        .pipe(bSync.stream());
});

const port = process.env.PORT || 3333;

gulp.task('serve', () => {
    bSync({
        // port: 3001,
        // proxy: 'https://localhost:3333'
        proxy: `localhost:${port}`
    });

    gulp.watch('./views/**/*.ejs', gulp.series(reload));
    gulp.watch('./public/**/*.js', gulp.series(reload));
    gulp.watch('./style/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('serve'), done => {
    done();
});
