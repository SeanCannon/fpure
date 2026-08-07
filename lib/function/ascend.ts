export const ascend = <A>(fn: (a: A) => unknown) => (a: A, b: A): number => {
  const fa = fn(a) as any, fb = fn(b) as any;
  return fa < fb ? -1 : fa > fb ? 1 : 0;
};
