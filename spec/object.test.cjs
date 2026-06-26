const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { keys, values, entries, has, path, pathOr, prop, propOr, props, assoc, assocPath, dissoc, dissocPath, merge, mergeAll, mergeDeepRight, mergeLeft, mergeRight, pick, pickBy, omit, omitBy, where, whereEq, evolve, applySpec, lens, lensProp, lensPath, lensIndex, over, set, view } = require('../dist/index.js');

describe('keys', () => {
  it('returns the keys of an object', () => {
    assert.deepEqual(keys({ a: 1, b: 2 }), ['a', 'b']);
  });
});

describe('values', () => {
  it('returns the values of an object', () => {
    assert.deepEqual(values({ a: 1, b: 2 }), [1, 2]);
  });
});

describe('entries', () => {
  it('returns the entries of an object as [key, value] pairs', () => {
    assert.deepEqual(entries({ a: 1, b: 2 }), [['a', 1], ['b', 2]]);
  });
});

describe('has', () => {
  it('returns true for own properties that exist', () => {
    assert.equal(has('a', { a: 1 }), true);
  });

  it('returns false for properties that do not exist', () => {
    assert.equal(has('b', { a: 1 }), false);
  });
});

describe('path', () => {
  it('returns the value at the given path', () => {
    assert.equal(path(['a', 'b'], { a: { b: 42 } }), 42);
  });

  it('returns undefined when the path does not exist', () => {
    assert.equal(path(['a', 'c'], { a: { b: 42 } }), undefined);
  });

  it('returns undefined when a null is encountered in the chain', () => {
    assert.equal(path(['a', 'b'], { a: null }), undefined);
  });
});

describe('pathOr', () => {
  it('returns the value at the path when it exists', () => {
    assert.equal(pathOr(99, ['a', 'b'], { a: { b: 42 } }), 42);
  });

  it('returns the default value when the path does not exist', () => {
    assert.equal(pathOr(99, ['a', 'c'], { a: { b: 42 } }), 99);
  });
});

describe('prop', () => {
  it('returns the value for the given key', () => {
    assert.equal(prop('a', { a: 42 }), 42);
  });
});

describe('propOr', () => {
  it('returns the value when the key exists', () => {
    assert.equal(propOr(99, 'a', { a: 42 }), 42);
  });

  it('returns the default value when the key does not exist', () => {
    assert.equal(propOr(99, 'b', { a: 42 }), 99);
  });
});

describe('props', () => {
  it('returns values for multiple keys', () => {
    assert.deepEqual(props(['a', 'b'], { a: 1, b: 2, c: 3 }), [1, 2]);
  });
});

describe('assoc', () => {
  it('sets a key to a value and returns a new object', () => {
    assert.deepEqual(assoc('b', 2, { a: 1 }), { a: 1, b: 2 });
  });
});

describe('assocPath', () => {
  it('sets a value at a nested path', () => {
    assert.deepEqual(assocPath(['a', 'b'], 42, {}), { a: { b: 42 } });
  });

  it('returns the value directly when the path is empty', () => {
    assert.equal(assocPath([], 42, { a: 1 }), 42);
  });
});

describe('dissoc', () => {
  it('removes a key from an object and returns a new object', () => {
    const result = dissoc('a', { a: 1, b: 2, c: 3 });
    assert.deepEqual(result, { b: 2, c: 3 });
    assert.equal('a' in result, false);
  });
});

describe('dissocPath', () => {
  it('removes a value at a nested path', () => {
    assert.deepEqual(dissocPath(['a', 'b'], { a: { b: 1, c: 2 }, d: 3 }), { a: { c: 2 }, d: 3 });
  });

  it('returns the object unchanged when the path is empty', () => {
    assert.deepEqual(dissocPath([], { a: 1 }), { a: 1 });
  });

  it('returns the object unchanged when the key does not exist', () => {
    assert.deepEqual(dissocPath(['c'], { a: 1 }), { a: 1 });
  });
});

