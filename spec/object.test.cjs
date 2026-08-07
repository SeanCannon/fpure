const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { keys, values, entries, has, path, pathOr, prop, propOr, props, assoc, assocPath, dissoc, dissocPath, merge, mergeAll, mergeDeepRight, mergeLeft, mergeRight, pick, pickBy, omit, omitBy, where, whereEq, evolve, applySpec, lens, lensProp, lensPath, lensIndex, over, set, view, clone, eqProps, forEachObjIndexed, hasIn, hasPath, invert, invertObj, keysIn, mapKeys, mapObjIndexed, mergeDeepLeft, mergeDeepWith, mergeDeepWithKey, mergeWith, mergeWithKey, modify, modifyPath, objOf, paths, pickAll, renameKeys, toPairsIn, unwind, valuesIn, whereAny } = require('../dist/index.js');

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
    it('merges with left values taking precedence', () => {
      assert.deepEqual(mergeLeft({ a: 1 }, { a: 2, b: 3 }), { a: 1, b: 3 });
    });
  });

  describe('mergeRight', () => {
    it('merges with right values taking precedence', () => {
      assert.deepEqual(mergeRight({ a: 1 }, { a: 2, b: 3 }), { a: 2, b: 3 });
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

describe('clone', () => {
  it('deep clones a value', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = clone(obj);
    assert.deepEqual(cloned, obj);
    assert.notEqual(cloned, obj);
    assert.notEqual(cloned.b, obj.b);
  });
});

describe('eqProps', () => {
  it('checks if two objects have equal property values', () => {
    assert.equal(eqProps('a', { a: 1 }, { a: 1 }), true);
    assert.equal(eqProps('a', { a: 1 }, { a: 2 }), false);
  });
});

describe('forEachObjIndexed', () => {
  it('iterates over object entries', () => {
    const result = [];
    forEachObjIndexed((v, k) => result.push(`${k}:${v}`), { a: 1, b: 2 });
    assert.deepEqual(result, ['a:1', 'b:2']);
  });
});

describe('hasIn', () => {
  it('checks prototype chain', () => {
    assert.equal(hasIn('toString', {}), true);
    assert.equal(hasIn('x', {}), false);
  });
});

describe('hasPath', () => {
  it('checks nested path existence', () => {
    assert.equal(hasPath(['a', 'b'], { a: { b: 1 } }), true);
    assert.equal(hasPath(['a', 'c'], { a: { b: 1 } }), false);
  });
});

describe('invert', () => {
  it('inverts keys and values', () => {
    assert.deepEqual(invert({ a: 'x', b: 'y', c: 'x' }), { x: ['a', 'c'], y: ['b'] });
  });
});

describe('invertObj', () => {
  it('inverts keys and values (last wins)', () => {
    assert.deepEqual(invertObj({ a: 'x', b: 'x' }), { x: 'b' });
  });
});

describe('keysIn', () => {
  it('returns keys including prototype', () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    obj.b = 2;
    const result = keysIn(obj);
    assert.equal(result.includes('a'), true);
    assert.equal(result.includes('b'), true);
  });
});

describe('mapKeys', () => {
  it('transforms keys', () => {
    assert.deepEqual(mapKeys(k => k.toUpperCase(), { a: 1, b: 2 }), { A: 1, B: 2 });
  });
});

describe('mapObjIndexed', () => {
  it('maps over object values', () => {
    assert.deepEqual(mapObjIndexed(v => v * 2, { a: 1, b: 2 }), { a: 2, b: 4 });
  });
});

describe('mergeDeepLeft', () => {
  it('deep merges with left precedence', () => {
    assert.deepEqual(mergeDeepLeft({ a: { b: 1, c: 2 } }, { a: { c: 3, d: 4 } }), { a: { b: 1, c: 2, d: 4 } });
  });
});

describe('mergeDeepWith', () => {
  it('deep merges with resolver', () => {
    assert.deepEqual(mergeDeepWith((a, b) => a + b, { a: 1, b: { c: 1 } }, { a: 2, b: { c: 2 } }), { a: 3, b: { c: 3 } });
  });
});

describe('mergeDeepWithKey', () => {
  it('deep merges with key-aware resolver', () => {
    const result = mergeDeepWithKey((k, a, b) => k === 'a' ? a : b, { a: 1, b: 2 }, { a: 10, b: 20 });
    assert.equal(result.a, 1);
    assert.equal(result.b, 20);
  });
});

describe('mergeWith', () => {
  it('merges with resolver', () => {
    assert.deepEqual(mergeWith((a, b) => a + b, { a: 1, b: 2 }, { a: 10, c: 3 }), { a: 11, b: 2, c: 3 });
  });
});

describe('mergeWithKey', () => {
  it('merges with key-aware resolver', () => {
    const result = mergeWithKey((k, a, b) => k === 'a' ? a : b, { a: 1, b: 2 }, { a: 10, b: 20 });
    assert.equal(result.a, 1);
    assert.equal(result.b, 20);
  });
});

describe('modify', () => {
  it('applies function to a property', () => {
    assert.deepEqual(modify('a', x => x * 2, { a: 5, b: 10 }), { a: 10, b: 10 });
  });
});

describe('modifyPath', () => {
  it('applies function at a nested path', () => {
    assert.deepEqual(modifyPath(['a', 'b'], x => x * 2, { a: { b: 5 }, c: 1 }), { a: { b: 10 }, c: 1 });
  });
});

describe('objOf', () => {
  it('creates single-key object', () => {
    assert.deepEqual(objOf('a', 1), { a: 1 });
  });
});

describe('paths', () => {
  it('extracts values at multiple paths', () => {
    assert.deepEqual(paths([['a', 'b'], ['c']], { a: { b: 1 }, c: 2 }), [1, 2]);
  });
});

describe('pickAll', () => {
  it('picks including undefined', () => {
    assert.deepEqual(pickAll(['a', 'x'], { a: 1 }), { a: 1, x: undefined });
  });
});

describe('renameKeys', () => {
  it('renames keys', () => {
    assert.deepEqual(renameKeys({ a: 'x', b: 'y' }, { a: 1, b: 2 }), { x: 1, y: 2 });
  });
});

describe('toPairsIn', () => {
  it('converts to pairs including prototype', () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    obj.b = 2;
    const pairs = toPairsIn(obj);
    assert.deepEqual(pairs, [['b', 2], ['a', 1]]);
  });
});

describe('unwind', () => {
  it('unwinds array property', () => {
    assert.deepEqual(unwind('items', { items: [1, 2], x: 1 }), [{ items: 1, x: 1 }, { items: 2, x: 1 }]);
  });
});

describe('valuesIn', () => {
  it('returns values including prototype', () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    obj.b = 2;
    const vals = valuesIn(obj);
    assert.equal(vals.includes(2), true);
    assert.equal(vals.includes(1), true);
  });
});

