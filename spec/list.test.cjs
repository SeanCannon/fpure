const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { map, filter, reject, reduce, reduceRight, find, findIndex, head, tail, last, init, take, drop, takeWhile, dropWhile, takeLast, dropLast, slice, splitAt, splitEvery, remove, insert, insertAll, update, adjust, append, prepend, concat, flatten, chain, repeat, times, zip, zipObj, zipWith, groupBy, groupWith, sort, sortBy, asc, desc, all, any, none, includes, without, difference, intersection, union, uniq, uniqBy, uniqWith, aperture, partition, span, pluck, project, fromPairs, toPairs, reverse, length, countBy, forEach, indexBy, interpose, intercalate, findLast, findLastIndex } = require('../dist/index.js');

describe('map', () => {
  it('applies a function to each element of an array', () => {
    assert.deepEqual(map(x => x * 2, [1, 2, 3]), [2, 4, 6]);
  });
});

describe('filter', () => {
  it('keeps elements that pass the predicate', () => {
    assert.deepEqual(filter(x => x > 1, [1, 2, 3]), [2, 3]);
  });
});

describe('reject', () => {
  it('removes elements that pass the predicate', () => {
    assert.deepEqual(reject(x => x > 1, [1, 2, 3]), [1]);
  });
});

describe('reduce', () => {
  it('accumulates a value from left to right', () => {
    assert.equal(reduce((a, b) => a + b, 0, [1, 2, 3]), 6);
  });
});

describe('reduceRight', () => {
  it('accumulates a value from right to left', () => {
    assert.equal(reduceRight((a, b) => a - b, 0, [1, 2, 3]), -6);
  });
});

describe('find', () => {
  it('returns the first element matching the predicate', () => {
    assert.equal(find(x => x > 1, [1, 2, 3]), 2);
  });
});

describe('findIndex', () => {
  it('returns the index of the first element matching the predicate', () => {
    assert.equal(findIndex(x => x > 1, [1, 2, 3]), 1);
  });
});

describe('findLast', () => {
  it('returns the last element matching the predicate', () => {
    assert.equal(findLast(x => x < 3, [1, 2, 3, 2, 1]), 1);
  });
});

describe('findLastIndex', () => {
  it('returns the index of the last element matching the predicate', () => {
    assert.equal(findLastIndex(x => x < 3, [1, 2, 3, 2, 1]), 4);
  });

  it('returns -1 when no element matches', () => {
    assert.equal(findLastIndex(x => x > 10, [1, 2, 3]), -1);
  });
});

describe('head', () => {
  it('returns the first element of an array', () => {
    assert.equal(head([1, 2, 3]), 1);
  });
});

describe('tail', () => {
  it('returns all elements except the first', () => {
    assert.deepEqual(tail([1, 2, 3]), [2, 3]);
  });
});

describe('last', () => {
  it('returns the last element of an array', () => {
    assert.equal(last([1, 2, 3]), 3);
  });
});

describe('init', () => {
  it('returns all elements except the last', () => {
    assert.deepEqual(init([1, 2, 3]), [1, 2]);
  });
});

describe('take', () => {
  it('returns the first n elements of an array', () => {
    assert.deepEqual(take(2, [1, 2, 3]), [1, 2]);
  });
});

describe('drop', () => {
  it('removes the first n elements of an array', () => {
    assert.deepEqual(drop(2, [1, 2, 3]), [3]);
  });
});

describe('takeWhile', () => {
  it('takes elements from the start while the predicate holds', () => {
    assert.deepEqual(takeWhile(x => x < 3, [1, 2, 3, 4]), [1, 2]);
  });

  it('returns the full array when all elements pass the predicate', () => {
    assert.deepEqual(takeWhile(x => x < 5, [1, 2, 3]), [1, 2, 3]);
  });
});

describe('dropWhile', () => {
  it('drops elements from the start while the predicate holds', () => {
    assert.deepEqual(dropWhile(x => x < 3, [1, 2, 3, 4]), [3, 4]);
  });
});

describe('takeLast', () => {
  it('returns the last n elements of an array', () => {
    assert.deepEqual(takeLast(2, [1, 2, 3]), [2, 3]);
  });

  it('returns an empty array when n is 0', () => {
    assert.deepEqual(takeLast(0, [1, 2, 3]), []);
  });
});

describe('dropLast', () => {
  it('removes the last n elements of an array', () => {
    assert.deepEqual(dropLast(2, [1, 2, 3]), [1]);
  });

  it('returns the full array when n is 0', () => {
    assert.deepEqual(dropLast(0, [1, 2, 3]), [1, 2, 3]);
  });
});

describe('slice', () => {
  it('extracts a portion of an array from start to end (exclusive)', () => {
    assert.deepEqual(slice(1, 3, [1, 2, 3, 4]), [2, 3]);
  });
});

describe('splitAt', () => {
  it('splits an array into two at the given index', () => {
    assert.deepEqual(splitAt(2, [1, 2, 3, 4]), [[1, 2], [3, 4]]);
  });
});

