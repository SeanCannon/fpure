'use strict';

const compose  = (f, g) => (...args) => f(g(...args));
const composeP = (f, g) => (...args) => g(...args).then(f);
const curry    = (fn, ...args) => args.length === fn.length ? fn(...args) : curry.bind(null, fn, ...args);
const sort     = (fn, arr) => Array.from(arr).sort(fn);

const iter2arr = iter => {
  let arr = [], next;
  while (!(next = iter.next()).done) {
    arr.push(next.value);
  }
  return arr;
};

const containsWith = (fn, a, arr) => {
  let i = 0;
  const len = arr.length;

  while (i < len) {
    if (fn(a, arr[i])) {
      return true;
    }
    i += 1;
  }
  return false;
};

module.exports = {
  compose,
  composeP,
  curry,
  sort,
  iter2arr,
  containsWith
};
