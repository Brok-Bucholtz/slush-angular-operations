'use strict';

describe('car controller', function() {
  beforeEach(module('car.controllers'));

  var $scope;
  var carCtrl;
  var mockCarService;
  var testCars;
  var testCar;

  beforeEach(inject(function($controller, $rootScope, $q) {
    $scope = $rootScope.$new();
    testCars = [{id: 0}, {id: 1}];
    testCar = {id: 3, description: 'Test Desc'};

    mockCarService = jasmine.createSpyObj('CarService', [
      'getAllCars',
      'updateCar',
      'createCar',
      'deleteCar']);
    mockCarService.getAllCars.and.returnValue($q.when(testCars));
    mockCarService.updateCar.and.returnValue($q.when(testCar));
    mockCarService.createCar.and.returnValue($q.when(testCar));

    carCtrl = $controller('CarCtrl', {
      $scope: $scope,
      CarService: mockCarService
    });
    $scope.$digest();
  }));

  it('should get all car data on load', function() {
    expect(carCtrl).toBeTruthy();
    expect(mockCarService.getAllCars).toHaveBeenCalled();
    expect($scope.isCarDataLoaded).toBeTruthy();
    expect($scope.cars).toBe(testCars);
  });

  it('should create a car', function() {
    $scope.carDescription = testCar.description;
    $scope.createCar(testCar);
    $scope.$digest();

    expect(mockCarService.createCar).toHaveBeenCalled();
    expect($scope.cars[testCar.id]).toBe(testCar);
  });

  it('should delete a car', function() {
    $scope.cars = [];
    $scope.cars[testCar.id] = testCar;
    $scope.deleteCar(testCar);
    $scope.$digest();

    expect(mockCarService.deleteCar).toHaveBeenCalled();
    expect(Object.keys($scope.cars).length).toBe(0);
  });

  it('should tell if object is empty', function() {
    expect($scope.util.isEmpty({})).toBeTruthy();
    expect($scope.util.isEmpty({key: 'Test Value'})).toBeFalsy();
  });
});