describe('merge', () => {
  it('combines two objects, with the second overriding the first', () => {
    assert.deepEqual(merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
  });
});

describe('mergeAll', () => {
  it('merges a list of objects into one', () => {
    assert.deepEqual(mergeAll([{ a: 1 }, { b: 2 }]), { a: 1, b: 2 });
  });
});

describe('pick', () => {
  it('selects the specified keys from an object', () => {
    assert.deepEqual(pick(['a', 'c'], { a: 1, b: 2, c: 3 }), { a: 1, c: 3 });
  });

  it('omits keys that do not exist on the object', () => {
    assert.deepEqual(pick(['a', 'x'], { a: 1, b: 2 }), { a: 1 });
  });
});

describe('pickBy', () => {
  it('selects keys based on a predicate', () => {
    assert.deepEqual(pickBy(v => v > 1, { a: 1, b: 2, c: 3 }), { b: 2, c: 3 });
  });
});

describe('omit', () => {
  it('removes the specified keys from an object', () => {
    assert.deepEqual(omit(['a', 'c'], { a: 1, b: 2, c: 3 }), { b: 2 });
  });
});

describe('omitBy', () => {
  it('removes keys based on a predicate', () => {
    assert.deepEqual(omitBy(v => v > 1, { a: 1, b: 2, c: 3 }), { a: 1 });
  });
});

describe('where', () => {
  it('returns true when an object matches the predicate spec', () => {
    const pred = where({ a: x => x > 0, b: x => x.length > 1 });
    assert.equal(pred({ a: 5, b: 'hello' }), true);
  });

  it('returns false when an object does not match the predicate spec', () => {
    const pred = where({ a: x => x > 0, b: x => x.length > 1 });
    assert.equal(pred({ a: 0, b: 'x' }), false);
  });
});

describe('whereEq', () => {
  it('returns true when an object matches the value spec', () => {
    const pred = whereEq({ a: 1 });
    assert.equal(pred({ a: 1, b: 2 }), true);
  });

  it('returns false when an object does not match the value spec', () => {
    const pred = whereEq({ a: 1 });
    assert.equal(pred({ a: 2, b: 2 }), false);
  });
});

describe('evolve', () => {
  it('recursively transforms values using a spec of functions', () => {
    assert.deepEqual(evolve({ a: x => x * 2 }, { a: 5, b: 10 }), { a: 10, b: 10 });
  });
});

describe('applySpec', () => {
  it('creates a function that applies arguments to a spec of functions', () => {
    assert.deepEqual(applySpec({ sum: (...xs) => xs.reduce((a, b) => a + b, 0), max: (...xs) => Math.max(...xs) })(1, 2, 3), { sum: 6, max: 3 });
  });
});

describe('merge variants', () => {
  describe('mergeDeepRight', () => {
    it('deeply merges the right object into the left', () => {
      assert.deepEqual(mergeDeepRight({ a: { b: 1 } }, { a: { c: 2 } }), { a: { b: 1, c: 2 } });
    });
  });

  describe('mergeLeft', () => {
    it('merges the right object into the left, right values override', () => {
      assert.deepEqual(mergeLeft({ a: 1 }, { a: 2, b: 3 }), { a: 2, b: 3 });
    });
  });

  describe('mergeRight', () => {
    it('merges the left object into the right, left values override', () => {
      assert.deepEqual(mergeRight({ a: 1 }, { a: 2, b: 3 }), { a: 1, b: 3 });
    });
  });
});

describe('lens', () => {
  it('creates a lens from a getter and setter for focused access', () => {
    const l = lens(x => x.a, (v, o) => ({ ...o, a: v }));
    assert.equal(view(l, { a: 1 }), 1);
    assert.deepEqual(set(l, 42, { a: 1 }), { a: 42 });
  });
});

describe('lensProp', () => {
  it('creates a lens focused on a property, enabling get, set, and over', () => {
    const obj = { a: 1, b: 2 };
    const l = lensProp('a');
    assert.equal(view(l, obj), 1);
    assert.deepEqual(set(l, 42, obj), { a: 42, b: 2 });
    assert.deepEqual(over(l, x => x + 1, obj), { a: 2, b: 2 });
    assert.equal(obj.a, 1);
  });
});

describe('lensPath', () => {
  it('creates a lens focused on a nested path', () => {
    const obj = { a: { b: { c: 42 } } };
    const l = lensPath(['a', 'b', 'c']);
    assert.equal(view(l, obj), 42);
    assert.deepEqual(set(l, 99, obj), { a: { b: { c: 99 } } });
  });
});

describe('lensIndex', () => {
  it('creates a lens focused on an array index', () => {
    const arr = [10, 20, 30];
    const l = lensIndex(1);
    assert.equal(view(l, arr), 20);
    assert.deepEqual(set(l, 99, arr), [10, 99, 30]);
  });
});
