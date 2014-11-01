/**
 * Module Dependencies
 */

var Hooks = require('..');
var assert = require('assert');

/**
 * Tests
 */

describe('hooke', function() {

  describe('mixin', function() {
    it('should support mixins', function (done) {
      var called = 0;
      var obj = {};
      Hooks(obj);

      obj.hook('resolve', function(a, b) {
        assert('a' == a);
        assert('b' == b);
        called++;
      });

      obj.hook('resolve', function(a, b) {
        assert('a' == a);
        assert('b' == b);
        called++;
      });

      obj.trigger('resolve', 'a', 'b', function(err, a, b) {
        assert(!err);
        assert('a' == a);
        assert('b' == b);
        assert(2 == called);
        done();
      });
    });
  })

  describe('standalone', function() {
    it('should run the hooks based on events', function(done) {
      var hooks = Hooks();
      var called = 0;

      hooks.hook('resolve', function(a, b, fn) {
        assert('a' == a);
        assert('b' == b);
        called++;
        fn();
      });

      hooks.hook('resolve', function(a, b) {
        assert('a' == a);
        assert('b' == b);
        called++;
      });

      hooks.hook('fetch', function(a, b) {
        called++;
      })

      hooks.trigger('resolve', 'a', 'b', function(err, a, b) {
        assert(!err);
        assert('a' == a);
        assert('b' == b);
        assert(2 == called);
        done();
      });
    });

    it('return a thunk if no callback passed', function(done) {
      var hooks = Hooks();
      var called = 0;

      hooks.hook('resolve', function(a, b, fn) {
        assert('a' == a);
        assert('b' == b);
        called++;
        fn();
      });

      hooks.hook('resolve', function(a, b) {
        assert('a' == a);
        assert('b' == b);
        called++;
      });

      hooks.hook('fetch', function(a, b) {
        called++;
      })

      var trigger = hooks.trigger('resolve', 'a', 'b');

      var h = trigger(function(err, a, b) {
        assert(!err);
        assert('a' == a);
        assert('b' == b);
        assert(2 == called);
        done();
      });

      assert(h == hooks);
    })

    it('should work on unused hooks', function(done) {
      var hooks = Hooks();
      hooks.trigger('test', 'a', 'b', function(err, a, b) {
        assert(!err);
        assert('a' == a);
        assert('b' == b);
        done();
      })
    })
  })

});
