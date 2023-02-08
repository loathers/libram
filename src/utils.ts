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
 * @param property Property of the elements to be summing
 */
export function sum<
  S extends string | number | symbol,
  T extends { [s in S]: number }
>(addends: T[], property: S): number;
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction Mapping function to turn addends into actual numbers.
 */
export function sum<T>(
  addends: T[],
  mappingFunction: (element: T) => number
): number;
export function sum<
  S extends string | number | symbol,
  T extends { [s in S]: number }
>(addends: T[], x: ((element: T) => number) | S): number {
  return addends.reduce(
    (subtotal, element) =>
      subtotal + (typeof x === "function" ? x(element) : element[x]),
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
 * Splits a string by commas while also respecting escaping commas with a backslash
 * @param str String to split
 * @returns List of tokens
 */
export function splitByCommasWithEscapes(str: string): string[] {
  const returnValue = [];

  let ignoreNext = false;
  let currentString = "";

  for (const char of str.split("")) {
    if (char === "\\") {
      ignoreNext = true;
    } else {
      if (char == "," && !ignoreNext) {
        returnValue.push(currentString.trim());
        currentString = "";
      } else {
        currentString += char;
      }
      ignoreNext = false;
    }
  }
  returnValue.push(currentString.trim());

  return returnValue;
}

/**
 * Find the best element of an array, where "best" is defined by some given criteria.
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 */
export function maxBy<T>(
  array: T[] | readonly T[],
  optimizer: (element: T) => number,
  reverse?: boolean
): T;
export function maxBy<
  S extends string | number | symbol,
  T extends { [x in S]: number }
>(array: T[] | readonly T[], key: S, reverse?: boolean): T;
export function maxBy<
  S extends string | number | symbol,
  T extends { [x in S]: number }
>(
  array: T[] | readonly T[],
  optimizer: ((element: T) => number) | S,
  reverse = false
): T {
  if (!array.length) throw new Error("Cannot call maxBy on an empty array!");
  if (typeof optimizer === "function") {
    return [...array].reduce(
      ({ value, item }, other) => {
        const otherValue = optimizer(other);
        return value >= otherValue !== reverse
          ? { value, item }
          : { value: otherValue, item: other };
      },
      { item: array[0], value: optimizer(array[0]) }
    ).item;
  } else {
    return array.reduce((a, b) =>
      a[optimizer] >= b[optimizer] !== reverse ? a : b
    );
  }
}

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _tupleOf<T, N, []>
  : never;
type _tupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _tupleOf<T, N, [T, ...R]>;

export function arrayEquals<T>(
  left: T[] | readonly T[],
  right: T[] | readonly T[]
): boolean {
  if (left.length !== right.length) return false;
  return left.every((element, index) => element === right[index]);
}
