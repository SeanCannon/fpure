export const transpose = <A>(arr: A[][]): A[][] => {
  if (arr.length === 0) return [];
  return Array.from({ length: Math.max(...arr.map(x => x.length)) }, (_, i) => arr.map(row => row[i]));
};