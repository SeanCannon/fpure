const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { curry, compose, pipe, identity, always, T, F, flip, apply, tap, juxt, once, memoize, converge } = require('../dist/index.js');

describe('function', () => {
  it('curry', () => {
    const add = curry((a, b) => a + b);
    assert.equal(add(1, 2), 3);
    assert.equal(add(1)(2), 3);
    const add1 = add(1);
    assert.equal(add1(2), 3);
  });

  it('compose', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    assert.equal(compose(add1, mul2)(5), 11);
    assert.equal(compose(mul2, add1)(5), 12);
  });

  it('pipe', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    assert.equal(pipe(add1, mul2)(5), 12);
    assert.equal(pipe(mul2, add1)(5), 11);
  });

  it('identity', () => {
    assert.equal(identity(5), 5);
    const obj = {};
    assert.equal(identity(obj), obj);
  });

  it('always', () => {
    const always42 = always(42);
    assert.equal(always42(), 42);
    assert.equal(always42('anything'), 42);
  });

  it('T', () => { assert.equal(T(), true); });
  it('F', () => { assert.equal(F(), false); });

  it('flip', () => {
    const sub = curry((a, b) => a - b);
    const flippedSub = flip(sub);
    assert.equal(flippedSub(3, 10), 7);
  });

  it('apply', () => {
    assert.equal(apply(x => x + 1, 5), 6);
  });

  it('tap', () => {
    const xs = [];
    const result = tap(x => xs.push(x), 42);
    assert.equal(result, 42);
    assert.deepEqual(xs, [42]);
  });

  it('juxt', () => {
    assert.deepEqual(juxt([x => x + 1, x => x * 2])(5), [6, 10]);
  });

  it('once', () => {
    let count = 0;
    const fn = once(() => ++count);
    assert.equal(fn(), 1);
    assert.equal(fn(), 1);
    assert.equal(count, 1);
  });

  it('memoize', () => {
    let count = 0;
    const fn = memoize(x => { count++; return x * 2; });
    assert.equal(fn(5), 10);
    assert.equal(fn(5), 10);
    assert.equal(count, 1);
  });

  it('converge', () => {
    const result = converge((a, b) => [a, b], [x => x * 2, x => x + 1])(5);
    assert.deepEqual(result, [10, 6]);
  });
});
