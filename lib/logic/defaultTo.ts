import { curry } from '../function/curry';
export const defaultTo = curry(<A>(defaultVal: A, val: A): A => val == null || (typeof val === 'number' && isNaN(val)) ? defaultVal : val);