describe('splitEvery', () => {
  it('splits an array into groups of the given length', () => {
    assert.deepEqual(splitEvery(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]]);
  });
});

describe('remove', () => {
  it('removes count elements starting at the given index', () => {
    assert.deepEqual(remove(1, 2, [1, 2, 3, 4]), [1, 4]);
  });
});

describe('insert', () => {
  it('inserts an element at the given index', () => {
    assert.deepEqual(insert(1, 99, [1, 2, 3]), [1, 99, 2, 3]);
  });
});

describe('insertAll', () => {
  it('inserts multiple elements at the given index', () => {
    assert.deepEqual(insertAll(1, [99, 100], [1, 2, 3]), [1, 99, 100, 2, 3]);
  });
});

describe('update', () => {
  it('replaces the element at the given index', () => {
    assert.deepEqual(update(1, 99, [1, 2, 3]), [1, 99, 3]);
  });
});

describe('adjust', () => {
  it('applies a function to the element at the given index', () => {
    assert.deepEqual(adjust(x => x * 10, 1, [1, 2, 3]), [1, 20, 3]);
  });
});

describe('append', () => {
  it('adds an element to the end of an array', () => {
    assert.deepEqual(append(4, [1, 2, 3]), [1, 2, 3, 4]);
  });
});

describe('prepend', () => {
  it('adds an element to the beginning of an array', () => {
    assert.deepEqual(prepend(0, [1, 2, 3]), [0, 1, 2, 3]);
  });
});

describe('concat', () => {
  it('combines two arrays', () => {
    assert.deepEqual(concat([1, 2], [3, 4]), [1, 2, 3, 4]);
  });
});

describe('flatten', () => {
  it('recursively flattens nested arrays', () => {
    assert.deepEqual(flatten([1, [2, [3]], 4]), [1, 2, 3, 4]);
  });
});

describe('chain', () => {
  it('maps and flattens (flatMap)', () => {
    assert.deepEqual(chain(x => [x, x * 2], [1, 2, 3]), [1, 2, 2, 4, 3, 6]);
  });
});

describe('interpose', () => {
  it('inserts a separator between elements', () => {
    assert.deepEqual(interpose(', ', [1, 2, 3]), [1, ', ', 2, ', ', 3]);
  });
});

describe('intercalate', () => {
  it('inserts a separator list between sublists and flattens', () => {
    assert.deepEqual(intercalate([', '], [[1], [2], [3]]), [1, ', ', 2, ', ', 3]);
  });
});

describe('repeat', () => {
  it('creates an array of n copies of the given value', () => {
    assert.deepEqual(repeat(5, 3), [5, 5, 5]);
  });
});

describe('times', () => {
  it('calls a function n times with the index', () => {
    assert.deepEqual(times(x => x * 2, 5), [0, 2, 4, 6, 8]);
  });
});

describe('zip', () => {
  it('pairs elements from two arrays by index', () => {
    assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]);
  });
});

describe('zipObj', () => {
  it('creates an object from an array of keys and an array of values', () => {
    assert.deepEqual(zipObj(['a', 'b'], [1, 2]), { a: 1, b: 2 });
  });
});

describe('zipWith', () => {
  it('combines elements from two arrays using a function', () => {
    assert.deepEqual(zipWith((a, b) => a + b, [1, 2, 3], [10, 20, 30]), [11, 22, 33]);
  });
});

describe('groupBy', () => {
  it('groups list elements by a key function', () => {
    assert.deepEqual(groupBy(x => x > 2 ? 'big' : 'small', [1, 2, 3, 4]), { small: [1, 2], big: [3, 4] });
  });
});

describe('groupWith', () => {
  it('groups consecutive equal elements using a comparator', () => {
    assert.deepEqual(groupWith((a, b) => a === b, [1, 1, 2, 2, 3]), [[1, 1], [2, 2], [3]]);
  });
});

describe('sort', () => {
  it('creates a sorted copy using a comparator', () => {
    assert.deepEqual(sort((a, b) => a - b, [3, 1, 2]), [1, 2, 3]);
  });
});

describe('sortBy', () => {
  it('creates a sorted copy using a transform function', () => {
    assert.deepEqual(sortBy(x => x.length, ['aaa', 'bb', 'c']), ['c', 'bb', 'aaa']);
  });

  it('preserves the original order of elements with equal sort keys', () => {
    assert.deepEqual(sortBy(x => x.length, ['a', 'bb', 'cc']), ['a', 'bb', 'cc']);
  });
});

describe('asc', () => {
  it('sorts numbers in ascending order', () => {
    assert.deepEqual(asc([3, 1, 2]), [1, 2, 3]);
  });
});

describe('desc', () => {
  it('sorts numbers in descending order', () => {
    assert.deepEqual(desc([1, 2, 3]), [3, 2, 1]);
  });
});

describe('all', () => {
  it('returns true when all elements pass the predicate', () => {
    assert.equal(all(x => x > 0, [1, 2, 3]), true);
  });

  it('returns false when any element fails the predicate', () => {
    assert.equal(all(x => x > 1, [1, 2, 3]), false);
  });
});

