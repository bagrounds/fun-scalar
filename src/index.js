/**
 *
 * @module fun-scalar
 */
;(function () {
  'use strict'

  /* imports */
  const curry = require('fun-curry')

  /**
   *
   * @function module:fun-scalar.rectify
   *
   * @param {Number} x - number to rectify
   *
   * @return {Number} max(0, x)
   */
  const rectify = x => max(0, x)

  /**
   *
   * @function module:fun-scalar.eNear
   *
   * @param {Number} a - number to check b against
   * @param {Number} b - number to check against a
   *
   * @return {Boolean} if |a - b| < Number.EPSILON
   */
  const eNear = (a, b) => near(Number.EPSILON, a, b)

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
  const near = (delta, a, b) => Math.abs(a - b) < delta

  /**
   *
   * @function module:fun-scalar.sigmoid
   *
   * @param {Number} x - input to sigmoid function
   *
   * @return {Number} 1 / (1 + e^(-x))
   */
  const sigmoid = x => 1 / (1 + exp(-x, Math.E))

  /**
   *
   * @function module:fun-scalar.threshold
   *
   * @param {Number} t - threshold value
   * @param {Number} n - number to threshold
   *
   * @return {Number} n >= t ? 1 : 0
   */
  const threshold = (t, n) => n >= t ? 1 : 0

  /**
   *
   * @function module:fun-scalar.equal
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b === a
   */
  const equal = (a, b) => b === a

  /**
   *
   * @function module:fun-scalar.gte
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b >= a
   */
  const gte = (a, b) => b >= a

  /**
   *
   * @function module:fun-scalar.gt
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b > a
   */
  const gt = (a, b) => b > a

  /**
   *
   * @function module:fun-scalar.lte
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b <= a
   */
  const lte = (a, b) => b <= a

  /**
   *
   * @function module:fun-scalar.lt
   *
   * @param {Number} a - reference
   * @param {Number} b - subject
   *
   * @return {Boolean} if b < a
   */
  const lt = (a, b) => b < a

  /**
   *
   * @function module:fun-scalar.mod
   *
   * @param {Number} a - divisor
   * @param {Number} b - dividend
   *
   * @return {Number} b % a
   */
  const mod = (a, b) => b % a

  /**
   *
   * @function module:fun-scalar.sub
   *
   * @param {Number} a - subtrahend
   * @param {Number} b - minuend
   *
   * @return {Number} b - a
   */
  const sub = (a, b) => b - a

  /**
   *
   * @function module:fun-scalar.dot
   *
   * @param {Number} a - multiplier
   * @param {Number} b - multiplicand
   *
   * @return {Number} b * a
   */
  const mul = (a, b) => a * b

  /**
   *
   * @function module:fun-scalar.div
   *
   * @param {Number} a - divisor
   * @param {Number} b - dividend
   *
   * @return {Number} b / a
   */
  const div = (a, b) => b / a

  /**
   *
   * @function module:fun-scalar.sum
   *
   * @param {Number} a - summand
   * @param {Number} b - summand
   *
   * @return {Number} b + a
   */
  const add = (a, b) => a + b

  /**
   *
   * @function module:fun-scalar.exp
   *
   * @param {Number} a - exponent
   * @param {Number} b - base
   *
   * @return {Number} b ^ a
   */
  const exp = (a, b) => Math.pow(b, a)

  /**
   *
   * @function module:fun-scalar.log
   *
   * @param {Number} base - to use
   * @param {Number} argument - to use
   *
   * @return {Number} log_base(argument)
   */
  const log = (base, argument) => Math.log(argument) / Math.log(base)

  /**
   *
   * @function module:fun-scalar.max
   *
   * @param {Number} a - arg1
   * @param {Number} b - arg2
   *
   * @return {Number} a > b ? a : b
   */
  const max = (a, b) => a > b ? a : b

  /**
   *
   * @function module:fun-scalar.min
   *
   * @param {Number} a - arg1
   * @param {Number} b - arg2
   *
   * @return {Number} a < b ? a : b
   */
  const min = (a, b) => a < b ? a : b

  /**
   *
   * @function module:fun-scalar.abs
   *
   * @param {Number} a - number
   *
   * @return {Number} |a|
   */
  const abs = a => Math.abs(a)

  /**
   *
   * @function module:fun-scalar.neg
   *
   * @param {Number} a - number
   *
   * @return {Number} -a
   */
  const neg = a => 0 - a

  /* exports */
  const api = { abs, neg, add, sub, mul, div, mod, exp, log, max, min, lt, gt,
    lte, gte, equal, near, eNear, threshold, sigmoid, rectify }

  const set = (k, v, o) => Object.assign(o, { [k]: v })
  const map = (f, o) => Object.keys(o).reduce((r, k) => set(k, f(o[k]), r), {})

  module.exports = map(curry, api)
})()

