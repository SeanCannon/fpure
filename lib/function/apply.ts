import { curry } from './curry';
export const apply = curry(<A, B>(fn: (a: A) => B, arg: A): B => fn(arg));
