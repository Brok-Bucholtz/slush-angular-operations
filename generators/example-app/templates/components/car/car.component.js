'use strict';

angular.module('car.component', [
  'ui.router',
  'car.controllers'
])
  .config(function config($stateProvider) {
    $stateProvider
      .state('car', {
        url: '/car',
        templateUrl: 'client/components/car/car.view.html',
        controller: 'CarCtrl'
      });
  });
