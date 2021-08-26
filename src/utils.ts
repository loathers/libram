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
  return [...map].flatMap(([item, quantity]) => Array(quantity).fill(item));
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
