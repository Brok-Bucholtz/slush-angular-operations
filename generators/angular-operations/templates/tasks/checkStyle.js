'use strict';

var jscs = require('gulp-jscs');

module.exports = function(files, jscsConfig) {
  return function() {
    return files.pipe(jscs(jscsConfig));
  };
};
