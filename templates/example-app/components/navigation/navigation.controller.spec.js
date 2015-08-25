'use strict';

describe('navigation controller', function() {
  beforeEach(module('navigation.controllers'));

  var $scope;
  var navCtrl;
  var mockUserServ;
  var mockState;

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();

    mockUserServ = jasmine.createSpyObj('UserService', ['logout']);
    mockState = jasmine.createSpyObj('$state', ['go']);
    mockState.current = {};

    navCtrl = $controller('NavigationCtrl', {
      $scope: $scope,
      $state: mockState,
      UserService: mockUserServ
    });
    $scope.$digest();
  }));

  it('should reload the state when logging out', function() {
    $scope.logout();

    expect(mockUserServ.logout).toHaveBeenCalled();
    expect(mockState.go).toHaveBeenCalled();
  });

  it('should determine if the page is the one specified', function() {
    var testStateName = 'Test Name';
    mockState.current.name = testStateName;

    expect($scope.isCurrentState(testStateName)).toBeTruthy();
    expect($scope.isCurrentState(testStateName + 'Negative')).toBeFalsy();
  });
});
