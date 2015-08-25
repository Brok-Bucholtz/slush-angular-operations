'use strict';

angular.module('car.resources', [
  'ngResource'
])
  .factory('CarResource', ['$resource', function($resource) {
    var car = $resource(
      '/_ah/api/car/v1/cars/:id',
      {id: '@id'},
      {
        query: {isArray: false},
        update: {method: 'PUT'}
      });
    return car;
  }]);
