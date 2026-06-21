import { curry } from '../function/curry';
export const insertAll = curry((i: number, xs: unknown[], arr: unknown[]): unknown[] =>
  [...arr.slice(0, i), ...xs, ...arr.slice(i)]
);
