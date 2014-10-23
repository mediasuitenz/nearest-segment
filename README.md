Nearest Segment
===============

[![NPM](https://nodei.co/npm/nearest-segment.png?downloads=true&stars=true)](https://nodei.co/npm/nearest-segment/)

[![Media Suite](http://mediasuite.co.nz/ms-badge.png)](http://mediasuite.co.nz)

[![Build Status](https://travis-ci.org/mediasuitenz/nearest-segment.svg)](https://travis-ci.org/mediasuitenz/nearest-segment)

Given a point like `[0.5, 1]`
and a line in the form of an array of coordinates like `[[0,0], [1, 1], [2, 2]]`
this module finds the nearest segment to the point within the array.
A segment is 2 adjacent points within the given coordinates.
This returns 2 indicies into the original coordinates array.

`npm install nearest-segment`

Example usage
```javascript
var getNearest = require('nearest-segment')

var coordinates = [[0,0], [1, 1], [2, 2]]

var segmentIndices = getNearest([0.5, 1], coordinates)
// = [0, 1]

var closestPoint1 = coordinates[segmentIndices[0]]
// = [0,0]

var closestPoint2 = coordinates[segmentIndices[1]]
// = [1, 1]
```
