/**
 * Module Dependencies
 */

var yieldly = require('yieldly');
var Ware = require('ware');
var slice = [].slice;

/**
 * Export `Hooks`
 */

module.exports = Hooks;

/**
 * Initialize `Hooks`
 *
 * @param {Object} obj (optional)
 * @return {Hooks}
 * @api public
 */

function Hooks(obj) {
  if (obj) return mixin(obj);
  else if (!(this instanceof Hooks)) return new Hooks();
  this._hooks = {};
}

/**
 * Mixin the hook properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Hooks.prototype) {
    obj[key] = Hooks.prototype[key];
  }
  return obj;
}

/**
 * Add a hook `event` with `fn`
 *
 * @param {String} event
 * @param {Function|Generator|Array|Ware} fn
 * @return {Hooks}
 * @api public
 */

Hooks.prototype.hook = function(event, fn) {
  this._hooks = this._hooks || {};
  (this._hooks[event] = this._hooks[event] || Ware()).use(fn);
  return this;
};

/**
 * Trigger `event` with the given args
 * and callback fn
 *
 * @param {String} event
 * @param {Mixed, ...} args...
 * @param {Function} fn (optional)
 * @return {Hooks}
 * @api public
 */

Hooks.prototype.trigger = yieldly(function(event) {
  this._hooks = this._hooks || {};
  var args = slice.call(arguments, 1);
  var hook = this._hooks[event] || Ware();
  hook.run.apply(hook, args);
  return this;
});

/**
 * Hooks
 *
 * @param {String} event
 * @return {Ware}
 * @api public
 */

Hooks.prototype.hooks = function(event) {
  this._hooks = this._hooks || {};
  return this._hooks[event] || Ware();
}

/**
 * Unhook
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Hooks}
 * @api public
 */

Hooks.prototype.unhook = function(event, fn) {
  this._hooks = this._hooks || {};
  // TODO
}
