import { curry } from '../function/curry';
export const adjust = curry((fn: (x: unknown) => unknown, i: number, arr: unknown[]): unknown[] =>
  arr.map((v, j) => j === i ? fn(v) : v)
);
