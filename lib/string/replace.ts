import { curry } from '../function/curry';
export const replace = curry((pattern: string | RegExp, replacement: string, s: string): string => s.replace(pattern, replacement));
