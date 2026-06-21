# fpure

Pure, curried, functional programming utilities for TypeScript.

Inspired by Ramda and Sanctuary

```
npm install fpure
npm run build
npm test
```

```ts
import { compose, add, map, filter, gt } from 'fpure';

compose(
  filter(gt(3)), 
  map(add(1))
)([1, 2, 3, 4]) // => [3, 5]  (add 1 to each, then keep values > 3)

```

---

## Why fpure?

### Comparison

| Metric | fpure | Ramda | Sanctuary |
|--------|-------|-------|-----------|
| Bundle size (gzip) | **7 KB** (full lib) | ~40 KB | ~15 KB |
| Zero runtime dependencies | **Yes** | Yes | No (type system deps) |
| Runtime type checks | **No** (types at compile time only) | No | Yes (runtime validation) |
| TypeScript declarations | **Built-in, ships with package** | Requires `@types/ramda` | Ships with package |
| Deep import for tree-shaking (CJS) | **Supported** (`require('fpure/dist/list/map')`) | Not supported (single 351 KB `dist/ramda.js`) | N/A |
| Deep import for tree-shaking (ESM) | Not yet (CJS-only — works via bundler interop) | Supported (`import map from 'ramda/es/map'`) | Supported |
| Per-function internal dependencies | **1** (`curry`) | 2–8 (`_curry2`, `_dispatchable`, `_xmap`, etc.) | Varies |
| Data-last `sub(3)(10)` | **`7`** (10 − 3) | `−7` (3 − 10) | `7` |
| Data-last `gt(3)(5)` | **`true`** (5 > 3) | `false` (3 > 5) | `true` |
| Function count | 147 | ~300 | ~100 |

### Key differentiators

**Data-last for ALL binary ops.** Ramda's `sub`, `div`, `mod`, and `gt`/`lt`/`gte`/`lte` use config-first ordering that produces surprising results (`sub(3)(10)` = `-7`, `gt(3)(5)` = `false`). fpure is consistently data-last: `sub(3)(10)` = `7`, `gt(3)(5)` = `true`.

**Minimal per-function overhead.** Each Ramda function imports 2–8 internal helpers (`_curry2`, `_dispatchable`, `_xfilter`, etc.). Every fpure function imports only `curry` — one dependency, zero shared machinery beyond that. This keeps bundles lean even without advanced tree-shaking.

**CJS tree-shakeable.** fpure ships every function as a standalone CommonJS file. You can deep-import `require('fpure/dist/list/map')` and get exactly that function + `curry` — no barrel overhead, no bundled internals. Ramda's CJS entry is a single 351 KB `dist/ramda.js` bundle with no CJS per-function alternative.

**Zero runtime type overhead.** Sanctuary validates types at runtime. fpure uses TypeScript types only — zero runtime cost, faster execution, smaller bundles.

---

## Table of Contents

