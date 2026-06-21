import { curry } from '../function/curry';
export const mathMod = curry((a: number, b: number): number =>
  (b << 0) === b && (a << 0) === a && a > 0 ? ((b % a) + a) % a : NaN
);
