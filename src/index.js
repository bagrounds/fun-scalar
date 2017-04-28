/**
 *
 * @module fun-scalar
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('fun-curry')

  /* exports */
  module.exports = {
    abs: abs,
    neg: neg,
    sum: curry(sum),
    sub: curry(sub),
    dot: curry(dot),
    div: curry(div),
    mod: curry(mod),
    exp: curry(exp),
    log: curry(log),
    max: curry(max),
    min: curry(min)
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

