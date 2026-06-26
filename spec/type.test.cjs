const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { type, isNil, isArray, isObject, isString, isNumber, isBoolean, isFunction, isDate, isRegExp, isError, isPromise, isInteger, isFiniteNum, isNaNVal } = require('../dist/index.js');

describe('type', () => {
  it('returns the internal [[Class]] name for each value type', () => {
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
});

describe('isNil', () => {
  it('returns true for null and undefined', () => {
    assert.equal(isNil(null), true);
    assert.equal(isNil(undefined), true);
  });

  it('returns false for other values', () => {
    assert.equal(isNil(0), false);
  });
});

describe('isArray', () => {
  it('returns true for arrays', () => {
    assert.equal(isArray([]), true);
  });

  it('returns false for non-arrays', () => {
    assert.equal(isArray({}), false);
  });
});

describe('isObject', () => {
  it('returns true for plain objects', () => {
    assert.equal(isObject({}), true);
  });

  it('returns false for arrays', () => {
    assert.equal(isObject([]), false);
  });

  it('returns false for null', () => {
    assert.equal(isObject(null), false);
  });
});

describe('isString', () => {
  it('returns true for strings', () => {
    assert.equal(isString('hello'), true);
  });

  it('returns false for non-strings', () => {
    assert.equal(isString(42), false);
  });
});

describe('isNumber', () => {
  it('returns true for numbers', () => {
    assert.equal(isNumber(42), true);
  });

  it('returns false for NaN', () => {
    assert.equal(isNumber(NaN), false);
  });
});

describe('isBoolean', () => {
  it('returns true for booleans', () => {
    assert.equal(isBoolean(true), true);
  });

  it('returns false for non-booleans', () => {
    assert.equal(isBoolean(0), false);
  });
});

describe('isFunction', () => {
  it('returns true for functions', () => {
    assert.equal(isFunction(() => {}), true);
  });

  it('returns false for non-functions', () => {
    assert.equal(isFunction({}), false);
  });
});

describe('isDate', () => {
  it('returns true for Date instances', () => {
    assert.equal(isDate(new Date()), true);
  });

  it('returns false for non-Dates', () => {
    assert.equal(isDate('2020-01-01'), false);
  });
});

describe('isRegExp', () => {
  it('returns true for RegExp instances', () => {
    assert.equal(isRegExp(/test/), true);
  });

  it('returns false for non-RegExps', () => {
    assert.equal(isRegExp('test'), false);
  });
});

describe('isError', () => {
  it('returns true for Error instances', () => {
    assert.equal(isError(new Error()), true);
  });

  it('returns false for non-Errors', () => {
    assert.equal(isError('error'), false);
  });
});

describe('isPromise', () => {
  it('returns true for native Promises', () => {
    assert.equal(isPromise(Promise.resolve()), true);
  });

  it('returns true for thenables', () => {
    assert.equal(isPromise({ then: () => {} }), true);
  });

  it('returns false for plain objects', () => {
    assert.equal(isPromise({}), false);
  });
});

describe('isInteger', () => {
  it('returns true for integers', () => {
    assert.equal(isInteger(42), true);
  });

  it('returns false for floats', () => {
    assert.equal(isInteger(3.14), false);
  });
});

describe('isFiniteNum', () => {
  it('returns true for finite numbers', () => {
    assert.equal(isFiniteNum(42), true);
  });

  it('returns false for Infinity', () => {
    assert.equal(isFiniteNum(Infinity), false);
  });
});

describe('isNaNVal', () => {
  it('returns true for NaN', () => {
    assert.equal(isNaNVal(NaN), true);
  });

  it('returns false for non-NaN values', () => {
    assert.equal(isNaNVal(42), false);
  });
});
