import { curry } from '../function/curry';
export const takeLast = curry((n: number, arr: unknown[]): unknown[] => arr.slice(-n || arr.length));
