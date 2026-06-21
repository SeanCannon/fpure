import { curry } from '../function/curry';
export const drop = curry((n: number, arr: unknown[]): unknown[] => arr.slice(n));
