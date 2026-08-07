import { curry } from '../function/curry';
export const modify = curry(<K extends string, V, R>(prop: K, fn: (val: V) => R, obj: Record<K, V>): Record<K, V | R> => ({ ...obj, [prop]: fn(obj[prop]) }));
