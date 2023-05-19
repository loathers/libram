import { cliExecute, getCounter, getCounters } from "kolmafia";

/**
 * Returns Infinity for counters that do not exist, and otherwise returns the duration of the counter
 *
 * @param counter The name of the counter in question
 * @returns Infinity if the counter does not exist; otherwise returns the duration of the counter
 */
export function get(counter: string): number {
  const value = getCounter(counter);
  // getCounter returns -1 for counters that don't exist, but it also returns -1 for counters whose value is -1
  if (value === -1) {
    // if we have a counter with value -1, we check to see if that counter exists via getCounters()
    // We return null if it doesn't exist
    return getCounters(counter, -1, -1).trim() === "" ? Infinity : -1;
  }
  return value;
}

/**
 * The world is everything that is the case. This determines which counters are the case.
 *
 * @param counter The name of the counter in question
 * @returns True for counters which currently exist; false for those which do not
 */
export function exists(counter: string): boolean {
  return (
    getCounter(counter) !== -1 || getCounters(counter, -1, -1).trim() !== ""
  );
}

/**
 * Creates a manual counter with specified name and duration
 *
 * @param counter Name of the counter to manually create
 * @param duration Duration of counter to manually set
 * @returns Whether the counter was successfully set
 */
export function set(counter: string, duration: number): boolean {
  cliExecute(`counters add ${duration} ${counter}`);
  return get(counter) !== null;
}
