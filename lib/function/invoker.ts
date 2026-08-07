import { curry } from './curry';
export const invoker = curry(<A extends any[], R>(name: string, obj: Record<string, (...args: A) => R>, ...args: A): R =>
  obj[name](...args));
