export const once = <A extends any[], R>(fn: (...args: A) => R) => {
  let called = false, result: R;
  return (...args: A): R => called ? result : (called = true, result = fn(...args));
};
