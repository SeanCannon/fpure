import { curry } from './curry';
export const tryCatch = curry(<A, B, C>(tryer: (a: A) => B, catcher: (err: any, a: A) => C, x: A): B | C => {
  try { return tryer(x); } catch (e) { return catcher(e, x); }
});
