export const converge = (after: (...xs: any[]) => any, fns: ((...xs: any[]) => any)[]) => (...args: any[]): any => after(...fns.map(fn => fn(...args)));
