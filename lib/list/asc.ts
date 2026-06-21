export const asc = <A extends number>(arr: A[]): A[] => [...arr].sort((a, b) => (a as any) - (b as any));
