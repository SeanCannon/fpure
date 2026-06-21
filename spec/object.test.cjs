const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { keys, values, entries, has, path, pathOr, prop, propOr, props, assoc, assocPath, dissoc, dissocPath, merge, mergeAll, pick, omit, where, whereEq, evolve, applySpec, lensProp, lensPath, lensIndex, over, set, view } = require('../dist/index.js');

describe('object', () => {
  it('keys', () => { assert.deepEqual(keys({ a: 1, b: 2 }), ['a', 'b']); });
  it('values', () => { assert.deepEqual(values({ a: 1, b: 2 }), [1, 2]); });
  it('entries', () => { assert.deepEqual(entries({ a: 1, b: 2 }), [['a', 1], ['b', 2]]); });
  it('has', () => { assert.equal(has('a', { a: 1 }), true); assert.equal(has('b', { a: 1 }), false); });
  it('path', () => { assert.equal(path(['a', 'b'], { a: { b: 42 } }), 42); assert.equal(path(['a', 'c'], { a: { b: 42 } }), undefined); });
  it('pathOr', () => { assert.equal(pathOr(99, ['a', 'b'], { a: { b: 42 } }), 42); assert.equal(pathOr(99, ['a', 'c'], { a: { b: 42 } }), 99); });
  it('prop', () => { assert.equal(prop('a', { a: 42 }), 42); });
  it('propOr', () => { assert.equal(propOr(99, 'a', { a: 42 }), 42); assert.equal(propOr(99, 'b', { a: 42 }), 99); });
  it('props', () => { assert.deepEqual(props(['a', 'b'], { a: 1, b: 2, c: 3 }), [1, 2]); });
  it('assoc', () => { assert.deepEqual(assoc('b', 2, { a: 1 }), { a: 1, b: 2 }); });
  it('assocPath', () => { assert.deepEqual(assocPath(['a', 'b'], 42, {}), { a: { b: 42 } }); });
  it('dissoc', () => {
    const result = dissoc('a', { a: 1, b: 2, c: 3 });
    assert.deepEqual(result, { b: 2, c: 3 });
    assert.equal('a' in result, false);
  });
  it('dissocPath', () => { assert.deepEqual(dissocPath(['a', 'b'], { a: { b: 1, c: 2 }, d: 3 }), { a: { c: 2 }, d: 3 }); });
  it('merge', () => { assert.deepEqual(merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 }); });
  it('mergeAll', () => { assert.deepEqual(mergeAll([{ a: 1 }, { b: 2 }]), { a: 1, b: 2 }); });
  it('pick', () => { assert.deepEqual(pick(['a', 'c'], { a: 1, b: 2, c: 3 }), { a: 1, c: 3 }); });
  it('omit', () => { assert.deepEqual(omit(['a', 'c'], { a: 1, b: 2, c: 3 }), { b: 2 }); });
  it('where', () => {
    const pred = where({ a: x => x > 0, b: x => x.length > 1 });
    assert.equal(pred({ a: 5, b: 'hello' }), true);
    assert.equal(pred({ a: 0, b: 'x' }), false);
  });
  it('whereEq', () => {
    const pred = whereEq({ a: 1 });
    assert.equal(pred({ a: 1, b: 2 }), true);
    assert.equal(pred({ a: 2, b: 2 }), false);
  });
  it('evolve', () => {
    assert.deepEqual(evolve({ a: x => x * 2 }, { a: 5, b: 10 }), { a: 10, b: 10 });
  });
  it('applySpec', () => {
    assert.deepEqual(applySpec({ sum: (...xs) => xs.reduce((a, b) => a + b, 0), max: (...xs) => Math.max(...xs) })(1, 2, 3), { sum: 6, max: 3 });
  });

  describe('lenses', () => {
    it('lensProp', () => {
      const obj = { a: 1, b: 2 };
      const l = lensProp('a');
      assert.equal(view(l, obj), 1);
      assert.deepEqual(set(l, 42, obj), { a: 42, b: 2 });
      assert.deepEqual(over(l, x => x + 1, obj), { a: 2, b: 2 });
      assert.equal(obj.a, 1);
    });
    it('lensPath', () => {
      const obj = { a: { b: { c: 42 } } };
      const l = lensPath(['a', 'b', 'c']);
      assert.equal(view(l, obj), 42);
      assert.deepEqual(set(l, 99, obj), { a: { b: { c: 99 } } });
    });
    it('lensIndex', () => {
      const arr = [10, 20, 30];
      const l = lensIndex(1);
      assert.equal(view(l, arr), 20);
      assert.deepEqual(set(l, 99, arr), [10, 99, 30]);
    });
  });
});
