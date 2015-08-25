'use strict';

angular.module('user.resources', [
  'ngResource'
])
    .factory('UserResource', ['$resource', function($resource) {
      var User = $resource(
          '/_ah/api/user/v1/:object/:email',
          {object: 'users', email: '@email'},
          {
            query: {isArray: false},
            update: {method: 'PUT'},
            login: {method: 'GET'}
          });
      return User;
    }]);
