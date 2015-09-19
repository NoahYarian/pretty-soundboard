var gulp = require('gulp'),
    $    = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'browser-sync']
    });

gulp.task('clean', function (cb) {
  $.del('htmlsketch/public')
    .then(function (paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
      cb();
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'join' of undefined") {
        console.log("Probably nothing to delete... let's keep going, shall we?");
        cb();
      } else {
        console.log("del error: ", err);
      }
    });
});

gulp.task('jade:dev', function () {
  gulp
    .src('htmlsketch/src/**/*.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('htmlsketch/public'));
});

gulp.task('sass:dev', function () {
  gulp
    .src('htmlsketch/src/main.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('htmlsketch/public'));
});

gulp.task('browser-sync', function() {
  $.browserSync.init({
    server: {
      baseDir: "./htmlsketch/public"
    }
  });
});

gulp.task('build:dev', ['jade:dev', 'sass:dev']);

gulp.task('serve', ['build:dev'], function () {
  gulp.start('browser-sync');
  gulp.watch(['src/*.jade'], ['jade:dev']).on('change', $.browserSync.reload);
  gulp.watch(['src/**/*.scss'], ['sass:dev']).on('change', $.browserSync.reload);
});

gulp.task('default', ['clean'], function () {
  gulp.start('serve');
});
