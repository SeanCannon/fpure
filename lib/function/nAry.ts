import { curry } from './curry';
export const nAry = curry(<R>(n: number, fn: (...args: any[]) => R): (...args: any[]) => R =>
  (...args: any[]) => fn(...args.slice(0, n)));
