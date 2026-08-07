import { curry } from '../function/curry';
export const mapAccumRight = curry(<A, B, C>(fn: (acc: A, val: B) => [A, C], init: A, arr: B[]): [A, C[]] => {
  let acc = init;
  const result = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) { const [a, r] = fn(acc, arr[i]); acc = a; result[i] = r; }
  return [acc, result];
});