'use strict';

var gutil = require('gulp-util');
var Stream = require('stream');

describe('check-lint task', function() {
  var task;
  var testFiles;

  beforeAll(function() {
    spyOn(console, 'log');
  });

  beforeEach(function() {
    task = require('./checkLint.js');
    testFiles = Stream.Readable({objectMode: true});
  });

  it('should error on suspicious language usage', function(done) {
    testFiles._read = function() {
      this.push(new gutil.File({
        cwd: '/',
        base: '/test/',
        path: '/test/file.js',
        contents: new Buffer('var test = 123')
      }));
      this.push(null);
    };

    task(testFiles, {})()
        .on('error', function(error) {
          expect(console.log).toHaveBeenCalled();
          expect(error).not.toBeNull();
          done();
        });
  });
});
