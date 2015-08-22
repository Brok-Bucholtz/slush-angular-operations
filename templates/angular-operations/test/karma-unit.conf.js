'use strict';

module.exports = function(config) {
  var conf = {
    basePath: '../../../',
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    browsers: ['PhantomJS']
  };

  config.set(conf);
};
