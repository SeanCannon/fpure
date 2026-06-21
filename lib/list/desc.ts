export const desc = <A extends number>(arr: A[]): A[] => [...arr].sort((a, b) => (b as any) - (a as any));
