export class Reduced<T> { constructor(public value: T) {} }
export const reduced = <T>(x: T): Reduced<T> => new Reduced(x);