describe('whereAny', () => {
  it('returns true if any predicate matches', () => {
    const pred = whereAny({ a: x => x > 0, b: x => x.length > 1 });
    assert.equal(pred({ a: 0, b: 'hi' }), true);
    assert.equal(pred({ a: 0, b: 'x' }), false);
  });
});

describe('mergeDeepWith extra branches', () => {
  it('handles non-overlapping keys and non-object values', () => {
    const fn = (a, b) => a + b;
    assert.deepEqual(mergeDeepWith(fn, { a: 1, b: { c: 1 } }, { a: 2, b: { c: 2 } }), { a: 3, b: { c: 3 } });
    assert.deepEqual(mergeDeepWith(fn, { a: 1 }, { b: 2 }), { a: 1, b: 2 });
    assert.deepEqual(mergeDeepWith(fn, { a: 1 }, { a: 2 }), { a: 3 });
    assert.deepEqual(mergeDeepWith(fn, {}, { a: 2 }), { a: 2 });
    assert.deepEqual(mergeDeepWith(fn, { a: 1 }, {}), { a: 1 });
    assert.deepEqual(mergeDeepWith(fn, null, { a: 1 }), { a: 1 });
    assert.deepEqual(mergeDeepWith(fn, { a: 1 }, null), { a: 1 });
  });
});

describe('mergeDeepWithKey extra branches', () => {
  it('handles non-overlapping keys and non-object values', () => {
    const fn = (k, a, b) => k === 'a' ? a : b;
    assert.deepEqual(mergeDeepWithKey(fn, { a: { b: 1 }, c: { d: 1 } }, { a: { b: 2 }, c: { d: 2 } }), { a: { b: 2 }, c: { d: 2 } });
    assert.deepEqual(mergeDeepWithKey(fn, { a: 1 }, { b: 2 }), { a: 1, b: 2 });
    assert.deepEqual(mergeDeepWithKey(fn, { a: 1 }, { a: 2 }), { a: 1 });
    assert.deepEqual(mergeDeepWithKey(fn, {}, { a: 2 }), { a: 2 });
    assert.deepEqual(mergeDeepWithKey(fn, { a: 1 }, {}), { a: 1 });
    assert.deepEqual(mergeDeepWithKey(fn, null, { a: 1 }), { a: 1 });
    assert.deepEqual(mergeDeepWithKey(fn, { a: 1 }, null), { a: 1 });
  });
});

describe('modifyPath empty path', () => {
  it('applies fn to root when path is empty', () => {
    assert.equal(modifyPath([], x => x + 1, 41), 42);
  });
});

describe('paths with null in path', () => {
  it('returns undefined for null intermediate', () => {
    assert.deepEqual(paths([['a', 'b']], { a: null }), [undefined]);
  });
});

describe('renameKeys with missing key mapping', () => {
  it('keeps original key when not in map', () => {
    assert.deepEqual(renameKeys({ a: 'x' }, { a: 1, b: 2 }), { x: 1, b: 2 });
  });
});

describe('unwind with non-array value', () => {
  it('returns singleton array for non-array property', () => {
    assert.deepEqual(unwind('items', { items: 42, x: 1 }), [{ items: 42, x: 1 }]);
  });
});
