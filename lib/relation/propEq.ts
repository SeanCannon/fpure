import { curry } from '../function/curry';
export const propEq = curry(<K extends string, V>(target: V, prop: K, obj: Record<K, V>): boolean => Object.is(obj[prop], target));
