'use strict';

angular.module('login.component', [
  'ui.router',
  'login.controllers',
  'user.services'
])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login?redirectState',
          templateUrl: 'client/components/login/login.view.html',
          controller: 'LoginCtrl'
        });
  }])
  .run([
    '$rootScope',
    '$state',
    'UserService',
    function($rootScope, $state, userService) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.authenticationRequired && !userService.isLoggedIn()) {
          $state.go('login', {redirectState: toState.name});
          event.preventDefault();
        }
      });
    }
  ]);
