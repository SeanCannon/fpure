const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { gt, lt, gte, lte, identical, equals } = require('../dist/index.js');

describe('relation', () => {
  describe('gt - data-last: gt(3, 5) = true', () => {
    it('should work', () => {
      assert.equal(gt(3, 5), true);
      assert.equal(gt(5, 3), false);
      assert.equal(gt(3)(5), true);
      const gt3 = gt(3);
      assert.equal(gt3(5), true);
      assert.equal(gt3(2), false);
    });
  });

  describe('lt', () => {
    it('should work', () => {
      assert.equal(lt(5, 3), true);
      assert.equal(lt(3, 5), false);
    });
  });

  describe('gte', () => {
    it('should work', () => {
      assert.equal(gte(3, 5), true);
      assert.equal(gte(5, 3), false);
      assert.equal(gte(3, 3), true);
    });
  });

  describe('lte', () => {
    it('should work', () => {
      assert.equal(lte(5, 3), true);
      assert.equal(lte(3, 5), false);
      assert.equal(lte(3, 3), true);
    });
  });

  describe('identical', () => {
    it('should detect same reference', () => {
      assert.equal(identical(1, 1), true);
      assert.equal(identical(1, '1'), false);
      assert.equal(identical([], []), false);
      assert.equal(identical(0, -0), false);
      assert.equal(identical(NaN, NaN), true);
    });
  });

  describe('equals', () => {
    it('should deeply compare primitives', () => {
      assert.equal(equals(1, 1), true);
      assert.equal(equals(1, '1'), false);
      assert.equal(equals(NaN, NaN), true);
    });

    it('should deeply compare arrays', () => {
      assert.equal(equals([1, 2, 3], [1, 2, 3]), true);
      assert.equal(equals([1, 2, 3], [1, 2, 4]), false);
      assert.equal(equals([1, [2, 3]], [1, [2, 3]]), true);
    });

    it('should deeply compare objects', () => {
      assert.equal(equals({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
      assert.equal(equals({ a: 1, b: 2 }, { a: 1, b: 3 }), false);
      assert.equal(equals({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } }), true);
    });

    it('should handle empty vs non-empty', () => {
      assert.equal(equals({}, { a: 1 }), false);
      assert.equal(equals([], [1]), false);
    });
  });
});
