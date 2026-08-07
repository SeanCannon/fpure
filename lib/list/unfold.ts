export const unfold = <A, B>(fn: (seed: A) => [B, A] | false, seed: A): B[] => {
  const result: B[] = [];
  let s: A | false = seed;
  while (s !== false) { const pair = fn(s); if (pair === false) break; result.push(pair[0]); s = pair[1]; }
  return result;
};