describe('any', () => {
  it('returns true when at least one element passes the predicate', () => {
    assert.equal(any(x => x > 2, [1, 2, 3]), true);
  });
});

describe('none', () => {
  it('returns true when no elements pass the predicate', () => {
    assert.equal(none(x => x > 10, [1, 2, 3]), true);
  });
});

describe('includes', () => {
  it('returns true when the array contains the value', () => {
    assert.equal(includes(2, [1, 2, 3]), true);
  });
});

describe('without', () => {
  it('removes specified values from an array', () => {
    assert.deepEqual(without([1, 2], [1, 2, 1, 3, 2, 4]), [3, 4]);
  });
});

describe('difference', () => {
  it('returns elements in the second list not present in the first', () => {
    assert.deepEqual(difference([1, 2, 3], [2, 3, 4]), [4]);
  });
});

describe('intersection', () => {
  it('returns elements present in both lists', () => {
    assert.deepEqual(intersection([1, 2, 3], [2, 3, 4]), [2, 3]);
  });
});

describe('union', () => {
  it('returns unique elements from both lists', () => {
    assert.deepEqual(union([1, 2, 3], [2, 3, 4]), [1, 2, 3, 4]);
  });
});

describe('uniq', () => {
  it('removes duplicate values from an array', () => {
    assert.deepEqual(uniq([1, 2, 1, 3, 2]), [1, 2, 3]);
  });
});

describe('uniqBy', () => {
  it('removes duplicates based on a transform function', () => {
    assert.deepEqual(uniqBy(x => x % 2, [1, 2, 3, 4, 5]), [1, 2]);
  });
});

describe('uniqWith', () => {
  it('removes duplicates based on a comparator', () => {
    assert.deepEqual(uniqWith((a, b) => a % 2 === b % 2, [1, 2, 3, 4, 5]), [1, 2]);
  });

  it('removes identical duplicates using an equality comparator', () => {
    assert.deepEqual(uniqWith((a, b) => a === b, [1, 2, 1, 3]), [1, 2, 3]);
  });
});

describe('aperture', () => {
  it('returns overlapping subsequences of the given length', () => {
    assert.deepEqual(aperture(2, [1, 2, 3, 4]), [[1, 2], [2, 3], [3, 4]]);
  });
});

describe('partition', () => {
  it('splits an array into [pass, fail] based on a predicate', () => {
    const [evens, odds] = partition(x => x % 2 === 0, [1, 2, 3, 4, 5]);
    assert.deepEqual(evens, [2, 4]);
    assert.deepEqual(odds, [1, 3, 5]);
  });
});

describe('span', () => {
  it('splits an array into [takeWhile, rest]', () => {
    assert.deepEqual(span(x => x < 3, [1, 2, 3, 4, 1]), [[1, 2], [3, 4, 1]]);
  });

  it('returns the full array with an empty suffix when all elements pass', () => {
    assert.deepEqual(span(x => x < 5, [1, 2, 3]), [[1, 2, 3], []]);
  });
});

describe('pluck', () => {
  it('extracts a key from each object in a list', () => {
    assert.deepEqual(pluck('a', [{ a: 1 }, { a: 2 }]), [1, 2]);
  });
});

describe('project', () => {
  it('selects specific keys from a list of objects', () => {
    assert.deepEqual(project(['a', 'b'], [{ a: 1, b: 2, c: 3 }]), [{ a: 1, b: 2 }]);
  });
});

describe('fromPairs', () => {
  it('converts an array of [key, value] pairs into an object', () => {
    assert.deepEqual(fromPairs([['a', 1], ['b', 2]]), { a: 1, b: 2 });
  });
});

describe('toPairs', () => {
  it('converts an object into an array of [key, value] pairs', () => {
    assert.deepEqual(toPairs({ a: 1, b: 2 }), [['a', 1], ['b', 2]]);
  });
});

describe('reverse', () => {
  it('reverses the order of elements in an array', () => {
    assert.deepEqual(reverse([1, 2, 3]), [3, 2, 1]);
  });
});

describe('length', () => {
  it('returns the number of elements in an array', () => {
    assert.equal(length([1, 2, 3]), 3);
  });
});

describe('countBy', () => {
  it('counts occurrences by a key function', () => {
    assert.deepEqual(countBy(x => x > 2 ? 'big' : 'small', [1, 2, 3, 4]), { small: 2, big: 2 });
  });
});

describe('forEach', () => {
  it('executes a side effect for each element and returns the original array', () => {
    const xs = [];
    const result = forEach(x => xs.push(x), [1, 2, 3]);
    assert.deepEqual(xs, [1, 2, 3]);
    assert.deepEqual(result, [1, 2, 3]);
  });
});

describe('indexBy', () => {
  it('indexes a list by a key function, last duplicate wins', () => {
    assert.deepEqual(indexBy(x => x.id, [{ id: 'a', v: 1 }, { id: 'b', v: 2 }]), { a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } });
  });
});
