const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { curry, compose, pipe, identity, always, T, F, flip, apply, tap, juxt, once, memoize, converge } = require('../dist/index.js');

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
