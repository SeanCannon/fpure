const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { toUpper, toLower, trim, split, join, replace, test, match, startsWith, endsWith, padStart, padEnd } = require('../dist/index.js');

describe('toUpper', () => {
  it('converts a string to uppercase', () => {
    assert.equal(toUpper('hello'), 'HELLO');
  });
});

describe('toLower', () => {
  it('converts a string to lowercase', () => {
    assert.equal(toLower('HELLO'), 'hello');
  });
});

describe('trim', () => {
  it('removes whitespace from both ends of a string', () => {
    assert.equal(trim('  hello  '), 'hello');
  });
});

describe('split', () => {
  it('splits a string by a separator', () => {
    assert.deepEqual(split(',', 'a,b,c'), ['a', 'b', 'c']);
  });
});

describe('join', () => {
  it('joins an array of strings with a separator', () => {
    assert.equal(join(',', ['a', 'b', 'c']), 'a,b,c');
  });
});

describe('replace', () => {
  it('replaces the first occurrence of a pattern', () => {
    assert.equal(replace('world', 'there', 'hello world'), 'hello there');
  });
});

describe('test', () => {
  it('returns true when the pattern matches', () => {
    assert.equal(test(/hello/, 'hello world'), true);
  });

  it('returns false when the pattern does not match', () => {
    assert.equal(test(/bye/, 'hello world'), false);
  });
});

describe('match', () => {
  it('returns the match array when the pattern matches', () => {
    const m = match(/h(\w)/, 'hello');
    assert.equal(m[0], 'he');
    assert.equal(m[1], 'e');
  });

  it('returns null when the pattern does not match', () => {
    assert.equal(match(/x/, 'hello'), null);
  });
});

describe('startsWith', () => {
  it('returns true when the string starts with the given prefix', () => {
    assert.equal(startsWith('hello', 'hello world'), true);
  });

  it('returns false when the string does not start with the given prefix', () => {
    assert.equal(startsWith('world', 'hello world'), false);
  });
});

describe('endsWith', () => {
  it('returns true when the string ends with the given suffix', () => {
    assert.equal(endsWith('world', 'hello world'), true);
  });

  it('returns false when the string does not end with the given suffix', () => {
    assert.equal(endsWith('hello', 'hello world'), false);
  });
});

describe('padStart', () => {
  it('pads the start of a string to the given length', () => {
    assert.equal(padStart(5, '0', '42'), '00042');
  });
});

describe('padEnd', () => {
  it('pads the end of a string to the given length', () => {
    assert.equal(padEnd(5, '0', '42'), '42000');
  });
});
