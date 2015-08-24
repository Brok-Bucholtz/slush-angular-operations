'use strict';

var inquirer = require('inquirer');

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

var generate = function(parameters, done) {

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
