'use strict';

var exec = require('child_process').exec;
var del = require('del');

describe('E2E: slush angular operations', function() {
  var slushGenerator = 'angular-operations';
  var tmpE2EDirectory = '../tmp/e2e-gulpfile/';
  var testAnswers;

  beforeEach(function() {
    testAnswers = {
      operationsFolder: './operationsFolder/',
      angularDirectory: './app/',
      libDirectory: './app/lib/',
      unitTestDirectory: './app/',
      e2eTestDirectory: './e2e-tests/',
      exampleApp: false
    };

    //cache node_modules
    //set angular operations directory to a unique test folder
  });

  afterEach(function() {
    del(tmpE2EDirectory);
  });

  it('should run lint', function() {
    var slushProcess = exec(
      'slush ' + slushGenerator,
        {},//{cwd: tmpE2EDirectory},
      function(error, stdout) {
        if(error) {throw error;}
        if (stdout) {console.log(stdout);}
      });

    //slushProcess.stdin(testAnswers.join('\\n'));
  });
});
