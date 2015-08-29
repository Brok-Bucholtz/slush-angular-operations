'use strict';

/*global OAuth:false */
angular.module('oauth.services', [])
  .factory('OauthService', [function() {
    var OAUTH_IO_PUBLIC_KEY = 'ps9cy0ym9_l782bKFGrf_5A4I8E';

    OAuth.initialize(OAUTH_IO_PUBLIC_KEY);
    return OAuth;
  }]);
