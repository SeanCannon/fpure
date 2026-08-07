import { curry } from './curry';
export const liftN = curry(<A, B, C>(arity: number, fn: (...args: any[]) => C, ...arrs: any[][]): C[] => {
  if (arrs.length === 0) return [];
  const result: C[] = [];
  function helper(idx: number, args: any[]) {
    if (idx === arrs.length) { result.push(fn(...args)); return; }
    for (const val of arrs[idx]) helper(idx + 1, [...args, val]);
  }
  helper(0, []);
  return result;
});
