import { curry } from '../function/curry';
export const padStart = curry((len: number, fill: string, s: string): string => s.padStart(len, fill));
