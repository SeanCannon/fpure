import { curry } from './curry';
export const flip = curry(<A, B, C>(fn: (a: A, b: B) => C, b: B, a: A): C => fn(a, b));
