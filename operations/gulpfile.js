'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

var e2eTestFiles = './tests/*.e2e.js';

gulp.task('test', function() {
  return gulp.src(e2eTestFiles)
    .pipe(jasmine());
});

gulp.task('default');
