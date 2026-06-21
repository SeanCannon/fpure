export const juxt = <A extends any[], R>(fns: ((...args: A) => R)[]) => (...args: A): R[] => fns.map(fn => fn(...args));
