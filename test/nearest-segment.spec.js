'use strict';

var chai = require('chai')
chai.should()
var catchError = require('catch-error')

var nearestSegment = require('../index.js')


describe('nearestSegment', function () {

  describe('nearest is first point', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [3, 5]
    })
    And('some coordinates', function () {
      coords = [[4, 5], [6, 5], [8, 5], [9, 4], [9, 3]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the first and second index', function () {
      result[0].should.equal(0)
      result[1].should.equal(1)
    })
  })

  describe('somewhere near the middle but off a bit', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [6.5, 7]
    })
    And('some coordinates', function () {
      coords = [[4, 5], [6, 5], [8, 5], [9, 4], [9, 3]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the second and third index', function () {
      result[0].should.equal(1)
      result[1].should.equal(2)
    })
  })

  describe('point is same as one of the coordinates', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [8, 5]
    })
    And('some coordinates', function () {
      coords = [[4, 5], [6, 5], [8, 5], [9, 4], [9, 3]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the third and fourth index', function () {
      result[0].should.equal(2)
      result[1].should.equal(3)
    })
  })

  describe('point is before closest coordinate', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [5.5, 5]
    })
    And('some coordinates', function () {
      coords = [[2, 5], [4, 5], [6, 5], [8, 5], [10, 5]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the second and third index', function () {
      result[0].should.equal(1)
      result[1].should.equal(2)
    })
  })

  describe('point is before closest which is second', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [3.5, 5]
    })
    And('some coordinates', function () {
      coords = [[2, 5], [4, 5], [6, 5], [8, 5], [10, 5]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the first and second index', function () {
      result[0].should.equal(0)
      result[1].should.equal(1)
    })
  })

  describe('point is after closest coordinate', function () {
    var point
    var coords
    var result

    Given('a point', function () {
      point = [6.5, 5]
    })
    And('some coordinates', function () {
      coords = [[2, 5], [4, 5], [6, 5], [8, 5], [10, 5]]
    })
    When('we call the service', function () {
      result = nearestSegment(point, coords)
    })
    Then('the result should be an array', function () {
      result.should.be.an('array')
    })
    And('the result should be the third and fourth index', function () {
      result[0].should.equal(2)
      result[1].should.equal(3)
    })
  })

  describe('point is not valid', function () {
    var point
    var coords
    var error

    Given('an invalid point', function () {
      point = [1, 'hi']
    })
    And('some coordinates', function () {
      coords = [[2, 5], [4, 5], [6, 5], [8, 5], [10, 5]]
    })
    When('we call the service', function () {
      error = catchError({ func: nearestSegment, args:[point, coords] })
    })
    Then('an error should be thrown', function () {
      error.should.be.an.instanceof(Error)
    })
  })

  describe('point is not valid', function () {
    var point
    var coords
    var error

    Given('a point', function () {
      point = [1, 2]
    })
    And('invalid coordinates', function () {
      coords = [[2, 5]]
    })
    When('we call the service', function () {
      error = catchError({ func: nearestSegment, args:[point, coords] })
    })
    Then('an error should be thrown', function () {
      error.should.be.an.instanceof(Error)
    })
  })

})
