'use strict';

var exec = require('child_process').exec;
var jip = require('jasmine-istanbul-phantom');

var gulp = require('gulp');
var angularProtractor = require('gulp-angular-protractor');
var bower = require('gulp-bower');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var liveServer = require('gulp-live-server');
var gutil = require('gulp-util');

var jshintConfig = require('./format/jshint-conf.json');
var jscsConfig = require('./format/jscs-conf.json');
var karmaConfigFile = './test/karma-unit.conf.js';
var protractorConfigFile = './test/protractor-e2e.conf.js';
var istanbulConfigFile = './test/istanbul-conf.json';

var notFile = function(filePath) {
  return '!' + filePath;
};
var standardExecCallBack = function(error, stdout, stderr) {
  if (error) {throw error;}
  if (stdout) {gutil.log(stdout);}
  if (stderr) {gutil.log(stderr);}
};

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
var operationFiles = ['./gulpfile.js'];
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

gulp.task('check-lint', function() {
  jshintConfig.lookup = false;

  return codeBaseJsSrc
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('check-style', function() {
  return codeBaseJsSrc
    .pipe(jscs(jscsConfig));
});
gulp.task('check-unittest', ['setup-unittest'], function() {
  return gulp.src(libFiles.concat(bowerLibFiles, angularFiles, unitTestFiles))
    .pipe(karma({
      configFile: karmaConfigFile,
      action: 'run'
    }));
});
gulp.task('check-e2etest', function() {
  var server = liveServer.static(angularDirectory, testServerPort);
  server.start();

  gulp.src(e2eTestFiles)
    .pipe(angularProtractor({
      configFile: protractorConfigFile,
      autoStartStopServer: true
    }))
    .on('error', function(error) {
      server.stop();
      throw error;
    })
    .on('end', function() {
      server.stop();
      process.exit();
    });
});
gulp.task('check-unitcoverage', ['generate-unittestcoverage'], function() {
  exec(
    'node ./node_modules/istanbul/lib/cli.js ' +
      'check-coverage ' + coverageDirectory + 'coverage-final.json ' +
      '--config ' + istanbulConfigFile,
    standardExecCallBack);
});

gulp.task('generate-unittestcoverage', function(callBack) {
  jip({
    tmp: jipDirectory,
    jasmine: {
      report: jipDirectory
    },
    istanbul: {
      report: coverageDirectory,
      reporters: ['html', 'lcov', 'json']
    },
    src: clientFiles,
    lib: libFiles,
    spec: unitTestFiles,
    callback: callBack
  });
});

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
