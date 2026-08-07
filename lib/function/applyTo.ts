export const applyTo = <A, B>(x: A, fn: (a: A) => B): B => fn(x);
