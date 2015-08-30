'use strict';

var jip = require('jasmine-istanbul-phantom');

module.exports = function(coverageDirectory, jipDirectory, files) {
  return function(callBack) {
    jip({
      tmp: jipDirectory,
      jasmine: {
        report: jipDirectory
      },
      istanbul: {
        report: coverageDirectory,
        reporters: ['html', 'lcov', 'json']
      },
      src: files.src,
      lib: files.lib,
      spec: files.spec,
      callback: callBack
    });
  };
};
