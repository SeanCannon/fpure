import { curry } from '../function/curry';
export const remove = curry((start: number, count: number, arr: unknown[]): unknown[] =>
  [...arr.slice(0, start), ...arr.slice(start + count)]
);
