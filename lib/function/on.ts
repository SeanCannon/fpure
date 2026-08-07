import { curry } from './curry';
export const on = curry(<A, B, C>(fn: (b: B, b2: B) => C, g: (a: A) => B, a1: A, a2: A): C => fn(g(a1), g(a2)));
