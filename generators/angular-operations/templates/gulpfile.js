'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');

var jshintConfig = require('./config/jshint-conf.json');
var jscsConfig = require('./config/jscs-conf.json');
var karmaConfigFile = './config/karma-unit.conf.js';
var protractorConfigFile = './config/protractor-e2e.conf.js';
var istanbulConfigFile = './config/istanbul-conf.json';

var notFile = function(filePath) {
  return '!' + filePath;
};

var gulpTaskDirectory = './tasks/';
var coverageDirectory = './tmp/coverage/';
var bowerDirectory = './tmp/bower_components/';
var jipDirectory = './tmp/jip/';

// User Determined variables
var angularDirectory = '<%= angularDirectory %>';
var libDirectory = '<%= libDirectory %>';
var unitTestDirectory = '<%= unitTestDirectory %>';
var e2eTestDirectory = '<%= e2eTestDirectory %>';
var testServerPort = 9999;

var angularFiles = [angularDirectory + '**/*.js'];
var bowerLibFiles = [bowerDirectory + 'angular-mocks/angular-mocks.js'];//ToDo: check if
var libFiles = [libDirectory + '**/*.js'];
var unitTestFiles = [unitTestDirectory + '**/*.spec.js'];
var e2eTestFiles = [e2eTestDirectory + '**/*.e2e.js'];
var operationFiles = ['./gulpfile.js', gulpTaskDirectory + '**/*.js'];
var clientFiles = angularFiles.concat(
  unitTestFiles.map(notFile),
  libFiles.map(notFile));

var codeBaseJsSrc = gulp.src(
  angularFiles.concat(
    unitTestFiles,
    e2eTestFiles,
    operationFiles,
    libFiles.map(notFile)));

gulp.task('setup-unittest', function() {
  return bower(bowerDirectory);
});

gulp.task('check-lint',
  require(gulpTaskDirectory + 'checkLint.js')(codeBaseJsSrc, jshintConfig));
gulp.task('check-style',
  require(gulpTaskDirectory + 'checkStyle.js')(codeBaseJsSrc, jscsConfig));
gulp.task('check-unittest', ['setup-unittest'],
  require(gulpTaskDirectory + 'checkUnitTest.js')(
    gulp.src(libFiles.concat(bowerLibFiles, angularFiles, unitTestFiles)),
    karmaConfigFile
  ));
gulp.task('check-e2etest',
  require(gulpTaskDirectory + 'checkE2ETest.js')(
    gulp.src(e2eTestFiles),
    protractorConfigFile,
    angularDirectory,
    testServerPort
  ));
gulp.task('check-unitcoverage',['generate-unittestcoverage'],
  require(gulpTaskDirectory + 'checkUnitCoverage.js')(
    istanbulConfigFile,
    coverageDirectory
  ));

gulp.task('generate-unittestcoverage',
  require(gulpTaskDirectory + 'generateUnitTestCoverage.js')(
    coverageDirectory,
    jipDirectory,
    {
      src: clientFiles,
      lib: libFiles,
      spec: unitTestFiles,
    }
  ));

gulp.task('check-formatting', [
  'check-lint',
  'check-style']);
gulp.task('check-test', [
  'check-unittest',
  'check-e2etest',
  'check-unitcoverage']);
gulp.task('check-code', [
  'check-test',
  'check-formatting']);

gulp.task('default');
