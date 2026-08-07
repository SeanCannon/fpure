export const descendNatural = (locale: string | string[]) => (a: string, b: string): number =>
  b.localeCompare(a, locale);
