'use strict';

angular.module('car.services', [
  'car.resources'
])
  .factory('CarService', ['$q', 'CarResource', function($q, CarResource) {
    return {
      getCar: function(carData) {
        return CarResource.get(carData).$promise;
      },
      createCar: function(carData) {
        return CarResource.save(carData).$promise;
      },
      deleteCar: function(carData) {
        return CarResource.delete({id: carData.id}).$promise;
      },
      updateCar: function(carData) {
        return CarResource.update(carData).$promise;
      },
      getAllCars: function() {
        return $q(function(resolve, reject) {
          CarResource.query(function(response) {
            var cars = {};
            angular.forEach(response.items, function(carData) {
              cars[carData.id] = carData;
            });
            resolve(cars);
          }, reject);
        });
      }
    };
  }]);
