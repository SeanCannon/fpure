const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { add, sub, mul, div, mod, mathMod, inc, dec, negate, sum, product, mean, median, min, max, clamp } = require('../dist/index.js');

describe('math', () => {
  it('add', () => { assert.equal(add(4, 5), 9); assert.equal(add(4)(5), 9); });
  it('sub - data-last: sub(3, 10) = 10 - 3 = 7', () => { assert.equal(sub(3, 10), 7); assert.equal(sub(3)(10), 7); });
  it('mul', () => { assert.equal(mul(4, 5), 20); });
  it('div - data-last: div(2, 10) = 10 / 2 = 5', () => { assert.equal(div(2, 10), 5); });
  it('mod', () => { assert.equal(mod(3, 10), 1); });

  it('mathMod', () => {
    assert.equal(mathMod(5, 17), 2);
    assert.equal(mathMod(5, -17), 3);
    assert.ok(Number.isNaN(mathMod(5, 17.2)));
    assert.ok(Number.isNaN(mathMod(-5, 17)));
  });

  it('inc', () => { assert.equal(inc(5), 6); });
  it('dec', () => { assert.equal(dec(5), 4); });
  it('negate', () => { assert.equal(negate(5), -5); });
  it('sum', () => { assert.equal(sum([1, 2, 3, 4]), 10); assert.equal(sum([]), 0); });
  it('product', () => { assert.equal(product([1, 2, 3, 4]), 24); });
  it('mean', () => { assert.equal(mean([1, 2, 3, 4]), 2.5); });
  it('median', () => { assert.equal(median([1, 2, 3, 4, 5]), 3); assert.equal(median([1, 2, 3, 4]), 2.5); });
  it('min', () => { assert.equal(min(3, 5), 3); });
  it('max', () => { assert.equal(max(3, 5), 5); });
  it('clamp', () => { assert.equal(clamp(1, 10, 5), 5); assert.equal(clamp(1, 10, 0), 1); assert.equal(clamp(1, 10, 15), 10); });
});
