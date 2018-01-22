const adjust = require('../../lib/list/adjust'),
      add    = require('../../lib/math/add');

describe('list/adjust', () => {
  it('adjusts a value at a given index', () => {
    expect(adjust(add(10), 1, [5, 6, 7])).toEqual([5, 16, 7]);
    expect(adjust(add(10))(1, [5, 6, 7])).toEqual([5, 16, 7]);
    expect(adjust(add(10), 1)([5, 6, 7])).toEqual([5, 16, 7]);
    expect(adjust(add(10))(1)([5, 6, 7])).toEqual([5, 16, 7]);
  });

  it('throws an error when given a non function', () => {
    expect(() => { adjust('foo', 1, [5, 6, 7]); }).toThrow(new TypeError('fn is not a function'))
  });

  it('fails gracefully when given a non numeric index', () => {
    expect(adjust(add(10), 'foo', [5, 6, 7])).toEqual([5, 6, 7]);
  });

  it('fails gracefully when an index out of range', () => {
    expect(adjust(add(10), 99, [5, 6, 7])).toEqual([5, 6, 7]);
  });
});
