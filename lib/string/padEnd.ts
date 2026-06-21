import { curry } from '../function/curry';
export const padEnd = curry((len: number, fill: string, s: string): string => s.padEnd(len, fill));
