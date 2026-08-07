export const partial = <A extends any[], B extends any[], R>(fn: (...args: [...A, ...B]) => R, ...args: A) =>
  (...rest: B): R => fn(...args, ...rest);
