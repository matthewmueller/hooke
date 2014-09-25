/**
 * Module Dependencies
 */

var Hooks = require('..');
var assert = require('assert');

/**
 * Tests
 */

describe('hook-ware', function() {

  it('should run the hooks based on events', function(done) {
    var hooks = Hooks();
    var called = 0;

    hooks.use('resolve', function(a, b, fn) {
      assert('a' == a);
      assert('b' == b);
      called++;
      fn();
    });

    hooks.use('resolve', function(a, b) {
      assert('a' == a);
      assert('b' == b);
      called++;
    });

    hooks.use('fetch', function(a, b) {
      called++;
    })

    hooks.run('resolve', 'a', 'b', function(err, a, b) {
      assert('a' == a);
      assert('b' == b);
      assert(2 == called);
      done();
    });
  });

  it('return a thunk if no callback passed', function(done) {
    var hooks = Hooks();
    var called = 0;

    hooks.use('resolve', function(a, b, fn) {
      assert('a' == a);
      assert('b' == b);
      called++;
      fn();
    });

    hooks.use('resolve', function(a, b) {
      assert('a' == a);
      assert('b' == b);
      called++;
    });

    hooks.use('fetch', function(a, b) {
      called++;
    })

    var run = hooks.run('resolve', 'a', 'b');

    run(function(err, a, b) {
      assert(!err);
      assert('a' == a);
      assert('b' == b);
      assert(2 == called);
      done();
    });

  })

  it('should work on unused hooks', function(done) {
    var hooks = Hooks();
    hooks.run('test', 'a', 'b', function(err, a, b) {
      assert(!err);
      assert('a' == a);
      assert('b' == b);
      done();
    })
  })

  it('should support hook methods', function(done) {
    var hooks = Hooks()
      .method('resolve')
      .method('fetch');

    var called = 0;

    hooks.resolve(function(a, b, fn) {
      assert('a' == a);
      assert('b' == b);
      called++;
      fn();
    });

    hooks.resolve(function(a, b) {
      assert('a' == a);
      assert('b' == b);
      called++;
    });

    hooks.fetch(function(a, b) {
      called++;
    });

    hooks.run('resolve', 'a', 'b', function(err, a, b) {
      assert('a' == a);
      assert('b' == b);
      assert(2 == called);
      done();
    });
  })

  it('should support static hook methods', function(done) {
    Hooks.method('install');

    var hooks = Hooks()
      .method('fetch');

    var called = 0;

    hooks.install(function(a, b, fn) {
      assert('a' == a);
      assert('b' == b);
      called++;
      fn();
    });

    hooks.install(function(a, b) {
      assert('a' == a);
      assert('b' == b);
      called++;
    });

    hooks.fetch(function(a, b) {
      called++;
    });

    hooks.run('install', 'a', 'b', function(err, a, b) {
      assert('a' == a);
      assert('b' == b);
      assert(2 == called);
      done();
    });
  })

});
