'use strict';

var inquirer = require('inquirer');
var path = require('path');
var extend = require('util')._extend;

var gulp = require('gulp');
var conflict = require('gulp-conflict');
var install = require('gulp-install');
var template = require('gulp-template');

var defaultParameters = {
  operationsFolder: './angular-operations/',
  angularDirectory: './app/',
  libDirectory: './app/lib/',
  unitTestDirectory: './app/',
  e2eTestDirectory: './e2e-tests/',
  exampleApp: false
};

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

var generate = function(parameters, done) {
  var baseDirectory =
    Array.apply(
      null,
      Array(getNumberOfLevelsInPath(parameters.operationsFolder)))
    .map(String.prototype.valueOf, '../')
     .join('');

  parameters = resolveParameterPaths(parameters, baseDirectory);

  gulp.src(__dirname + '/templates/angular-operations/**')
    .pipe(template(parameters))
    .pipe(conflict(parameters.operationsFolder))
    .pipe(gulp.dest(parameters.operationsFolder))
    .on('end', function() {
      gulp.src([parameters.operationsFolder + 'package.json'])
        .pipe(install())
        .on('end', done);
    });
};

gulp.task('no-prompt', function(done) {
  generate(defaultParameters, done);
});
gulp.task('prompt', function(done) {
  inquirer.prompt([
    {type: 'input', name: 'operationsFolder',
      message: 'Where should the operation files be placed?',
      default: defaultParameters.operationsFolder},
    {type: 'input', name: 'angularDirectory',
      message: 'What is the location of the angular files?',
      default: defaultParameters.angularDirectory},
    {type: 'input', name: 'libDirectory',
      message: 'What is location of the library files?',
      default: defaultParameters.libDirectory},
    {type: 'input', name: 'unitTestDirectory',
      message: 'What is location of the unit test files?',
      default: defaultParameters.unitTestDirectory},
    {type: 'input', name: 'e2eTestDirectory',
      message: 'What is location of the e2e test files?',
      default: defaultParameters.e2eTestDirectory},
    {type: 'confirm', name: 'exampleApp',
      message: 'Do you want to add an example app?',
      default: defaultParameters.exampleApp}
  ], function(answers) {generate(answers, done);});
});
gulp.task('default', ['prompt']);
