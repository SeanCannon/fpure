import { curry } from '../function/curry';
export const partition = curry(<A>(fn: (a: A) => boolean, arr: A[]): [A[], A[]] =>
  arr.reduce(([t, f], v) => (fn(v) ? t.push(v) : f.push(v), [t, f]), [[], []] as [A[], A[]])
);
