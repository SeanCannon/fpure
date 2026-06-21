import { curry } from '../function/curry';
export const update = curry((i: number, x: unknown, arr: unknown[]): unknown[] =>
  arr.map((v, j) => j === i ? x : v)
);