- [Curry](#curry)
- [Function Combinators](#function-combinators)
- [Math](#math)
- [Relation](#relation)
- [List](#list)
- [Object](#object)
- [String](#string)
- [Type](#type)

---

## Curry

### `curry`

Wraps a function so partial application returns a curried function until all args are satisfied.

```ts
const add = curry((a: number, b: number) => a + b)
add(1, 2)    // => 3
add(1)(2)    // => 3
const inc = add(1)
inc(5)       // => 6
```

---

## Function Combinators

### `compose`

Right-to-left function composition.

```ts
compose(x => x + 1, x => x * 2)(5)  // => 11  (5*2 + 1)
```

### `pipe`

Left-to-right function composition.

```ts
pipe(x => x + 1, x => x * 2)(5)  // => 12  ((5+1)*2)
```

### `identity`

```ts
identity(5)       // => 5
identity({a:1})   // => {a:1}
```

### `always`

Creates a function that always returns the given value.

```ts
const f = always(42)
f()        // => 42
f(1, 2, 3) // => 42
```

### `T`

Always returns `true`.

### `F`

Always returns `false`.

### `flip`

Swaps the first two arguments of a function.

```ts
const sub = curry((a, b) => a - b)
flip(sub, 3, 10)  // => 7  (calls sub(10, 3))
```

### `apply`

Applies a function to an argument.

```ts
apply(x => x + 1, 5)  // => 6
```

### `tap`

Runs a side-effect function on a value, returns the value.

```ts
tap(console.log, 42)  // logs 42, returns 42
```

### `juxt`

Applies a list of functions to the same arguments, returns results.

```ts
juxt([x => x + 1, x => x * 2])(5)  // => [6, 10]
```

### `once`

Wraps a function so it only executes once. Subsequent calls return the cached result.

### `memoize`

Wraps a function so results are cached by argument identity (JSON-serialized).

### `converge`

Accepts a converging function and a list of branches. Returns a function that applies branches to its args, then feeds results to the converger.

```ts
converge((a, b) => a + b, [x => x * 2, x => x * 3])(5)  // => 25  (10 + 15)
```

---

## Math

All binary math ops use **data-last**: `op(config, value)` = `value op config`.

### `add`

```ts
add(4, 5)  // => 9
add(4)(5)  // => 9
```

### `sub`

```ts
sub(3, 10)  // => 7   (10 - 3)
sub(3)(10)  // => 7
```

### `mul`

```ts
mul(4, 5)  // => 20
```

### `div`

```ts
div(2, 10)  // => 5   (10 / 2)
div(2)(10)  // => 5
```

### `mod`

```ts
mod(3, 10)  // => 1   (10 % 3)
```

### `mathMod`

True modulo (not remainder). Only works with positive integer modulus.

```ts
mathMod(5, 17)   // => 2
mathMod(5, -17)  // => 3
mathMod(5, 17.2) // => NaN  (non-integer)
mathMod(-5, 17)  // => NaN  (non-positive modulus)
```

### `inc`

```ts
inc(5)  // => 6
```

### `dec`

```ts
dec(5)  // => 4
```

### `negate`

```ts
negate(5)  // => -5
```

### `sum`

```ts
sum([1, 2, 3, 4])  // => 10
sum([])            // => 0
```

### `product`

```ts
product([1, 2, 3, 4])  // => 24
product([])            // => 1
```

### `mean`

```ts
mean([1, 2, 3, 4])  // => 2.5
```

### `median`

```ts
median([1, 2, 3, 4, 5])  // => 3
median([1, 2, 3, 4])      // => 2.5
```

### `min`

```ts
min(3, 5)  // => 3
```

### `max`

```ts
max(3, 5)  // => 5
```

### `clamp`

```ts
clamp(1, 10, 5)   // => 5
clamp(1, 10, 0)   // => 1
clamp(1, 10, 15)  // => 10
```

### `minBy`

```ts
const byLength = x => x.length
minBy(byLength, 'short', 'longer')  // => 'short'
```

### `maxBy`

```ts
maxBy(byLength, 'short', 'longer')  // => 'longer'
```

---

## Relation

All binary comparisons use **data-last**: `cmp(threshold, value)` = `value > threshold`.

### `gt`

Greater than.

```ts
gt(3, 5)   // => true  (5 > 3)
gt(5, 3)   // => false
gt(3)(5)   // => true  — "is arg > 3?"

const gt5 = gt(5)
gt5(10)    // => true
gt5(3)     // => false
```

### `lt`

Less than.

```ts
lt(5, 3)   // => true  (3 < 5)
lt(3, 5)   // => false
```

### `gte`

Greater than or equal.

```ts
gte(3, 5)  // => true
gte(3, 3)  // => true
gte(5, 3)  // => false
```

### `lte`

Less than or equal.

```ts
lte(5, 3)  // => true
lte(3, 3)  // => true
lte(3, 5)  // => false
```

### `identical`

Same-value-zero equality (like `Object.is`).

```ts
identical(1, 1)       // => true
identical(1, '1')     // => false
identical(NaN, NaN)   // => true
identical(0, -0)      // => false
identical([], [])     // => false
```

### `equals`

Deep equality. Handles arrays, nested objects, Dates, RegExps, Maps, Sets, circular references.

```ts
equals([1, [2, 3]], [1, [2, 3]])  // => true
equals({a: 1, b: {c: 3}}, {a: 1, b: {c: 3}})  // => true
equals(new Date(0), new Date(0))  // => true
```

---

## List

Data-last: the list is always the last argument.

### `map`

```ts
map(x => x * 2, [1, 2, 3])  // => [2, 4, 6]
```

### `filter`

```ts
filter(x => x > 1, [1, 2, 3])  // => [2, 3]
```

### `reject`

```ts
reject(x => x > 1, [1, 2, 3])  // => [1]
```

### `reduce`

```ts
reduce((a, b) => a + b, 0, [1, 2, 3])  // => 6
```

### `reduceRight`

```ts
reduceRight((a, b) => a + b, 0, [1, 2, 3])  // => 6
```

### `find`

```ts
find(x => x > 1, [1, 2, 3])  // => 2
find(x => x > 10, [1, 2, 3]) // => undefined
```

### `findIndex`

```ts
findIndex(x => x > 1, [1, 2, 3])  // => 1
```

### `findLast`

```ts
findLast(x => x < 3, [1, 2, 3, 2, 1])  // => 1 (last match)
```

### `findLastIndex`

```ts
findLastIndex(x => x < 3, [1, 2, 3, 2, 1])  // => 4
```

### `head`

```ts
head([1, 2, 3])  // => 1
head([])         // => undefined
```

### `tail`

```ts
tail([1, 2, 3])  // => [2, 3]
```

### `last`

```ts
last([1, 2, 3])  // => 3
```

### `init`

```ts
init([1, 2, 3])  // => [1, 2]
```

### `take`

```ts
take(2, [1, 2, 3, 4])  // => [1, 2]
```

### `drop`

```ts
drop(2, [1, 2, 3, 4])  // => [3, 4]
```

### `takeWhile`

```ts
takeWhile(x => x < 3, [1, 2, 3, 4])  // => [1, 2]
```

### `dropWhile`

```ts
dropWhile(x => x < 3, [1, 2, 3, 4])  // => [3, 4]
```

### `takeLast`

```ts
takeLast(2, [1, 2, 3, 4])  // => [3, 4]
```

### `dropLast`

```ts
dropLast(2, [1, 2, 3, 4])  // => [1, 2]
```

### `slice`

```ts
slice(1, 3, [1, 2, 3, 4])  // => [2, 3]
```

### `splitAt`

```ts
splitAt(2, [1, 2, 3, 4])  // => [[1, 2], [3, 4]]
```

### `splitEvery`

```ts
splitEvery(2, [1, 2, 3, 4, 5])  // => [[1, 2], [3, 4], [5]]
```

### `remove`

Removes `count` elements starting at `start`.

```ts
remove(1, 2, [1, 2, 3, 4])  // => [1, 4]
```

### `insert`

Inserts an element at the given index.

```ts
insert(1, 99, [1, 2, 3])  // => [1, 99, 2, 3]
```

### `insertAll`

Inserts multiple elements at the given index.

```ts
insertAll(1, [99, 100], [1, 2, 3])  // => [1, 99, 100, 2, 3]
```

### `update`

Replaces the element at the given index.

```ts
update(1, 99, [1, 2, 3])  // => [1, 99, 3]
```

### `adjust`

Applies a function to the element at the given index.

```ts
adjust(x => x * 10, 1, [1, 2, 3])  // => [1, 20, 3]
```

### `append`

```ts
append(4, [1, 2, 3])  // => [1, 2, 3, 4]
```

### `prepend`

```ts
prepend(0, [1, 2, 3])  // => [0, 1, 2, 3]
```

### `concat`

```ts
concat([1, 2], [3, 4])  // => [1, 2, 3, 4]
```

### `flatten`

Recursively flattens nested arrays.

```ts
flatten([1, [2, [3]], 4])  // => [1, 2, 3, 4]
```

### `chain`

Maps a function over a list and flattens (flatMap).

```ts
chain(x => [x, x * 2], [1, 2, 3])  // => [1, 2, 2, 4, 3, 6]
```

### `interpose`

Inserts a separator between elements.

```ts
interpose(', ', [1, 2, 3])  // => [1, ', ', 2, ', ', 3]
```

### `intercalate`

Inserts a separator list between sublists and flattens.

```ts
intercalate([', '], [[1], [2], [3]])  // => [1, ', ', 2, ', ', 3]
```

### `repeat`

```ts
repeat(5, 3)  // => [5, 5, 5]
```

### `times`

Calls a function `n` times with the index.

```ts
times(x => x * 2, 5)  // => [0, 2, 4, 6, 8]
```

### `zip`

```ts
zip([1, 2, 3], ['a', 'b', 'c'])  // => [[1, 'a'], [2, 'b'], [3, 'c']]
zip([1, 2, 3], ['a', 'b'])       // => [[1, 'a'], [2, 'b']]
```

### `zipObj`

```ts
zipObj(['a', 'b', 'c'], [1, 2, 3])  // => {a: 1, b: 2, c: 3}
```

### `zipWith`

```ts
zipWith((a, b) => a + b, [1, 2, 3], [10, 20, 30])  // => [11, 22, 33]
```

### `groupBy`

Groups list elements by a key function.

```ts
groupBy(x => x > 2 ? 'big' : 'small', [1, 2, 3, 4])
// => { small: [1, 2], big: [3, 4] }
```

### `groupWith`

Groups consecutive equal elements.

```ts
groupWith((a, b) => a === b, [1, 1, 2, 2, 3])
// => [[1, 1], [2, 2], [3]]
```

### `sort`

Creates a sorted copy (mutates nothing).

```ts
sort((a, b) => a - b, [3, 1, 2])  // => [1, 2, 3]
```

### `sortBy`

Sorts by a transform function.

```ts
sortBy(x => x.length, ['aaa', 'b', 'cc'])  // => ['b', 'cc', 'aaa']
```

### `asc`

Ascending numeric sort.

```ts
asc([3, 1, 2])  // => [1, 2, 3]
```

### `desc`

Descending numeric sort.

```ts
desc([1, 2, 3])  // => [3, 2, 1]
```

### `all`

```ts
all(x => x > 0, [1, 2, 3])   // => true
all(x => x > 1, [1, 2, 3])   // => false
```

### `any`

```ts
any(x => x > 2, [1, 2, 3])   // => true
any(x => x > 10, [1, 2, 3])  // => false
```

### `none`

```ts
none(x => x > 10, [1, 2, 3]) // => true
none(x => x > 1, [1, 2, 3])  // => false
```

### `includes`

```ts
includes(2, [1, 2, 3])  // => true
includes(4, [1, 2, 3])  // => false
```

### `without`

Removes specified values.

```ts
without([1, 2], [1, 2, 1, 3, 2, 4])  // => [3, 4]
```

### `difference`

Elements in the second list not in the first.

```ts
difference([1, 2, 3], [2, 3, 4])  // => [4]
```

### `intersection`

Elements in both lists.

```ts
intersection([1, 2, 3], [2, 3, 4])  // => [2, 3]
```

### `union`

Unique elements from both lists.

```ts
union([1, 2, 3], [2, 3, 4])  // => [1, 2, 3, 4]
```

### `uniq`

```ts
uniq([1, 2, 1, 3, 2])  // => [1, 2, 3]
```

### `uniqBy`

Deduplicate by a key function.

```ts
uniqBy(x => x % 2, [1, 2, 3, 4, 5])  // => [1, 2]
```

### `uniqWith`

Deduplicate with a custom comparator.

```ts
uniqWith((a, b) => a % 2 === b % 2, [1, 2, 3, 4, 5])  // => [1, 2]
```

### `aperture`

Returns overlapping subsequences of length `n`.

```ts
aperture(2, [1, 2, 3, 4])  // => [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4])  // => [[1, 2, 3], [2, 3, 4]]
```

### `partition`

Splits into `[pass, fail]` arrays.

```ts
partition(x => x % 2 === 0, [1, 2, 3, 4, 5])
// => [[2, 4], [1, 3, 5]]
```

### `span`

Splits into `[takeWhile, rest]`.

```ts
span(x => x < 3, [1, 2, 3, 4, 1])  // => [[1, 2], [3, 4, 1]]
```

### `pluck`

Extracts a key from each object in a list.

```ts
pluck('a', [{a: 1}, {a: 2}])  // => [1, 2]
```

### `project`

Selects specific keys from a list of objects.

```ts
project(['a', 'b'], [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}])
// => [{a: 1, b: 2}, {a: 4, b: 5}]
```

### `fromPairs`

```ts
fromPairs([['a', 1], ['b', 2]])  // => {a: 1, b: 2}
```

### `toPairs`

```ts
toPairs({a: 1, b: 2})  // => [['a', 1], ['b', 2]]
```

### `reverse`

```ts
reverse([1, 2, 3])  // => [3, 2, 1]
```

### `length`

```ts
length([1, 2, 3])  // => 3
```

### `countBy`

Counts occurrences by a key function.

```ts
countBy(x => x > 2 ? 'big' : 'small', [1, 2, 3, 4])
// => { small: 2, big: 2 }
```

### `forEach`

Runs a side effect for each element, returns the original array.

```ts
forEach(x => console.log(x), [1, 2, 3])
// logs 1, 2, 3 and returns [1, 2, 3]
```

### `indexBy`

Indexes a list by a key function. Last duplicate wins.

```ts
indexBy(x => x.id, [{id: 'a', v: 1}, {id: 'b', v: 2}])
// => { a: {id: 'a', v: 1}, b: {id: 'b', v: 2} }
```

---

## Object

### `keys`

```ts
keys({a: 1, b: 2})  // => ['a', 'b']
```

### `values`

```ts
values({a: 1, b: 2})  // => [1, 2]
```

### `entries`

```ts
entries({a: 1, b: 2})  // => [['a', 1], ['b', 2]]
```

### `has`

Own-property check.

```ts
has('a', {a: 1})   // => true
has('toString', {}) // => false
```

### `path`

Safely access nested paths.

```ts
path(['a', 'b'], {a: {b: 42}})  // => 42
path(['a', 'c'], {a: {b: 42}})  // => undefined
```

### `pathOr`

```ts
pathOr(99, ['a', 'c'], {a: {b: 42}})  // => 99
```

### `prop`

```ts
prop('a', {a: 42})  // => 42
```

### `propOr`

```ts
propOr(99, 'b', {a: 42})  // => 99
```

### `props`

```ts
props(['a', 'b'], {a: 1, b: 2, c: 3})  // => [1, 2]
```

### `assoc`

```ts
assoc('b', 2, {a: 1})   // => {a: 1, b: 2}
assoc('a', 2, {a: 1})   // => {a: 2}
```

### `assocPath`

```ts
assocPath(['a', 'b'], 42, {})  // => {a: {b: 42}}
```

### `dissoc`

```ts
dissoc('a', {a: 1, b: 2, c: 3})  // => {b: 2, c: 3}
```

### `dissocPath`

```ts
dissocPath(['a', 'b'], {a: {b: 1, c: 2}, d: 3})
// => {a: {c: 2}, d: 3}
```

### `merge`

```ts
merge({a: 1}, {b: 2})  // => {a: 1, b: 2}
```

### `mergeAll`

```ts
mergeAll([{a: 1}, {b: 2}, {c: 3}])  // => {a: 1, b: 2, c: 3}
```

### `mergeLeft`

Same as `merge` (left-biased).

### `mergeRight`

Right-biased merge (right wins).

```ts
mergeRight({a: 1}, {a: 2})  // => {a: 2}
```

### `mergeDeepRight`

Deep recursive merge.

```ts
mergeDeepRight({a: {b: 1}}, {a: {c: 2}})
// => {a: {b: 1, c: 2}}
```

### `pick`

```ts
pick(['a', 'c'], {a: 1, b: 2, c: 3})  // => {a: 1, c: 3}
```

### `pickBy`

```ts
pickBy(v => typeof v === 'number', {a: 1, b: 'x', c: 3})
// => {a: 1, c: 3}
```

### `omit`

```ts
omit(['a', 'c'], {a: 1, b: 2, c: 3})  // => {b: 2}
```

### `omitBy`

```ts
omitBy(v => typeof v === 'number', {a: 1, b: 'x', c: 3})
// => {b: 'x'}
```

### `where`

Tests if an object matches a predicate spec.

```ts
where({a: x => x > 0, b: x => x.length > 1}, {a: 5, b: 'hi'})
// => true
```

### `whereEq`

Tests if an object matches a value spec.

```ts
whereEq({a: 1, b: 'hi'}, {a: 1, b: 'hi', c: 3})
// => true
```

### `evolve`

Recursively transforms an object's values by a spec.

```ts
evolve({a: x => x * 2, b: x => x + 1}, {a: 5, b: 10, c: 99})
// => {a: 10, b: 11, c: 99}
```

### `applySpec`

Creates a function that applies args to a spec of functions.

```ts
const spec = applySpec({sum: (...xs) => xs.reduce((a,b) => a+b), max: Math.max})
spec(1, 2, 3)  // => {sum: 6, max: 3}
```

### Lenses

Lenses provide focused access and immutability on nested data.

#### `lensProp`

```ts
const l = lensProp('a')
view(l, {a: 1, b: 2})           // => 1
set(l, 42, {a: 1, b: 2})        // => {a: 42, b: 2}
over(l, x => x + 1, {a: 1, b: 2})  // => {a: 2, b: 2}
```

#### `lensPath`

```ts
const l = lensPath(['a', 'b', 'c'])
view(l, {a: {b: {c: 42}}})        // => 42
set(l, 99, {a: {b: {c: 42}}})     // => {a: {b: {c: 99}}}
```

#### `lensIndex`

```ts
const l = lensIndex(1)
view(l, [10, 20, 30])        // => 20
set(l, 99, [10, 20, 30])     // => [10, 99, 30]
over(l, x => x + 5, [10, 20, 30])  // => [10, 25, 30]
```

#### `view`

Extracts the focused value.

#### `set`

Sets the focused value (returns new object, original unchanged).

#### `over`

Applies a function to the focused value.

---

## String

### `toUpper`

```ts
toUpper('hello')  // => 'HELLO'
```

### `toLower`

```ts
toLower('HELLO')  // => 'hello'
```

### `trim`

```ts
trim('  hello  ')  // => 'hello'
```

### `split`

```ts
split(',', 'a,b,c')  // => ['a', 'b', 'c']
```

### `join`

```ts
join(',', ['a', 'b', 'c'])  // => 'a,b,c'
```

### `replace`

```ts
replace('world', 'there', 'hello world')  // => 'hello there'
replace(/o/g, '0', 'hello')              // => 'hell0'
```

### `test`

```ts
test(/hello/, 'hello world')  // => true
```

### `match`

```ts
match(/h(\w)/, 'hello')  // => ['he', 'e']  (RegExpMatchArray)
```

### `startsWith`

```ts
startsWith('hello', 'hello world')  // => true
```

### `endsWith`

```ts
endsWith('world', 'hello world')  // => true
```

### `padStart`

```ts
padStart(5, '0', '42')  // => '00042'
```

### `padEnd`

```ts
padEnd(5, '0', '42')  // => '42000'
```

---

## Type

### `type`

Returns the internal `[[Class]]` name.

```ts
type({})             // => 'Object'
type([])             // => 'Array'
type(null)           // => 'Null'
type(undefined)      // => 'Undefined'
type(() => {})       // => 'Function'
type(/[A-Z]/)        // => 'RegExp'
```

### `is`

Checks if a value is an instance of a constructor.

```ts
is(Array, [])     // => true
is(RegExp, /x/)   // => true
```

### `isNil`

```ts
isNil(null)       // => true
isNil(undefined)  // => true
isNil(0)          // => false
```

### `isArray`

```ts
isArray([])   // => true
isArray({})   // => false
```

### `isObject`

Plain object check (not array, not null).

```ts
isObject({})      // => true
isObject([])      // => false
isObject(null)    // => false
```

### `isString`

```ts
isString('hello')  // => true
isString(42)       // => false
```

### `isNumber`

Excludes NaN.

```ts
isNumber(42)   // => true
isNumber(NaN)  // => false
```

### `isBoolean`

```ts
isBoolean(true)   // => true
isBoolean(false)  // => true
isBoolean(0)      // => false
```

### `isFunction`

```ts
isFunction(() => {})  // => true
```

### `isDate`

```ts
isDate(new Date())  // => true
```

### `isRegExp`

```ts
isRegExp(/test/)  // => true
```

### `isError`

```ts
isError(new Error())  // => true
```

### `isPromise`

Detects thenables.

```ts
isPromise(Promise.resolve())  // => true
isPromise({then: () => {}})  // => true
```

### `isInteger`

```ts
isInteger(42)    // => true
isInteger(3.14)  // => false
```

### `isFiniteNum`

```ts
isFiniteNum(42)       // => true
isFiniteNum(Infinity) // => false
isFiniteNum(NaN)      // => false
```

### `isNaNVal`

```ts
isNaNVal(NaN)  // => true
isNaNVal(42)   // => false
```

---

## Design

### Parameter Ordering

All binary operations follow **data-last, config-first**: the thing you're likely to partially apply comes first, the data comes last.

| Function | Call | Meaning | Ramda (for comparison) |
|----------|------|---------|----------------------|
| `sub(3)(10)` | `10 - 3 = 7` | subtract 3 from 10 | `R.subtract(3,10)` = `-7` |
| `div(2)(10)` | `10 / 2 = 5` | divide 10 by 2 | `R.divide(2,10)` = `0.2` |
| `gt(3)(5)` | `5 > 3 = true` | is arg > 3? | `R.gt(3,5)` = `false` |
| `mod(3)(10)` | `10 % 3 = 1` | 10 mod 3 | `R.mod(3,10)` = `3` |

### Immutability

Every function returns a new value. Inputs are never mutated.

### Purity

No side effects in logic functions. `tap` and `forEach` are the only exceptions — they're explicitly for side effects.

### No Inference

Unlike Ramda, fpure never inspects argument types to guess your intent. TypeScript handles type safety at compile time. Runtime is strict.
