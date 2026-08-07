export const unapply = <A extends any[], R>(fn: (...args: A) => R) => (args: A): R => fn(...args);
