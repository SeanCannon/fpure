import { curry } from '../function/curry';
export const startsWith = curry((search: string, s: string): boolean => s.startsWith(search));
