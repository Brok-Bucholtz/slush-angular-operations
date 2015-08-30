'use strict';

var angularProtractor = require('gulp-angular-protractor');
var liveServer = require('gulp-live-server');

module.exports = function(
    files,
    protractorConfigFile,
    angularDirectory,
    testServerPort) {
  return function() {
    var server = liveServer.static(angularDirectory, testServerPort);
    server.start();

    files
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
  };
};
