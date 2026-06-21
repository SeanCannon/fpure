import { curry } from '../function/curry';
export const dropLast = curry((n: number, arr: unknown[]): unknown[] => arr.slice(0, -n || arr.length));
