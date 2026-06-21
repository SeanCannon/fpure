import { curry } from '../function/curry';
export const mod = curry((a: number, b: number): number => b % a);
