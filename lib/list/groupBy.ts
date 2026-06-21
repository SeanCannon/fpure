import { curry } from '../function/curry';
export const groupBy = curry(<A>(fn: (a: A) => string, arr: A[]): Record<string, A[]> =>
  arr.reduce((acc, v) => { const k = fn(v); (acc[k] ??= []).push(v); return acc; }, {} as Record<string, A[]>)
);
