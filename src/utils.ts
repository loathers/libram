export function notNull<T>(value: T | null): value is T {
  return value !== null;
}
