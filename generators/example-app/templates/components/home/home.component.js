'use strict';

angular.module('home.component', [
  'ui.router',
  'home.controllers'
])
  .config(function config($stateProvider) {
    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'client/components/home/home.view.html',
          controller: 'HomeCtrl'
        });
  });
