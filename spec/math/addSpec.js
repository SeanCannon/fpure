const add = require('../../lib/math/add');

describe('math/add', () => {
  it('adds two numbers', () => {
    expect(add(4)(5)).toBe(9);
  });
  it('concatenates two strings', () => {
    expect(add('4')('5')).toBe('45');
  });
  it('casts number to string if a string is provided as the other parameter', () => {
    expect(add(4)('5')).toBe('45');
    expect(add('4')(5)).toBe('45');
  });
});
