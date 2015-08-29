'use strict';

describe('client app', function() {
  beforeEach(module('client.app'));

  var $scope;
  var $state;

  beforeEach(inject(function($rootScope, _$state_, $templateCache) {
    $scope = $rootScope.$new();
    $state = _$state_;

    $templateCache.put('client/components/home/home.view.html', '');
  }));

  it('should have "/" path to home controller', function() {
    $state.go('/');
    $scope.$digest();

    expect($state.current.controller).toEqual('HomeCtrl');
  });
});
