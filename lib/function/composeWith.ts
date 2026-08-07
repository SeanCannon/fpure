import { curry } from './curry';
export const composeWith = curry(<T>(xf: (f: (x: T) => T, g: (x: T) => T) => (x: T) => T, fns: Array<(x: T) => T>): ((x: T) => T) =>
  fns.reduceRight((g, f) => xf(f, g)));
