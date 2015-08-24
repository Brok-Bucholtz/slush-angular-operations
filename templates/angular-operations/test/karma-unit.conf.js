'use strict';

module.exports = function(config) {
  var conf = {
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    browsers: ['PhantomJS']
  };

  config.set(conf);
};
