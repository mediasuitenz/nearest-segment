'use strict';

var dist = require('vectors/dist')(2)
var copy = require('vectors/copy')(2)
var sub = require('vectors/sub')(2)
var normalize = require('vectors/normalize')(2)
var dot = require('vectors/dot')(2)

var assert = require('assert')
var POINT_ERR = '`point` must be an array of 2 numbers'
var COORDS_ERR = '`coords` must be an array of at least 2 points'

/**
 * Gets the index of the closest point to the given point
 * and the indices of the points either side (in the order they're given)
 * @param  array  coords   array of point arrays
 * @param  array  point    point to search with
 * @return object          with indices into the original coords array of
 *                         the closest, and 1 or both of prev and next
 */
function getClosestCoordIndices(coords, point) {

  var smallestDist
  var lastIndex
  var coordIndices = {}

  coords.forEach(function eachCoord(coord, i) {
    var d = dist(point, coord)
    if (!coords[coordIndices.closest] || d < smallestDist) {
      smallestDist = d
      coordIndices.prev = lastIndex
      coordIndices.closest = i
      coordIndices.next = undefined
    } else if (coords[coordIndices.closest] && !coords[coordIndices.next]) {
      coordIndices.next = i
    }
    lastIndex = i
  })

  return coordIndices
}

/**
 * Given 2 vectors, returns a normalised vector between them
 * @param  array from  point considered origin for the resultant vector
 * @param  array to    point the resultant vector points at
 * @return array       resultant unit vector
 */
function getUnitVector(from, to) {
  var vec = copy(to)
  vec = sub(vec, from)
  return normalize(vec)
}

/**
 * Gets the indicies into the given coords array of the nearest 2
 * points to the point given.
 * @param  array point  the point to search for closest points e.g. [1, 2]
 * @param  array coords the points to search within e.g. [[1.5, 2], [1, 3]]
 * @return array        the indices of the nearest 2 points e.g. [0, 1]
 */
module.exports = function getNearestSegment(point, coords) {
  assert(Array.isArray(point), POINT_ERR)
  assert.equal(point.length, 2, POINT_ERR)
  assert.equal(typeof point[0], 'number', POINT_ERR)
  assert.equal(typeof point[1], 'number', POINT_ERR)
  assert(Array.isArray(coords), COORDS_ERR)
  assert(coords.length >= 2, COORDS_ERR)

  var result = []
  var coordIndices = getClosestCoordIndices(coords, point)

  if (!coordIndices.next) {
    // Closest to last coords, so select last 2 coordIndices
    result = [coordIndices.prev, coordIndices.closest]
  } else if (!coordIndices.prev) {
    // Closest to first coords, so select first 2 coordIndices
    result = [coordIndices.closest, coordIndices.next]
  } else {
    // Somewhere in the middle, use dot product
    var closest = coords[coordIndices.closest]
    var uPrev = getUnitVector(closest, coords[coordIndices.prev])
    var uNext = getUnitVector(closest, coords[coordIndices.next])
    var uPoint = getUnitVector(closest, point)
    var prevDotPoint = dot(uPrev, uPoint)
    var nextDotPoint = dot(uNext, uPoint)

    if (prevDotPoint > nextDotPoint) {
      result = [coordIndices.prev, coordIndices.closest]
    } else {
      result = [coordIndices.closest, coordIndices.next]
    }
  }

  return result
}
