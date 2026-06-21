import { curry } from '../function/curry';
export const aperture = curry((n: number, arr: unknown[]): unknown[][] =>
  [...Array(Math.max(0, arr.length - n + 1)).keys()].map(i => arr.slice(i, i + n))
);
