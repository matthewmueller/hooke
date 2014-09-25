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
 * @return {Hooks}
 * @api public
 */

function Hooks() {
  if (!(this instanceof Hooks)) return new Hooks();
  this.hooks = [];
}

/**
 * Add a hook
 *
 * @param {String} name
 * @param {String|Array|Ware} fn
 * @return {Hooks}
 * @api public
 */

Hooks.prototype.use = function(name, fn) {
  if (!this.hooks[name]) this.hooks[name] = Ware();
  this.hooks[name].use(fn);
  return this;
};

/**
 * Run the hooks
 *
 * @param {String} name
 * @param {Mixed, ...} args...
 * @param {Function} fn (optional)
 * @api public
 */

Hooks.prototype.run = yieldly(function(name) {
  var args = slice.call(arguments, 1);
  var hook = this.hooks[name] || Ware();
  hook.run.apply(hook, args);
  return this;
});
