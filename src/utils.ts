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

  for (let i = 0; i < array.length; i+= chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
