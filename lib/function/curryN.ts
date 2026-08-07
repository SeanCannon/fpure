import { curry } from './curry';
export const curryN = curry(<A extends any[], R>(n: number, fn: (...args: A) => R) => curry(fn, n));
