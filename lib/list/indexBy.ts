import { curry } from '../function/curry';
export const indexBy = curry(<A>(fn: (x: A) => string, arr: A[]): Record<string, A> =>
  arr.reduce((acc, v) => ({ ...acc, [fn(v)]: v }), {} as Record<string, A>)
);
