'use strict';

var gulp = require('gulp');
var inquirer = require('inquirer');

var angularOperationsGenerator = require('./generators/angular-operations/');
var exampleAppGenerator = require('./generators/example-app/');

var defaultParameters = {
  operationsFolder: './angular-operations/',
  angularDirectory: './app/',
  libDirectory: './app/lib/',
  unitTestDirectory: './app/',
  e2eTestDirectory: './e2e-tests/',
  exampleApp: false
};

var generate = function(parameters, done) {
  angularOperationsGenerator.generate(defaultParameters)
    .then(function() {
      if(parameters.exampleApp) {
        exampleAppGenerator.generate(defaultParameters)
          .then(function() {done();});
      } else {done();}
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
