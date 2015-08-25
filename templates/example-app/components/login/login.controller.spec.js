'use strict';

describe('login controller', function() {
  beforeEach(module('login.controllers'));

  var $scope = null;
  var loginCtrl = null;
  var mockState = null;
  var mockUserServ = null;
  var testUser = {};

  beforeEach(inject(function($controller, $rootScope, $q) {
    $scope = $rootScope.$new();

    mockState = jasmine.createSpyObj('$state', ['go']);
    mockState.params = {};
    mockUserServ = jasmine.createSpyObj('UserService', ['login', 'isLoggedIn']);
    mockUserServ.isLoggedIn.and.returnValue(false);
    mockUserServ.login.and.returnValue($q.when(testUser));

    loginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      $state: mockState,
      UserService: mockUserServ
    });
    $scope.$digest();
  }));

  it('should redirect to "/" after login by default', function() {
    var testProvider =  'Test Provider';
    $scope.authenticate(testProvider);
    $scope.$digest();

    expect(mockUserServ.login).toHaveBeenCalledWith(testProvider);
    expect($scope.isLoginError).toBeFalsy();
    expect($scope.isAuthenticating).toBeFalsy();
    expect(mockState.go).toHaveBeenCalledWith('/');
  });

  it('should redirect to a path after login, if provided', function() {
    var testProvider =  'Test Provider';
    var testState = 'Test State';
    mockState.params.redirectState = testState;
    $scope.authenticate(testProvider);
    $scope.$digest();

    expect(mockUserServ.login).toHaveBeenCalledWith(testProvider);
    expect($scope.isLoginError).toBeFalsy();
    expect($scope.isAuthenticating).toBeFalsy();
    expect(mockState.go).toHaveBeenCalledWith(testState);
  });

  it('should catch login error', inject(function($q) {
    mockUserServ.login.and.returnValue($q.reject());
    var testProvider =  'Test Provider';
    $scope.authenticate(testProvider);
    $scope.$digest();

    expect(mockUserServ.login).toHaveBeenCalledWith(testProvider);
    expect($scope.isLoginError).toBeTruthy();
    expect($scope.isAuthenticating).toBeFalsy();
  }));
});
