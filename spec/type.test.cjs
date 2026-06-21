const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { type, isNil, isArray, isObject, isString, isNumber, isBoolean, isFunction, isDate, isRegExp, isError, isPromise, isInteger, isFiniteNum, isNaNVal } = require('../dist/index.js');

describe('type', () => {
  it('type', () => {
    assert.equal(type({}), 'Object');
    assert.equal(type(1), 'Number');
    assert.equal(type(NaN), 'Number');
    assert.equal(type(false), 'Boolean');
    assert.equal(type('foo'), 'String');
    assert.equal(type(null), 'Null');
    assert.equal(type(undefined), 'Undefined');
    assert.equal(type([]), 'Array');
    assert.equal(type(() => {}), 'Function');
    assert.equal(type(/[A-Z]/), 'RegExp');
  });

  it('isNil', () => { assert.equal(isNil(null), true); assert.equal(isNil(undefined), true); assert.equal(isNil(0), false); });
  it('isArray', () => { assert.equal(isArray([]), true); assert.equal(isArray({}), false); });
  it('isObject', () => { assert.equal(isObject({}), true); assert.equal(isObject([]), false); assert.equal(isObject(null), false); });
  it('isString', () => { assert.equal(isString('hello'), true); assert.equal(isString(42), false); });
  it('isNumber', () => { assert.equal(isNumber(42), true); assert.equal(isNumber(NaN), false); });
  it('isBoolean', () => { assert.equal(isBoolean(true), true); assert.equal(isBoolean(0), false); });
  it('isFunction', () => { assert.equal(isFunction(() => {}), true); assert.equal(isFunction({}), false); });
  it('isDate', () => { assert.equal(isDate(new Date()), true); assert.equal(isDate('2020-01-01'), false); });
  it('isRegExp', () => { assert.equal(isRegExp(/test/), true); assert.equal(isRegExp('test'), false); });
  it('isError', () => { assert.equal(isError(new Error()), true); assert.equal(isError('error'), false); });
  it('isPromise', () => { assert.equal(isPromise(Promise.resolve()), true); assert.equal(isPromise({ then: () => {} }), true); assert.equal(isPromise({}), false); });
  it('isInteger', () => { assert.equal(isInteger(42), true); assert.equal(isInteger(3.14), false); });
  it('isFiniteNum', () => { assert.equal(isFiniteNum(42), true); assert.equal(isFiniteNum(Infinity), false); });
  it('isNaNVal', () => { assert.equal(isNaNVal(NaN), true); assert.equal(isNaNVal(42), false); });
});
