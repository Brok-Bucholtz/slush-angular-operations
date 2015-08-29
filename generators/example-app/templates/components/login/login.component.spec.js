'use strict';

describe('login component', function() {
  beforeEach(module('login.component',function($stateProvider) {
    $stateProvider
      .state(testState, {
        url: '/testState',
        controller: function() {},
        authenticationRequired: true
      });
  }));

  var $scope;
  var $state;
  var testState = 'Test State';
  var mockUserService;

  beforeEach(function() {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn']);

    module(function($provide) {
      $provide.value('UserService', mockUserService);
    });

    inject(function($rootScope, _$state_, $templateCache) {
      $scope = $rootScope.$new();
      $state = _$state_;

      $templateCache.put('client/components/login/login.view.html', '');
    });
  });

  it('should redirect to login if authentication is required', function() {
    mockUserService.isLoggedIn.and.returnValue(false);
    $state.go(testState);
    $scope.$digest();

    expect($state.current.controller).toEqual('LoginCtrl');
  });
});
