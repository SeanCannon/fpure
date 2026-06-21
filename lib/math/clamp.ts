import { curry } from '../function/curry';
export const clamp = curry((min: number, max: number, v: number): number => v < min ? min : v > max ? max : v);
