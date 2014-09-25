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
      assert('a' == a);
      assert('b' == b);
      assert(2 == called);
      done();
    });

  })

});
