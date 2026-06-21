export const type = (a: unknown): string => Object.prototype.toString.call(a).slice(8, -1);
