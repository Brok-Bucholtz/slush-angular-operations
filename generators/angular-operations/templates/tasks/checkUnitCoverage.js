'use strict';

var exec = require('child_process').exec;
var gutil = require('gulp-util');
var standardExecCallBack = function(error, stdout, stderr) {
  if (error) {throw error;}
  if (stdout) {gutil.log(stdout);}
  if (stderr) {gutil.log(stderr);}
};

module.exports = function(istanbulConfigFile, coverageDirectory) {
  return function() {
    exec(
      'node ./node_modules/istanbul/lib/cli.js ' +
      'check-coverage ' + coverageDirectory + 'coverage-final.json ' +
      '--config ' + istanbulConfigFile,
      standardExecCallBack);
  };
};
