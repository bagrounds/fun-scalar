;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')

  /* exports */
  module.exports = [
    [[3], 3, 'rectify'],
    [[-2], 0, 'rectify'],
    [[-1], 0, 'rectify'],
    [[0 - Number.EPSILON, 0], false, 'eNear'],
    [[0 + Number.EPSILON, 0], false, 'eNear'],
    [[0.2 - 0.3 + 0.1, 0], true, 'eNear'],
    [[0.1, 1, 1.11], false, 'near'],
    [[0.1, 1, 0.89], false, 'near'],
    [[0.1, 1, 1.09], true, 'near'],
    [[0.1, 1, 0.91], true, 'near'],
    [[0], 0.5, 'sigmoid'],
    [[-Infinity], 0, 'sigmoid'],
    [[Infinity], 1, 'sigmoid'],
    [[7, 8], 1, 'threshold'],
    [[9, 8], 0, 'threshold'],
    [[9, 8], false, 'gte'],
    [[9, 9], true, 'gte'],
    [[7, 8], true, 'gte'],
    [[8, 9], false, 'lte'],
    [[9, 9], true, 'lte'],
    [[9, 8], true, 'lte'],
    [[9, 9], false, 'gt'],
    [[7, 8], true, 'gt'],
    [[9, 9], false, 'lt'],
    [[9, 8], true, 'lt'],
    [[9, 8], false, 'equal'],
    [[9, 9], true, 'equal'],
    [[2, -8], -8, 'min'],
    [[2, 8], 2, 'min'],
    [[2, -8], 2, 'max'],
    [[2, 8], 8, 'max'],
    [[2, 8], 64, 'exp'],
    [[2, 8], 3, 'log'],
    [[3, 12], 0, 'mod'],
    [[3, 11], 2, 'mod'],
    [[3, 10], 1, 'mod'],
    [[-4], 4, 'neg'],
    [[8], -8, 'neg'],
    [[8], 8, 'abs'],
    [[-9], 9, 'abs'],
    [[2, 3], 5, 'sum'],
    [[2, 3], 1, 'sub'],
    [[2, 3], 6, 'dot'],
    [[3, 6], 2, 'div']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equal,
      contra: object.get
    }))
    .map(funTest.sync)
})()

