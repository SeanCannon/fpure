export const is = <T>(ctor: new (...args: any[]) => T, val: unknown): val is T => val instanceof ctor;
