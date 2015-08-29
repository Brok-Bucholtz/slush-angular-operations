'use strict';

var gulp = require('gulp');

exports.generate = function(parameters) {
  return new Promise(function(resolve, reject) {
    gulp.src(__dirname + './templates/**')
        .pipe(gulp.dest('./example-app/'))
        .on('end', resolve)
        .on('error', reject);
  });
};
