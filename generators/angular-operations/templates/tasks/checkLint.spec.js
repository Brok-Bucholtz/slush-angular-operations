'user strict';

var gulp = require('gulp');
var stream = require('stream');

describe('check-lint task', function() {
  var task;
  var testStream;

  beforeEach(function() {
    task = require('./checkLint.js');
    testStream = new stream.Duplex;
  });
});
