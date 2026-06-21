import { curry } from '../function/curry';
export const splitEvery = curry((n: number, arr: unknown[]): unknown[][] =>
  [...Array(Math.ceil(arr.length / n)).keys()].map((_, i) => arr.slice(i * n, (i + 1) * n))
);
