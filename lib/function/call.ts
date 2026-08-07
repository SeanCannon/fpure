export const call = <A extends any[], R>(fn: (...args: A) => R, ...args: A): R => fn(...args);
