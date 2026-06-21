'use strict';

const type = require('../../lib/type/type');

describe('type/type', () => {
  it('asserts the expected type', () => {
    expect(type({})).toBe('Object');
    expect(type(1)).toBe('Number');
    expect(type(NaN)).toBe('Number');
    expect(type(false)).toBe('Boolean');
    expect(type('foo')).toBe('String');
    expect(type(null)).toBe('Null');
    expect(type()).toBe('Undefined');
    expect(type(undefined)).toBe('Undefined');
    expect(type([])).toBe('Array');
    expect(type(() => {})).toBe('Function');
    expect(type(/[A-Z]/)).toBe('RegExp');
  });
});

