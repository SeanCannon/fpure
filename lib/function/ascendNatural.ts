export const ascendNatural = (locale: string | string[]) => (a: string, b: string): number =>
  a.localeCompare(b, locale);
