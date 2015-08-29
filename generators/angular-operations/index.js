'use strict';

var gulp = require('gulp');
var conflict = require('gulp-conflict');
var install = require('gulp-install');
var template = require('gulp-template');

var path = require('path');
var extend = require('util')._extend;
var Promise = require('promise');

var getNumberOfLevelsInPath = function(filePath) {
  var re = new RegExp('[^\\s/.]+', 'g');

  return filePath.match(re).length;
};
var resolveParameterPaths = function(parameters, baseDirectory) {
  var returnParameters = extend({}, parameters);

  returnParameters.angularDirectory =
      path.join(baseDirectory, parameters.angularDirectory);
  returnParameters.libDirectory =
      path.join(baseDirectory, parameters.libDirectory);
  returnParameters.unitTestDirectory =
      path.join(baseDirectory, parameters.unitTestDirectory);
  returnParameters.e2eTestDirectory =
      path.join(baseDirectory, parameters.e2eTestDirectory);

  return returnParameters;
};

exports.generate = function(parameters) {
  return new Promise(function(resolve, reject) {
    var baseDirectory =
      Array.apply(
        null,
        Array(getNumberOfLevelsInPath(parameters.operationsFolder)))
        .map(String.prototype.valueOf, '../')
        .join('');

    parameters = resolveParameterPaths(parameters, baseDirectory);

    gulp.src(__dirname + '/templates/**')
      .pipe(template(parameters))
      .pipe(conflict(parameters.operationsFolder))
      .pipe(gulp.dest(parameters.operationsFolder))
      .on('end', function () {
        gulp.src([parameters.operationsFolder + 'package.json'])
            .pipe(install())
            .on('end', resolve)
            .on('error', reject);
      })
      .on('error', reject);
  });
};
