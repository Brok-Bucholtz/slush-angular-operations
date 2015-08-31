'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

var unitTestFiles = [
  '../generators/angular-operations/templates/tasks/*.spec.js'];

gulp.task('test', function() {
  return gulp.src(unitTestFiles)
    .pipe(jasmine());
});

gulp.task('default');
