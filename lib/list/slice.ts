import { curry } from '../function/curry';
export const slice = curry((start: number, end: number, arr: unknown[]): unknown[] => arr.slice(start, end));
