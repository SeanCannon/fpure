'use strict';

// Internal
const _compose  = (f, g) => (...args) => f(g(...args));
const _composeP = (f, g) => (...args) => g(...args).then(f);
const _curry    = (fn, ...args) => args.length === fn.length ? fn(...args) : _curry.bind(null, fn, ...args);
const _sort     = (fn, arr) => Array.from(arr).sort(fn);

// Object
const has    = _curry((o, k) => Object.prototype.hasOwnProperty.call(o, k));
const keys   = o => Object.keys(o);
const prop   = _curry((k, o) => o[k]);
const propOr = _curry((a, k, o) => o[k] || a);

// List
const sort     = _curry(_sort);
const asc      = arr => _sort((a, b) => a - b, arr);
const desc     = arr => _sort((a, b) => b - a, arr);
const adjust   = _curry((fn, i, arr) => arr.map((n, _i) => _i === i ? fn(n) : n));
const all      = _curry((fn, arr) => arr.every(fn));
const any      = _curry((fn, arr) => arr.some(fn));
const aperture = _curry((n, arr) => [...Array(arr.length - (n - 1)).keys()].map((_, i) => arr.slice(i, i + n)));
const append   = _curry((a, arr) => [...arr, a]);
const chain    = _curry((fn, arr) => [...arr].map(fn).reduce((a, b) => a.concat(b)));
const concat   = _curry((a, b) => a.concat(b));

// Math
const add      = _curry((a, b) => a + b);
const subtract = _curry((a, b) => a - b);
const multiply = _curry((a, b) => a * b);
const divide   = _curry((a, b) => a / b);
const mod      = _curry((a, b) => a % b);
const mathMod  = _curry((a, b) => (-a % b + b) % b);
const inc      = a => a + 1;
const dec      = a => a - 1;
const sum      = arr => arr.reduce(add);
const product  = arr => arr.reduce(multiply);
const mean     = arr => sum(arr) / arr.length;
const median   = arr => { const a = asc(arr); return (a[(a.length - 1) >> 1] + a[a.length >> 1]) / 2; };
const negate   = a => a * -1;

// Function
const compose  = _curry((...fns) => fns.reduce(_compose));
const composeP = _curry((...fns) => fns.reduce(_composeP));
const pipe     = _curry((...fns) => fns.reduceRight(_compose));
const pipeP    = _curry((...fns) => fns.reduceRight(_composeP));
const identity = a => a;

// Type
const type = a => Object.prototype.toString.call(a).slice(8, -1);

// Relational
const identical = _curry((a, b) => a === b ? (a !== 0 || 1 / a === 1 / b) : (a !== a && b !== b));

//
// // view :: Lens s a -> s -> a
// const view = _curry((lens, x) => compose(getConst, lens(Const.of))(x));
//
// // over :: Lens s a -> (a -> a) -> s -> s
// const over = _curry((lens, f, x) => compose(runIdentity, lens(compose( Identity.of, f )))(x));
//
// // set :: Lens s a -> a -> s -> s
// const set = _curry((lens, v, x) => over(lens, K(v), x));
