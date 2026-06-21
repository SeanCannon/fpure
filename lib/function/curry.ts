type CurriedFn<A extends any[], R> = { (...args: A): R } & { (...args: any[]): any };

export const curry = <A extends any[], R>(fn: (...args: A) => R, arity = fn.length): CurriedFn<A, R> => {
  const apply = (...args: any[]) =>
    args.length >= arity ? fn(...args as any) : (...more: any[]) => apply(...args, ...more);
  return apply as CurriedFn<A, R>;
};
