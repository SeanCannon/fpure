import { curry } from '../function/curry';
export const eqProps = curry(<K extends string>(prop: K, a: Record<K, unknown>, b: Record<K, unknown>): boolean => a[prop] === b[prop]);
