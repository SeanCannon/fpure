export const partialRight = <A extends any[], B extends any[], R>(fn: (...args: [...A, ...B]) => R, ...args: B) =>
  (...rest: A): R => fn(...rest, ...args);
