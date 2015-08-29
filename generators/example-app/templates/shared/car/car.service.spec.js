'use strict';

describe('car service', function() {
  beforeEach(module('car.services'));

  var $httpBackend;
  var carService;
  var testCar;

  beforeEach(inject(function(_$httpBackend_, CarService) {
    $httpBackend = _$httpBackend_;
    carService = CarService;

    testCar = {id: 45684513, description: 'Test Desc'};
  }));

  it('should get a car', function() {
    var carResult;

    $httpBackend
        .expectGET('/_ah/api/car/v1/cars/' + testCar.id)
        .respond(testCar);
    carService.getCar({id: testCar.id}).then(function(car) {
      carResult = car;
    });
    $httpBackend.flush();

    expect(angular.equals(carResult, testCar)).toBeTruthy();
  });

  it('should create a car', function() {
    var carResult;

    $httpBackend
      .expectPOST('/_ah/api/car/v1/cars/' + testCar.id, testCar)
      .respond(testCar);
    carService.createCar(testCar).then(function(car) {
      carResult = car;
    });
    $httpBackend.flush();

    expect(angular.equals(carResult, testCar)).toBeTruthy();
  });

  it('should delete a car', function() {
    $httpBackend
        .expectDELETE('/_ah/api/car/v1/cars/' + testCar.id);
    carService.deleteCar(testCar);
  });

  it('should update a car', function() {
    var carResult;

    $httpBackend
        .expectPUT('/_ah/api/car/v1/cars/' + testCar.id, testCar)
        .respond(testCar);
    carService.updateCar(testCar).then(function(car) {
      carResult = car;
    });
    $httpBackend.flush();

    expect(angular.equals(carResult, testCar)).toBeTruthy();
  });

  it('should get all cars', function() {
    var testCars = {
      23463254: {id: 23463254, description: 'Test Desc 1'},
      323466: {id: 323466, description: 'Test Desc 2'}};
    var carsResult;
    var testCarsArray = Object.keys(testCars).map(function(key) {
      return testCars[key];
    });

    $httpBackend
        .when('GET', '/_ah/api/car/v1/cars')
        .respond({items: testCarsArray});
    carService.getAllCars().then(function(cars) {
      carsResult = cars;
    });
    $httpBackend.flush();

    expect(angular.equals(carsResult, testCars)).toBeTruthy();
  });
});
