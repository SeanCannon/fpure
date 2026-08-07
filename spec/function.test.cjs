const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { curry, compose, pipe, identity, always, T, F, flip, apply, tap, juxt, once, memoize, converge, applyTo, ascend, ascendNatural, bind, call, comparator, composeWith, curryN, descend, descendNatural, flow, invoker, lift, liftN, memoizeWith, nAry, nthArg, o, of, on, otherwise, partial, partialRight, pipeWith, promap, thunkify, tryCatch, unapply, unary, uncurryN, useWith } = require('../dist/index.js');

describe('curry', () => {
  it('returns a curried function that can be partially applied with any number of arguments', () => {
    const add = curry((a, b) => a + b);
    assert.equal(add(1, 2), 3);
    assert.equal(add(1)(2), 3);
    const add1 = add(1);
    assert.equal(add1(2), 3);
  });
});

describe('compose', () => {
  it('applies functions right-to-left, passing each result to the next', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    assert.equal(compose(add1, mul2)(5), 11);
    assert.equal(compose(mul2, add1)(5), 12);
  });
});

describe('pipe', () => {
  it('applies functions left-to-right, passing each result to the next', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    assert.equal(pipe(add1, mul2)(5), 12);
    assert.equal(pipe(mul2, add1)(5), 11);
  });
});

describe('identity', () => {
  it('returns the value it receives unchanged', () => {
    assert.equal(identity(5), 5);
    const obj = {};
    assert.equal(identity(obj), obj);
  });
});

describe('always', () => {
  it('creates a function that always returns the given value regardless of arguments', () => {
    const always42 = always(42);
    assert.equal(always42(), 42);
    assert.equal(always42('anything'), 42);
  });
});

describe('T', () => {
  it('always returns true', () => { assert.equal(T(), true); });
});

describe('F', () => {
  it('always returns false', () => { assert.equal(F(), false); });
});

describe('flip', () => {
  it('swaps the first two arguments of a function', () => {
    const sub = curry((a, b) => a - b);
    const flippedSub = flip(sub);
    assert.equal(flippedSub(3, 10), 7);
  });
});

describe('apply', () => {
  it('applies a function to an argument', () => {
    assert.equal(apply(x => x + 1, 5), 6);
  });
});

describe('tap', () => {
  it('executes a side-effect function and returns the original value', () => {
    const xs = [];
    const result = tap(x => xs.push(x), 42);
    assert.equal(result, 42);
    assert.deepEqual(xs, [42]);
  });
});

describe('juxt', () => {
  it('applies each function in a list to the same arguments and returns an array of results', () => {
    assert.deepEqual(juxt([x => x + 1, x => x * 2])(5), [6, 10]);
  });
});

describe('once', () => {
  it('only calls the wrapped function once, caching the result for subsequent calls', () => {
    let count = 0;
    const fn = once(() => ++count);
    assert.equal(fn(), 1);
    assert.equal(fn(), 1);
    assert.equal(count, 1);
  });
});

describe('memoize', () => {
  it('caches results by argument, only recomputing for new arguments', () => {
    let count = 0;
    const fn = memoize(x => { count++; return x * 2; });
    assert.equal(fn(5), 10);
    assert.equal(fn(5), 10);
    assert.equal(count, 1);
  });
});

describe('converge', () => {
  it('feeds arguments to multiple branch functions and passes the results to a combining function', () => {
    const result = converge((a, b) => [a, b], [x => x * 2, x => x + 1])(5);
    assert.deepEqual(result, [10, 6]);
  });
});

describe('applyTo', () => {
  it('applies a function to a value (data-first)', () => {
    assert.equal(applyTo(5, x => x + 1), 6);
  });
});

describe('ascend', () => {
  it('creates an ascending comparator from a transform', () => {
    const byAge = ascend(x => x.age);
    assert.equal(byAge({ age: 20 }, { age: 30 }), -1);
    assert.equal(byAge({ age: 30 }, { age: 20 }), 1);
    assert.equal(byAge({ age: 25 }, { age: 25 }), 0);
  });
});

describe('ascendNatural', () => {
  it('sorts strings ascending with localeCompare', () => {
    const cmp = ascendNatural('en');
    assert.equal(cmp('a', 'b'), -1);
    assert.equal(cmp('b', 'a'), 1);
  });
});

describe('bind', () => {
  it('binds a function to a context', () => {
    const obj = { x: 42 };
    const fn = function() { return this.x; };
    const bound = bind(fn, obj);
    assert.equal(bound(), 42);
  });
});

describe('call', () => {
  it('calls a function with given arguments', () => {
    const result = call((a, b) => a + b, 3, 4);
    assert.equal(result, 7);
  });
});

describe('comparator', () => {
  it('creates a comparator from a predicate', () => {
    const gt = comparator((a, b) => a > b);
    assert.equal(gt(5, 3), -1);
    assert.equal(gt(3, 5), 1);
    assert.equal(gt(4, 4), 0);
  });
});

describe('composeWith', () => {
  it('composes functions with a custom transformer', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    const trace = (f, g) => x => f(g(x));
    assert.equal(composeWith(trace, [add1, mul2])(5), 11);
  });
});

describe('curryN', () => {
  it('curries a function to a specific arity', () => {
    const fn = (a, b, c) => a + b + c;
    const curried = curryN(3, fn);
    assert.equal(curried(1, 2, 3), 6);
    assert.equal(curried(1)(2, 3), 6);
  });
});

