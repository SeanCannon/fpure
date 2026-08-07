import { curry } from '../function/curry';
export const splitWhenever = curry(<A>(pred: (a: A) => boolean, arr: A[]): A[][] => {
  const result: A[][] = [];
  let current: A[] = [];
  for (const x of arr) { if (pred(x)) { result.push(current); current = []; } else current.push(x); }
  result.push(current);
  return result;
});