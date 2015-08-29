'use strict';

angular.module('navigation.controllers', [
  'ui.router',
  'user.services'
])
  .controller('NavigationCtrl', [
    '$scope',
    '$state',
    'UserService',
    function($scope, $state, userService) {
      $scope.viewUrl = '/client/components/navigation/navigation.view.html';
      $scope.User = userService;

      $scope.isCurrentState = function(stateName) {
        return stateName === $state.current.name;
      };

      $scope.logout = function() {
        userService.logout();
        $state.go($state.current, {}, {reload: true});
      };
    }
  ]);
