export const isFunction = (v: unknown): v is (...args: any[]) => any => typeof v === 'function';
