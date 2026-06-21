export const keys = <K extends string>(o: Record<K, any>): K[] => Object.keys(o) as K[];
