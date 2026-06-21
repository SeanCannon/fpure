export const compose = <T>(...fns: ((x: T) => T)[]) => (x: T): T => fns.reduceRight((v, f) => f(v), x);
