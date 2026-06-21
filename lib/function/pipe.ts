export const pipe = <T>(...fns: ((x: T) => T)[]) => (x: T): T => fns.reduce((v, f) => f(v), x);
