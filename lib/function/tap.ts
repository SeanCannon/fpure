import { curry } from './curry';
export const tap = curry(<A>(fn: (a: A) => any, a: A): A => { fn(a); return a; });
