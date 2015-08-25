'use strict';

// Ignore jscs errors for access_token and expires_in
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
angular.module('user.services', [
  'user.resources',
  'oauth.services'
])
  .factory('UserService', [
    '$q',
    '$window',
    'UserResource',
    'OauthService',
    function($q, $window, userResource, oauthService) {
      var USER_OATH_KEY = 'user.oauth.json';
      var USER_DATA_KEY = 'user.data.json';
      var MILLISECONDS_ONE_SECOND = 1000;

      var userFactory = {};

      var getAuthToken = function() {
        var oauth = JSON.parse($window.localStorage.getItem(USER_OATH_KEY));

        return oauth.access_token;
      };

      var getAuthentication = function(provider) {
        return $q(function(resolve, reject) {
          oauthService.popup(provider)
              .then(function(response) {
                var oauth = response;
                oauth.time_stamp = (new Date()).getTime();
                oauth.expires_in *= MILLISECONDS_ONE_SECOND;   //Change from seconds to miliseconds

                $window.localStorage.setItem(
                  USER_OATH_KEY,
                  angular.toJson(oauth));
                resolve(response);
              }, reject);
        });
      };

      var getProfileData = function(authResponse) {
        return $q(function(resolve, reject) {
          authResponse.me().then(resolve, reject);
        });
      };

      var getUser = function(profileResponse) {
        return $q(function(resolve, reject) {
          userResource
              .login({
                object: 'login',
                email: profileResponse.email,
                access_token: getAuthToken()
              })
              .$promise.then(function(userData) {
                var user = {};
                user.id = userData.id;
                user.email = userData.email;
                $window.localStorage.setItem(
                  USER_DATA_KEY,
                  angular.toJson(user));
                resolve(user);
              }, reject);
        });
      };

      userFactory.USER_OATH_KEY = USER_OATH_KEY;
      userFactory.USER_DATA_KEY = USER_DATA_KEY;

      userFactory.login = function(provider) {
        return $q(function(resolve, reject) {
          getAuthentication(provider)
              .then(getProfileData)
              .then(getUser)
              .then(resolve, reject);
        });
      };

      userFactory.logout = function() {
        $window.localStorage.removeItem(USER_OATH_KEY);
        $window.localStorage.removeItem(USER_DATA_KEY);
      };

      userFactory.isLoggedIn = function() {
        if ($window.localStorage.getItem(USER_OATH_KEY) === null) {
          return false;
        } else {
          var oauth = JSON.parse($window.localStorage.getItem(USER_OATH_KEY));
          return Object.keys(oauth).length > 0 &&
            (oauth.time_stamp + oauth.expires_in) > (new Date()).getTime();
        }
      };

      return userFactory;
    }
  ]);
