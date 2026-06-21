import { curry } from '../function/curry';
export const countBy = curry(<A>(fn: (x: A) => string, arr: A[]): Record<string, number> =>
  arr.reduce((acc, v) => { const k = fn(v); acc[k] = (acc[k] ?? 0) + 1; return acc; }, {} as Record<string, number>)
);
