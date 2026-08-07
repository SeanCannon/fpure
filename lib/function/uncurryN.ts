export const uncurryN = <A extends any[], R>(n: number, fn: (...args: any[]) => any): ((...args: A) => R) =>
  (...args: A): R => {
    let acc: any = fn;
    for (let i = 0; i < args.length && i < n; i++) acc = acc(args[i]);
    return acc;
  };
