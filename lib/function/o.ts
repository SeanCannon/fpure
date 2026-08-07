export const o = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (x: A): C => f(g(x));
