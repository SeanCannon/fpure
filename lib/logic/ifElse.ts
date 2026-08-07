import { curry } from '../function/curry';
export const ifElse = curry(<A, B>(pred: (a: A) => boolean, onTrue: (a: A) => B, onFalse: (a: A) => B, x: A): B => pred(x) ? onTrue(x) : onFalse(x));
