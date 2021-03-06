const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile Sass and Inject in browser
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

//Move js to src/js
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream())
});

//Watch Sass and Serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server:'./src'
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

//Move fonts Folder to src
gulp.task('fonts', function(){
    gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest("src/fonts"));
});

//Move font awesome CSS to src
gulp.task('fa', function(){
    gulp.src(['node_modules/font-awesome/css/font-awesome.css/font-awesome.min.css'])
        .pipe(gulp.dest("src/css"));
});

gulp.task('default', ['js', 'serve', 'fonts', 'fa']);

