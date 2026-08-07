export const unary = <A, R>(fn: (...args: any[]) => R) => (a: A): R => fn(a);
