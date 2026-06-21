import { curry } from '../function/curry';
export const insert = curry((i: number, x: unknown, arr: unknown[]): unknown[] =>
  [...arr.slice(0, i), x, ...arr.slice(i)]
);