describe('descend', () => {
  it('creates a descending comparator from a transform', () => {
    const byAge = descend(x => x.age);
    assert.equal(byAge({ age: 20 }, { age: 30 }), 1);
    assert.equal(byAge({ age: 30 }, { age: 20 }), -1);
    assert.equal(byAge({ age: 25 }, { age: 25 }), 0);
  });
});

describe('descendNatural', () => {
  it('sorts strings descending with localeCompare', () => {
    const cmp = descendNatural('en');
    assert.equal(cmp('a', 'b'), 1);
    assert.equal(cmp('b', 'a'), -1);
  });
});

describe('flow', () => {
  it('composes async functions left-to-right', async () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    const result = await flow(add1, mul2)(5);
    assert.equal(result, 12);
  });
});

describe('invoker', () => {
  it('invokes a named method on an object', () => {
    const obj = { foo: (x, y) => x + y };
    assert.equal(invoker('foo', obj, 3, 4), 7);
  });
});

describe('lift', () => {
  it('lifts a binary function to work on arrays', () => {
    const result = lift((a, b) => a + b, [1, 2], [10, 20]);
    assert.deepEqual(result, [11, 21, 12, 22]);
  });
});

describe('liftN', () => {
  it('lifts a function with a specific arity', () => {
    const result = liftN(2, (a, b) => a + b, [1, 2], [10, 20]);
    assert.deepEqual(result, [11, 21, 12, 22]);
  });
});

describe('memoizeWith', () => {
  it('memoizes with a custom key function', () => {
    let count = 0;
    const fn = memoizeWith(x => String(x), x => { count++; return x * 2; });
    assert.equal(fn(5), 10);
    assert.equal(fn(5), 10);
    assert.equal(count, 1);
  });
});

describe('nAry', () => {
  it('limits a function to n arguments', () => {
    const fn = nAry(2, (...args) => args);
    assert.deepEqual(fn(1, 2, 3, 4), [1, 2]);
  });
});

describe('nthArg', () => {
  it('returns the nth argument', () => {
    const first = nthArg(0);
    const second = nthArg(1);
    assert.equal(first('a', 'b', 'c'), 'a');
    assert.equal(second('a', 'b', 'c'), 'b');
  });
});

describe('o', () => {
  it('composes two unary functions right-to-left', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    assert.equal(o(add1, mul2)(5), 11);
  });
});

describe('of', () => {
  it('wraps a value in an array', () => {
    assert.deepEqual(of(5), [5]);
  });
});

describe('on', () => {
  it('applies a binary function to values transformed by a unary function', () => {
    const cmp = on((a, b) => a - b, x => x.length);
    assert.equal(cmp('hello', 'world'), 0);
  });
});

describe('otherwise', () => {
  it('handles promise rejection', async () => {
    const result = await otherwise(err => 'caught', Promise.reject(new Error('fail')));
    assert.equal(result, 'caught');
  });
});

describe('partial', () => {
  it('partially applies arguments from the left', () => {
    const add = (a, b, c) => a + b + c;
    const add5 = partial(add, 2, 3);
    assert.equal(add5(4), 9);
  });
});

describe('partialRight', () => {
  it('partially applies arguments from the right', () => {
    const div = (a, b) => a / b;
    const divide10 = partialRight(div, 2);
    assert.equal(divide10(10), 5);
  });
});

describe('pipeWith', () => {
  it('pipes functions left-to-right with a custom transformer', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    const trace = (f, g) => x => g(f(x));
    assert.equal(pipeWith(trace, [add1, mul2])(5), 12);
  });
});

describe('promap', () => {
  it('maps over domain and codomain of a function', () => {
    const fn = promap(x => x + 1, x => x * 2)(x => x + 10);
    assert.equal(fn(5), 32);
  });
});

describe('thunkify', () => {
  it('wraps a function so it defers execution', () => {
    const add = (a, b) => a + b;
    const thunk = thunkify(add)(3, 4);
    const result = thunk();
    assert.equal(result, 7);
  });
});

describe('tryCatch', () => {
  it('catches exceptions from the tryer', () => {
    const result = tryCatch(x => { throw new Error('fail'); }, err => 'caught', null);
    assert.equal(result, 'caught');
  });

  it('returns the tryer result when no error occurs', () => {
    const result = tryCatch(x => x + 1, err => 0, 5);
    assert.equal(result, 6);
  });
});

describe('unapply', () => {
  it('spreads an array argument into a function', () => {
    const sum = unapply((a, b, c) => a + b + c);
    assert.equal(sum([1, 2, 3]), 6);
  });
});

describe('unary', () => {
  it('wraps a function to only accept 1 argument', () => {
    const fn = unary((...args) => args);
    assert.deepEqual(fn(1, 2, 3), [1]);
  });
});

describe('uncurryN', () => {
  it('uncurries a curried function', () => {
    const add = a => b => a + b;
    const uncurried = uncurryN(2, add);
    assert.equal(uncurried(1, 2), 3);
  });
});

describe('useWith', () => {
  it('spreads transformed arguments to a function', () => {
    const result = useWith((a, b) => a + b, [x => x * 2, x => x + 1], 5, 10);
    assert.equal(result, 21);
  });
});

describe('liftN empty arrays', () => {
  it('returns empty array when no arrays provided', () => {
    const result = liftN(2, (a, b) => a + b);
    assert.deepEqual(result, []);
  });
});
