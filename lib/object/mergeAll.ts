export const mergeAll = <A extends Record<string, any>>(objs: A[]): A => objs.reduce((acc, o) => ({ ...acc, ...o }), {} as A);
