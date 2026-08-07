import { curry } from '../function/curry';
export const defaultTo = curry(<A>(defaultVal: A, val: A | null | undefined): A => val ?? defaultVal);
