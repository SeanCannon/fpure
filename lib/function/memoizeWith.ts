export const memoizeWith = <A extends any[], R>(keyFn: (...args: A) => string, fn: (...args: A) => R) => {
  const cache = new Map<string, R>();
  return (...args: A): R =>
    cache.has(keyFn(...args)) ? cache.get(keyFn(...args))! : (cache.set(keyFn(...args), fn(...args)), cache.get(keyFn(...args))!);
};
