import { curry } from './curry';
export const useWith = curry(<A extends any[], B extends any[], R>(fn: (...args: B) => R, transformers: Array<(...args: any[]) => any>, ...args: A): R =>
  fn(...transformers.map((t, i) => t(args[i])) as any));
