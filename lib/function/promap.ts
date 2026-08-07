export const promap = <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fn: (b: B) => C): (a: A) => D =>
  (x: A) => g(fn(f(x)));
