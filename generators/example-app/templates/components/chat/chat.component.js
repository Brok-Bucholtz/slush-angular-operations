'use strict';

angular.module('chat.component', [
  'ui.router',
  'chat.controllers'
])
  .config(function config($stateProvider) {
    $stateProvider
        .state('chat', {
          url: '/chat',
          templateUrl: 'client/components/chat/chat.view.html',
          controller: 'ChatCtrl',
          authenticationRequired: true
        });
  });
