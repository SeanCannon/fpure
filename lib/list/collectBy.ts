import { curry } from '../function/curry';
export const collectBy = curry(<A, K>(fn: (a: A) => K, arr: A[]): A[][] => {
  const groups = new Map<K, A[]>();
  const order: K[] = [];
  for (const x of arr) { const key = fn(x); if (!groups.has(key)) { groups.set(key, []); order.push(key); } groups.get(key)!.push(x); }
  return order.map(k => groups.get(k)!);
});