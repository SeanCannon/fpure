import { curry } from './curry';
export const bind = curry(<A extends any[], R>(fn: (...args: A) => R, ctx: object): (...args: A) => R =>
  fn.bind(ctx));
