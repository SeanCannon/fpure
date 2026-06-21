export const entries = <K extends string, V>(o: Record<K, V>): [K, V][] => Object.entries(o) as [K, V][];
