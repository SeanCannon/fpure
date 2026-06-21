import { curry } from '../function/curry';
export const splitAt = curry((i: number, arr: unknown[]): unknown[][] => [arr.slice(0, i), arr.slice(i)]);
