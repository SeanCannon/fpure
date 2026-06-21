const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { toUpper, toLower, trim, split, join, replace, test, match, startsWith, endsWith, padStart, padEnd } = require('../dist/index.js');

describe('string', () => {
  it('toUpper', () => { assert.equal(toUpper('hello'), 'HELLO'); });
  it('toLower', () => { assert.equal(toLower('HELLO'), 'hello'); });
  it('trim', () => { assert.equal(trim('  hello  '), 'hello'); });
  it('split', () => { assert.deepEqual(split(',', 'a,b,c'), ['a', 'b', 'c']); });
  it('join', () => { assert.equal(join(',', ['a', 'b', 'c']), 'a,b,c'); });
  it('replace', () => { assert.equal(replace('world', 'there', 'hello world'), 'hello there'); });
  it('test', () => { assert.equal(test(/hello/, 'hello world'), true); assert.equal(test(/bye/, 'hello world'), false); });
  it('match', () => { const m = match(/h(\w)/, 'hello'); assert.equal(m[0], 'he'); assert.equal(m[1], 'e'); assert.equal(match(/x/, 'hello'), null); });
  it('startsWith', () => { assert.equal(startsWith('hello', 'hello world'), true); assert.equal(startsWith('world', 'hello world'), false); });
  it('endsWith', () => { assert.equal(endsWith('world', 'hello world'), true); assert.equal(endsWith('hello', 'hello world'), false); });
  it('padStart', () => { assert.equal(padStart(5, '0', '42'), '00042'); });
  it('padEnd', () => { assert.equal(padEnd(5, '0', '42'), '42000'); });
});
