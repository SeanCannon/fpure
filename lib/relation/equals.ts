import { curry } from '../function/curry';
import { identical } from './identical';

const _iter2arr = (iter: Iterator<unknown>): unknown[] => {
  const arr: unknown[] = [];
  let next: IteratorResult<unknown>;
  while (!(next = iter.next()).done) arr.push(next.value);
  return arr;
};

const _containsWith = (fn: (a: unknown, b: unknown) => boolean, a: unknown, arr: unknown[]): boolean => {
  for (let i = 0; i < arr.length; i++) if (fn(a, arr[i])) return true;
  return false;
};

const _uniqContentEquals = (iterA: Iterator<unknown>, iterB: Iterator<unknown>, stackA: unknown[], stackB: unknown[]) => {
  const a = _iter2arr(iterA), b = _iter2arr(iterB);
  const eq = (x: unknown, y: unknown) => __equals(x, y, stackA.slice(), stackB.slice());
  return !_containsWith((bItem, aItem) => !_containsWith(eq, aItem, b as unknown[]), b, a);
};

const __equals = (a: unknown, b: unknown, stackA: unknown[], stackB: unknown[]): boolean => {
  if (a === null || b === null) return a === b;
  if (identical(a, b)) return true;
  const typeA = Object.prototype.toString.call(a).slice(8, -1);
  const typeB = Object.prototype.toString.call(b).slice(8, -1);
  if (typeA !== typeB) return false;

  switch (typeA) {
    case 'Boolean': case 'Number': case 'String': case 'Date':
      if (!identical((a as any).valueOf(), (b as any).valueOf())) return false;
      break;
    case 'Error':
      if ((a as Error).name !== (b as Error).name || (a as Error).message !== (b as Error).message) return false;
      break;
    case 'RegExp':
      if ((a as RegExp).source !== (b as RegExp).source || (a as RegExp).flags !== (b as RegExp).flags) return false;
      break;
  }

  let si = stackA.length - 1;
  while (si >= 0) { if (stackA[si] === a) return stackB[si] === b; si--; }

  switch (typeA) {
    case 'Map':
      if ((a as Map<any, any>).size !== (b as Map<any, any>).size) return false;
      return _uniqContentEquals((a as Map<any, any>).entries(), (b as Map<any, any>).entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if ((a as Set<any>).size !== (b as Set<any>).size) return false;
      return _uniqContentEquals((a as Set<any>).values(), (b as Set<any>).values(), stackA.concat([a]), stackB.concat([b]));
  }

  if (typeof a === 'function' && typeof (a as any).then === 'function') return a === b;

  if (typeof a === 'object' && a !== null) {
    const keysA = Object.keys(a as any);
    if (keysA.length !== Object.keys(b as any).length) return false;
    const extA = stackA.concat([a]), extB = stackB.concat([b]);
    for (let i = 0; i < keysA.length; i++) {
      const k = keysA[i];
      if (!Object.prototype.hasOwnProperty.call(b, k) || !__equals((b as any)[k], (a as any)[k], extA, extB)) return false;
    }
    return true;
  }

  return false;
};

export const equals = curry((a: unknown, b: unknown): boolean => __equals(a, b, [], []));
