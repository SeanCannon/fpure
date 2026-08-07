import { curry } from '../function/curry';
export const mapAccum = curry(<A, B, C>(fn: (acc: A, val: B) => [A, C], init: A, arr: B[]): [A, C[]] => {
  let acc = init;
  const result: C[] = [];
  for (const x of arr) { const [a, r] = fn(acc, x); acc = a; result.push(r); }
  return [acc, result];
});