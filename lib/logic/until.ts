import { curry } from '../function/curry';

export const until = curry(<A>(pred: (a: A) => boolean, fn: (a: A) => A, init: A): A => {
  let val = init;
  while (!pred(val)) val = fn(val);
  return val;
});
