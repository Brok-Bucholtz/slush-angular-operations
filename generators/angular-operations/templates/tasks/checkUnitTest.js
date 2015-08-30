'use strict';

var karma = require('gulp-karma');

module.exports = function(files, karmaConfigFile) {
  return function() {
    return files
      .pipe(karma({
        configFile: karmaConfigFile,
        action: 'run'
      }));
  };
};
