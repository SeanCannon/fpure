import { curry } from '../function/curry';
export const times = curry(<A>(fn: (i: number) => A, n: number): A[] => [...Array(n)].map((_, i) => fn(i)));
