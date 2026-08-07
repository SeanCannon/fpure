export const flow = <T>(...fns: Array<(x: T) => T | Promise<T>>) => (x: T): Promise<T> =>
  fns.reduce<Promise<T>>(async (acc, fn) => fn(await acc), Promise.resolve(x));
