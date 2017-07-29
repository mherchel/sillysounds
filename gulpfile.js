const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('babel', () =>
  gulp.src('src/**/*.js')
    // .pipe(watch('src/**/*.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015-ie'],
    }))
    .pipe(concat('_build.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['babel']);
});
