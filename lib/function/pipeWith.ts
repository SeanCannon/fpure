import { curry } from './curry';
export const pipeWith = curry(<T>(xf: (f: (x: T) => T, g: (x: T) => T) => (x: T) => T, fns: Array<(x: T) => T>): ((x: T) => T) =>
  fns.reduce((g, f) => xf(g, f)));
