#!/usr/bin/env node
;(function () {
  'use strict'

  var predicate = require('fun-predicate')
  var child = require('child_process')
  var async = require('fun-async')
  var delegate = require('fun-delegate')
  var array = require('fun-array')
  var os = require('os')
  var fn = require('fun-function')
  var funCase = require('fun-case')
  var string = require('fun-string')
  var object = require('fun-object')

  var version = require('../package.json').version

  var semverStringToNumber = funCase([
    {
      p: predicate.match(/^\[PATCH\]/),
      f: fn.k(0)
    },
    {
      p: predicate.match(/^\[MINOR\]/),
      f: fn.k(1)
    },
    {
      p: predicate.match(/^\[MAJOR\]/),
      f: fn.k(2)
    }
  ])

  var argMax = fn.curry(function argMax (f, args) {
    return args[args.reduce(function (max, value, i) {
      return f(value) > f(max.value) ? { value: value, i: i } : max
    }, { value: args[0], i: 0 }).i]
  })

  var semverUpdateFromPartial = fn.composeAll([
    delegate('toLowerCase', []),
    array.get(1),
    delegate('match', [/^\[([^\]]+)]/]),
    argMax(semverStringToNumber)
  ])

  var NPM_PUBLISH = 'npm publish'
  var NPM_SET = 'npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN'
  var GIT_PUSH = 'git push origin master'
  var GIT_COMMIT = 'git commit -m "' + version + '"'
  var GIT_ADD = 'git add .'
  var GIT_SET_URL = 'git remote set-url --push origin ' +
    'https://bagrounds:$ACCESS_TOKEN@gitlab.com/bagrounds/fun-scalar.git'

  var semverUpdateFromGitLog = fn.composeAll([
    predicate.ifThenElse(
      fn.compose(predicate.truthy, object.get('length')),
      semverUpdateFromPartial,
      fn.k('none')
    ),
    array.filter(predicate.match(/^\[(MAJOR|MINOR|PATCH)\]/)),
    array.takeWhile(predicate.not(predicate.match(/^\d\.\d\.\d$/))),
    array.map(delegate('replace', [/^[^ ]+ /g, ''])),
    delegate('split', [os.EOL])
  ])

  var GIT_LOG = 'git log --oneline'

  var logNothing = fn.compose(
    async.of,
    fn.tee(fn.compose(console.log, fn.k('nothing to do')))
  )

  function runCommand (command) {
    return async.contramap(
      fn.tee(console.log),
      async.contramap(fn.k(command), fn.curry(child.exec, 2))
    )
  }

  var release = async.composeAll([
    runCommand(NPM_PUBLISH),
    runCommand(NPM_SET),
    runCommand(GIT_PUSH),
    runCommand(GIT_SET_URL),
    runCommand(GIT_COMMIT),
    runCommand(GIT_ADD),
    async.contramap(string.prepend('npm version '), fn.curry(child.exec, 2))
  ])

  var isSemver = array.map(predicate.equal, ['major', 'minor', 'patch'])
    .reduce(predicate.or, predicate.f)

  var maybeRelease = fn.curry(function maybeRelease (mmp, callback) {
    if (isSemver(mmp)) {
      release(mmp, callback)
      return
    }

    logNothing(mmp, callback)
  })

  main()

  function main () {
    fn.composeAll([
      async.compose(maybeRelease),
      async.map(semverUpdateFromGitLog),
      fn.curry(child.exec, 2)
    ])(GIT_LOG)(function CALLBACK (error, stdout, stderror) {
      if (error) {
        throw error
      }

      console.log('stdout: ' + stdout)
    })
  }
})()

