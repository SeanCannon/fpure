import { curry } from '../function/curry';
export const groupWith = curry(<A>(fn: (a: A, b: A) => boolean, arr: A[]): A[][] =>
  arr.reduce((acc, v) => { if (acc.length && fn(acc[acc.length - 1][0], v)) acc[acc.length - 1].push(v); else acc.push([v]); return acc; }, [] as A[][])
);
