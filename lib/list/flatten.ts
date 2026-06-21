export const flatten = <A>(arr: A[]): A[] => arr.reduce<A[]>((acc, v) => acc.concat(Array.isArray(v) ? flatten(v) : [v]), []);
