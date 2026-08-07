import { curry } from '../function/curry';

export const xor = curry((a: unknown, b: unknown): boolean => !!a !== !!b);
