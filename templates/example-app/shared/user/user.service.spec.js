'use strict';

// Ignore jscs errors for access_token and expires_in
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe('user service', function() {
  beforeEach(module('user.services'));

  var $scope;
  var $window;
  var userServ;
  var mockUserResource;
  var mockOauthServ;
  var mockOauthReponse;
  var testRrofileResponse;
  var testUserData;
  var TEN_SECONDS_MILLISEC = 10000;

  beforeEach(function() {
    mockUserResource = jasmine.createSpyObj('UserResource', ['login']);
    mockOauthServ = jasmine.createSpyObj('OauthService', ['popup']);
    mockOauthReponse = jasmine.createSpyObj('OauthReponse', ['me', 'toJson']);

    module(function($provide) {
      $provide.value('UserResource', mockUserResource);
      $provide.value('OauthService', mockOauthServ);
    });

    inject(function($rootScope, $q, _$window_, UserService) {
      $scope = $rootScope.$new();
      $window = _$window_;
      $window.localStorage.clear();

      testRrofileResponse = {email: 'TEST@EMAIL.COM'};
      testUserData = {id: 124, email: 'user@email.com'};

      spyOn($window.localStorage, 'getItem').and.callThrough();
      spyOn($window.localStorage, 'setItem').and.callThrough();
      spyOn($window.localStorage, 'removeItem').and.callThrough();
      mockUserResource.login.and.returnValue({$promise: $q.when(testUserData)});
      mockOauthReponse.me.and.returnValue($q.when(testRrofileResponse));
      mockOauthReponse.access_token = 'Test Token';
      mockOauthReponse.expires_in = 20;
      mockOauthServ.popup.and.returnValue($q.when(mockOauthReponse));

      userServ = UserService;
      $scope.$digest();
    });
  });

  it('should login user', function() {
    var testProvider = 'Test Provider';
    var testUser = {
      object: 'login',
      email: testRrofileResponse.email,
      access_token: mockOauthReponse.access_token
    };
    var userData;
    userServ.login(testProvider).then(function(respData) {
      userData = respData;
    });
    $scope.$digest();

    expect(JSON.parse($window.localStorage.getItem(userServ.USER_OATH_KEY))
      .access_token)
        .toBe(mockOauthReponse.access_token);
    expect(angular.equals(
      JSON.parse($window.localStorage.getItem(userServ.USER_DATA_KEY)),
      testUserData))
        .toBeTruthy();
    expect(mockOauthServ.popup).toHaveBeenCalled();
    expect(mockOauthReponse.me).toHaveBeenCalled();
    expect(mockUserResource.login).toHaveBeenCalledWith(testUser);
    expect(userData).toEqual(testUserData);
  });
  it('should logout user', function() {
    $window.localStorage.setItem(
      userServ.USER_OATH_KEY,
      angular.toJson({test: 'data', for: 'oauth'}));
    $window.localStorage.setItem(
      userServ.USER_DATA_KEY,
      angular.toJson({test: 'data', for: 'user'}));
    userServ.logout();

    expect($window.localStorage.length).toBe(0);
  });
  it('should check if user is logged in', function() {
    var testOauthData = {
      time_stamp: (new Date()).getTime(),
      expires_in: TEN_SECONDS_MILLISEC,
      access_token: 'Test Token'
    };
    $window.localStorage.setItem(
      userServ.USER_OATH_KEY,
      angular.toJson(testOauthData));

    expect(userServ.isLoggedIn()).toBeTruthy();
  });
  it('should check if user is not logged in', function() {
    expect(userServ.isLoggedIn()).toBeFalsy();
  });
  it('should check if user credentials expired', function() {
    var testOauthData = {
      time_stamp: (new Date()).getTime(),
      expires_in: 0,
      access_token: 'Test Token'
    };
    $window.localStorage.setItem(
      userServ.USER_OATH_KEY,
      angular.toJson(testOauthData));

    expect(userServ.isLoggedIn()).toBeFalsy();
  });
});
