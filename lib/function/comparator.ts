export const comparator = <A>(pred: (a: A, b: A) => boolean) => (a: A, b: A): number =>
  pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
