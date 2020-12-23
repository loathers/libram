export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function parseNumber(n: string): number {
  return Number.parseInt(n.replace(/,/g, ""));
}
