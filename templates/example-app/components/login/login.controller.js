'use strict';

angular.module('login.controllers', [
  'ui.router',
  'user.services'
])
  .controller('LoginCtrl', [
    '$scope',
    '$state',
    'UserService',
    function($scope, $state, userService) {
      $scope.isAuthenticating = false;
      $scope.isLoginError = false;

      var redirectToStateOrDefault = function(redirectState) {
        if (redirectState) {
          $state.go(redirectState);
        } else {
          $state.go('/');
        }
      };

      $scope.authenticate = function(provider) {
        $scope.isAuthenticating = true;
        $scope.isLoginError = false;

        userService.login(provider).then(function() {
          redirectToStateOrDefault($state.params.redirectState);
        }, function() {
          $scope.isLoginError = true;
        }).finally(function() {
          $scope.isAuthenticating = false;
        });
      };

      //Redirect them if they are authenticated
      if (userService.isLoggedIn()) {
        redirectToStateOrDefault($state.params.redirectState);
      }
    }
  ]);
