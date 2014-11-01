
# Hooke

  A hook system using [ware](http://github.com/segmentio/ware) for the browser and server.

  Hooke is gracefully handles generators when you're in an environment that supports them.

## Example

```js
var Hook = require('hooke');
var obj = {};

Hook(obj);

obj.hook('resolve', fn);
obj.hook('resolve', gen);

obj.trigger('resolve', a, b, done);
```

Or with generators:

```js
var hooks = Hooks();

// add the hooks
hooks.use('resolve', fn);
hooks.use('resolve', fn);
hooks.use('fetch', fn);

// run the "fetch" hook
yield hooks.run('fetch', 'a', 'b');
```

## Installation

Node:

```bash
$ npm install hooke
```

Browser (with [Duo](http://duojs.org)):

```js
var hooks = require('matthewmueller/hooke');
```

## API

### `Hooks()`

Initialize `hooke`.

### `Hooks.hook(event, fn|gen)`

Add a hook to the plugin `name`. The `fn` can be a synchronous, asynchronous, generator function, or anything else that [ware](http://github.com/segmentio/ware) supports.

### `Hooks.trigger(event[, args, ...], [done])`

Trigger an event. Analagous to `Emitter.emit(...)`. Pass a variable number of `args`. Optionally pass a `done` function. Without a function `trigger` returns a generator you can yield on.

### `Hooks.hook(event)`

Get the hooks for an event

### `Hooks.unhook([event], [fn|gen])`

TODO. Will work the same way as `Emitter.off(...)`

## Test

```bash
npm install
make test
```

## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
