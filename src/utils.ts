/**
 * Type guard against null value
 *
 * @param value Value that can be null
 * @returns Whether the value is not null or... not
 */
export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

/**
 * Parse string to number, stripping commas
 *
 * @param n Numberical string to parse
 * @returns Numerical value of string
 */
export function parseNumber(n: string): number {
  return Number.parseInt(n.replace(/,/g, ""));
}

/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 * @returns Clamped value
 */
export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 * @returns Split array
 */
export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * @param array Array to select from
 * @returns Random item from array
 */
export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Count distinct values in an array
 *
 * @param array Array of values
 * @returns Map of distinct values to count
 */
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

/**
 * Turn map of distinct values to count into array of values
 *
 * @param map Map to turn into array
 * @returns Array of values
 */
export function countedMapToArray<T>(map: Map<T, number>): T[] {
  return ([] as T[]).concat(
    ...[...map].map(([item, quantity]) => Array(quantity).fill(item))
  );
}

/**
 * Stringify a counted map
 *
 * @param map Map of counted values
 * @returns String representing map of counted values
 */
export function countedMapToString<T>(map: Map<T, number>): string {
  return [...map].map(([item, quantity]) => `${quantity} x ${item}`).join(", ");
}

/**
 * Sum an array of numbers.
 *
 * @param addends Addends to sum.
 * @param property Property of the elements to be summing
 * @returns Sum of numbers
 */
export function sum<
  S extends string | number | symbol,
  T extends { [s in S]: number }
>(addends: T[], property: S): number;
/**
 * Sum an array of numbers.
 *
 * @param addends Addends to sum.
 * @param mappingFunction Mapping function to turn addends into actual numbers.
 * @returns Sum of numbers
 */
export function sum<T>(
  addends: T[],
  mappingFunction: (element: T) => number
): number;
/**
 * Sum an array of numbers.
 *
 * @param addends Addends to sum.
 * @param x Property or mapping function of addends to sum
 * @returns Sum of numbers
 */
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

/**
 * Sum array of numbers
 *
 * @param addends Numbers to sum
 * @returns Sum of numbers
 */
export function sumNumbers(addends: number[]): number {
  return sum(addends, (x: number) => x);
}

/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 *
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
 *
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
 *
 * @param map Map to invert
 * @returns Inverted map
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
 *
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

export function maxBy<T>(
  array: T[] | readonly T[],
  optimizer: (element: T) => number,
  reverse?: boolean
): T;
export function maxBy<
  S extends string | number | symbol,
  T extends { [x in S]: number }
>(array: T[] | readonly T[], key: S, reverse?: boolean): T;
/**
 * Find the best element of an array, where "best" is defined by some given criteria.
 *
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 * @returns Best element by optimizer function
 */
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

/**
 * Compare arrays shallowly
 *
 * @param left One array to compare
 * @param right The other array to compare
 * @returns Whether the two arrays are shallowly equal
 */
export function arrayEquals<T>(
  left: T[] | readonly T[],
  right: T[] | readonly T[]
): boolean {
  if (left.length !== right.length) return false;
  return left.every((element, index) => element === right[index]);
}

/**
 * Type that extends any non-function entity--like a string, number, or array--into a itself and a no-input function that returns it.
 * Used to interact with objects that could either be functions or static values.
 */
// The square brackets here are used to prevent type distribution; don't worry about it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Delayed<T> = [T] extends [(...args: any) => any]
  ? never
  : T | (() => T);

/**
 * Used to collapse a Delayed<T> object into an entity of type "T" as represented by the object.
 *
 * @param delayedObject Object of type Delayed<T> that represents either a value of type T or a function returning a value of type T.
 * @returns The return value of the function, if delayedObject is a function. Otherwise, this returns the original element.
 */
export function undelay<T>(delayedObject: Delayed<T>): T {
  return typeof delayedObject === "function" ? delayedObject() : delayedObject;
}

/**
 * An object keyed by string type T, with values of S.
 *  or contains a 'default' parameter to use as a fallback.
 */
export type Switch<T extends string, S> =
  | Record<T, S>
  | (Partial<{ [x in T]: S }> & { default: S });

/**
 * Makes a byX function, like byStat or byClass
 *
 * @param source A method for finding your stat, or class, or whatever X is in this context
 * @returns A function akin to byStat or byClass; it accepts an object that either is "complete" in the sense that it has a key for every conceivable value, or contains a `default` parameter. If an inappropriate input is provided, returns undefined.
 */
export function makeByXFunction<T extends string>(
  source: Delayed<T>
): <S>(options: Switch<T, S>) => S {
  return function <S>(options: Switch<T, S>) {
    const val = undelay(source);
    if ("default" in options) return options[val] ?? options.default;
    return options[val];
  };
}

/**
 * Flattens an array. Basically replacing Array.prototype.flat for which Rhino doesn't yet have an implementation
 *
 * @param arr Array to flatten
 * @param depth Number of layers to flatten by; Infinity for a fully flat array
 * @returns Flattened array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flat<A extends any[], D extends number = 1>(
  arr: A,
  depth = Infinity
): FlatArray<A, D>[] {
  let flatArray: FlatArray<A, D>[] = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      flatArray = flatArray.concat(flat(item, depth - 1));
    } else {
      flatArray.push(item);
    }
  }
  return flatArray;
}
