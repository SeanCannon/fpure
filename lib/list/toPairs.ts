export const toPairs = <K extends string, V>(obj: Record<K, V>): [K, V][] => Object.entries(obj) as [K, V][];
