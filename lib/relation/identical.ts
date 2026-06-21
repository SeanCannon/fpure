import { curry } from '../function/curry';
export const identical = curry((a: unknown, b: unknown): boolean =>
  a === b ? (a !== 0 || 1 / (a as number) === 1 / (b as number)) : (a !== a && b !== b)
);
