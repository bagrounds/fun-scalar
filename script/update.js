#!/usr/bin/env node
;(function () {
  'use strict'

  const predicate = require('fun-predicate')
  const child = require('child_process')
  const async = require('fun-async')
  const delegate = require('fun-delegate')
  const array = require('fun-array')
  const os = require('os')
  const fn = require('fun-function')
  const funCase = require('fun-case')
  const string = require('fun-string')
  const object = require('fun-object')

  const tee = fn.curry((...args) => {
    console.log(`tee args(${args.length}): ${JSON.stringify(args)}`)
    args[0](args[1])
    return args[1]
  }, 2)

  const log = tee(console.log)

  const semverStringToNumber = funCase([
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

  const argMax = fn.curry(
    (f, args) => args[
      args.reduce(
        (max, value, i) => f(value) > f(max.value)
          ? { value: value, i: i }
          : max,
        { value: args[0], i: 0 }
      ).i
    ]
  )

  const semverUpdateFromPartial = fn.composeAll([
    delegate('toLowerCase', []),
    array.get(1),
    delegate('match', [/^\[([^\]]+)]/]),
    argMax(semverStringToNumber)
  ])

  const REPO = 'https://bagrounds:$ACCESS_TOKEN' +
    '@gitlab.com/bagrounds/fun-scalar.git'

  const NPM_PUBLISH = 'npm publish'
  const NPM_SET = 'npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN'
  const GIT_PUSH = 'git push origin master'
  const GIT_SET_URL = `git remote set-url --push origin ${REPO}`
  const GIT_CHECKOUT_MASTER = 'git checkout master'
  const GIT_LOG = 'git log --oneline'
  const PREFIX = `${GIT_CHECKOUT_MASTER} && npm version `

  const semverUpdateFromGitLog = fn.composeAll([
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

  const logNothing = fn.compose(
    async.of,
    tee(fn.compose(console.log, fn.k('nothing to do')))
  )

  const exec = fn.curry(child.exec, 2)

  const runCommand = command => async.contramap(
    log,
    async.contramap(fn.k(command), exec)
  )

  const release = async.composeAll([
    runCommand(NPM_PUBLISH),
    runCommand(NPM_SET),
    runCommand(GIT_PUSH),
    runCommand(GIT_SET_URL),
    async.contramap(string.prepend(PREFIX), exec)
  ])

  const isSemver = array.map(predicate.equal, ['major', 'minor', 'patch'])
    .reduce(predicate.or, predicate.f)

  const handleResults = (error, stdout, stderror) => {
    if (error) throw error

    if (stdout) console.log('stdout: ' + stdout)
    if (stderror) console.error('stderror: ' + stderror)
  }

  const main = () => fn.composeAll([
    async.compose(predicate.ifThenElse(isSemver, release, logNothing)),
    async.map(semverUpdateFromGitLog),
    exec
  ])(GIT_LOG)(handleResults)

  main()
})()

