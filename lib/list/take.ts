import { curry } from '../function/curry';
export const take = curry((n: number, arr: unknown[]): unknown[] => arr.slice(0, n));
