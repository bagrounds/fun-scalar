/**
 *
 * @module fun-scalar
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('fun-function')

  /* exports */
  module.exports = {
    abs: abs,
    neg: neg,
    sum: fn.curry(sum),
    sub: fn.curry(sub),
    dot: fn.curry(dot),
    div: fn.curry(div),
    mod: fn.curry(mod),
    exp: fn.curry(exp),
    log: fn.curry(log),
    max: fn.curry(max),
    min: fn.curry(min),
    lt: fn.curry(lt),
    gt: fn.curry(gt),
    lte: fn.curry(lte),
    gte: fn.curry(gte),
    equal: fn.curry(equal),
    near: fn.curry(near),
    eNear: fn.curry(eNear),
    threshold: fn.curry(threshold),
    sigmoid: sigmoid
  }

  /**
   *
   * @function module:fun-scalar.eNear
   *
   * @param {Number} a - number to check b against
   * @param {Number} b - number to check against a
   *
   * @return {Boolean} if |a - b| < Number.EPSILON
   */
  function eNear (a, b) {
    return near(Number.EPSILON, a, b)
  }

  /**
   *
   * @function module:fun-scalar.near
   *
   * @param {Number} delta - threshold for nearness
   * @param {Number} a - number to check b against
   * @param {Number} b - number to check against a
   *
   * @return {Boolean} if |a - b| < delta
   */
  function near (delta, a, b) {
    return Math.abs(a - b) < delta
  }

  /**
   *
   * @function module:fun-scalar.sigmoid
   *
   * @param {Number} x - input to sigmoid function
   *
   * @return {Number} 1 / (1 + e^(-x))
   */
  function sigmoid (x) {
    return 1 / (1 + exp(-x, Math.E))
  }

  /**
   *
   * @function module:fun-scalar.threshold
   *
   * @param {Number} t - threshold value
   * @param {Number} n - number to threshold
   *
   * @return {Number} n >= t ? 1 : 0
   */
  function threshold (t, n) {
    return n >= t ? 1 : 0
  }

  /**
   *
   * @function module:fun-scalar.equal
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b === a
   */
  function equal (a, b) {
    return b === a
  }

  /**
   *
   * @function module:fun-scalar.gte
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b >= a
   */
  function gte (a, b) {
    return b >= a
  }

  /**
   *
   * @function module:fun-scalar.gt
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b > a
   */
  function gt (a, b) {
    return b > a
  }

  /**
   *
   * @function module:fun-scalar.lte
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b <= a
   */
  function lte (a, b) {
    return b <= a
  }

  /**
   *
   * @function module:fun-scalar.lt
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b < a
   */
  function lt (a, b) {
    return b < a
  }

  /**
   *
   * @function module:fun-scalar.mod
   *
   * @param {Number} a - divisor
   * @param {Number} b - dividend
   *
   * @return {Number} b % a
   */
  function mod (a, b) {
    return b % a
  }

  /**
   *
   * @function module:fun-scalar.sub
   *
   * @param {Number} a - subtrahend
   * @param {Number} b - minuend
   *
   * @return {Number} b - a
   */
  function sub (a, b) {
    return b - a
  }

  /**
   *
   * @function module:fun-scalar.dot
   *
   * @param {Number} a - multiplier
   * @param {Number} b - multiplicand
   *
   * @return {Number} b * a
   */
  function dot (a, b) {
    return a * b
  }

  /**
   *
   * @function module:fun-scalar.div
   *
   * @param {Number} a - divisor
   * @param {Number} b - dividend
   *
   * @return {Number} b / a
   */
  function div (a, b) {
    return b / a
  }

  /**
   *
   * @function module:fun-scalar.sum
   *
   * @param {Number} a - summand
   * @param {Number} b - summand
   *
   * @return {Number} b + a
   */
  function sum (a, b) {
    return a + b
  }

  /**
   *
   * @function module:fun-scalar.exp
   *
   * @param {Number} a - exponent
   * @param {Number} b - base
   *
   * @return {Number} b ^ a
   */
  function exp (a, b) {
    return Math.pow(b, a)
  }

  /**
   *
   * @function module:fun-scalar.log
   *
   * @param {Number} base - to use
   * @param {Number} argument - to use
   *
   * @return {Number} log_base(argument)
   */
  function log (base, argument) {
    return Math.log(argument) / Math.log(base)
  }

  /**
   *
   * @function module:fun-scalar.max
   *
   * @param {Number} a - arg1
   * @param {Number} b - arg2
   *
   * @return {Number} a > b ? a : b
   */
  function max (a, b) {
    return a > b ? a : b
  }

  /**
   *
   * @function module:fun-scalar.min
   *
   * @param {Number} a - arg1
   * @param {Number} b - arg2
   *
   * @return {Number} a < b ? a : b
   */
  function min (a, b) {
    return a < b ? a : b
  }

  /**
   *
   * @function module:fun-scalar.abs
   *
   * @param {Number} a - number
   *
   * @return {Number} |a|
   */
  function abs (a) {
    return Math.abs(a)
  }

  /**
   *
   * @function module:fun-scalar.neg
   *
   * @param {Number} a - number
   *
   * @return {Number} -a
   */
  function neg (a) {
    return 0 - a
  }
})()

