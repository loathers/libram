export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function parseNumber(n: string): number {
  return Number.parseInt(n.replace(/,/g, ""));
}

/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */
export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */
export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

export function arrayToCountedMap<T>(
  array: T[] | Map<T, number>
): Map<T, number> {
  if (!Array.isArray(array)) return array;

  const map = new Map<T, number>();

  array.forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });

  return map;
}

export function countedMapToArray<T>(map: Map<T, number>): T[] {
  return ([] as T[]).concat(
    ...[...map].map(([item, quantity]) => Array(quantity).fill(item))
  );
}

export function countedMapToString<T>(map: Map<T, number>): string {
  return [...map].map(([item, quantity]) => `${quantity} x ${item}`).join(", ");
}

/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

export function sum<T>(
  addends: T[],
  mappingFunction: (element: T) => number
): number {
  return addends.reduce(
    (subtotal, element) => subtotal + mappingFunction(element),
    0
  );
}

export function sumNumbers(addends: number[]): number {
  return sum(addends, (x: number) => x);
}

/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */
export function arrayContains<T, A extends T>(
  item: T,
  array: ReadonlyArray<A>
): item is A {
  return array.includes(item as A);
}

/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */
export function setEqual<T>(a: T[], b: T[]): boolean {
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return (
    a.length === b.length &&
    sortedA.every((item, index) => item === sortedB[index])
  );
}

/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */
export function invertMap<T1, T2>(map: Map<T1, T2>): Map<T2, T1> {
  const returnValue = new Map<T2, T1>();
  for (const [key, value] of map) {
    returnValue.set(value, key);
  }
  return returnValue;
}

/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */
export function createStringUnionTypeGuardFunction<T extends string>(
  array: readonly T[]
): (x: string) => x is T {
  return function (x: string): x is T {
    return (array as readonly string[]).includes(x);
  };
}
