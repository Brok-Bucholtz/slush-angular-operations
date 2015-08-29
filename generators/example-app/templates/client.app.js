'use strict';

/*exported clientApp */
var clientApp = angular.module('client.app', [
  'ui.router',
  'car.component',
  'chat.component',
  'home.component',
  'login.component',
  'navigation.component'
])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
          .state('/', {
            url: '/',
            templateUrl: 'client/components/home/home.view.html',
            controller: 'HomeCtrl'
          });
    }
  ]);
