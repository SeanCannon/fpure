export const memoize = <A extends any[], R>(fn: (...args: A) => R) => {
  const cache = new Map<string, R>();
  return (...args: A): R => {
    const key = JSON.stringify(args);
    return cache.has(key) ? cache.get(key)! : (cache.set(key, fn(...args)), cache.get(key)!);
  };
};
