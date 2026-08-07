import { curry } from '../function/curry';
import { Reduced } from './reduced';
export const reduceWhile = curry(<A, B>(pred: (acc: A, x: B) => boolean, fn: (acc: A, x: B) => A, init: A, arr: B[]): A => {
  let acc = init;
  for (const x of arr) {
    if (!pred(acc, x)) break;
    const r = fn(acc, x);
    if (r instanceof Reduced) { acc = r.value; break; }
    acc = r;
  }
  return acc;
});