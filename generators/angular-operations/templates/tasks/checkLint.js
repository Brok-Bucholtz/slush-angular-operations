'use strict';

var jshint = require('gulp-jshint');

module.exports = function(files, jshintConfig) {
  return function() {
    jshintConfig.lookup = false;

    return files
      .pipe(jshint(jshintConfig))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
  };
};
