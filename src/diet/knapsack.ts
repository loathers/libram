/**
 * Solve the knapsack problem.
 * @param values Array of {[item, value, weight, maximum]} tuples for knapsack parameter.
 * @param capacity Capacity of knapsack.
 * @returns Tuple {[totalValue, items]} of selected items and total value of those items.
 */
export function knapsack<T>(
  values: [T, number, number, number?][],
  capacity: number
): [number, T[]] {
  // Sort values by weight.
  const valuesSorted = [...values].sort((x, y) => x[2] - y[2]);
  // Convert the problem into 0/1 knapsack - just include as many copies as possible of each item.
  const values01 = ([] as [T, number, number][]).concat(
    ...valuesSorted.map(([thing, value, weight, maximum]) => {
      const maxQuantity = maximum ?? Math.floor(capacity / weight);
      return new Array<[T, number, number]>(maxQuantity).fill([
        thing,
        value,
        weight,
      ]);
    })
  );

  const memoizationTable: ([number, T[]] | null)[][] = new Array(
    values01.length
  );
  for (let i = 0; i < values01.length; i++) {
    memoizationTable[i] = new Array(capacity).fill(null);
  }
  return bestSolution(
    memoizationTable,
    values01,
    values01.length - 1,
    capacity
  );
}

/**
 * Find the best solution to a knapsack subproblem.
 * @param memoizationTable Memoization table for dynamic programming approach.
 * @param values Array of {[item, value, weight, maximum]} tuples for knapsack parameter.
 * @param currentIndex Current index into values array - only add items before this index.
 * @param remainingCapacity Remaining capacity of knapsack.
 * @returns
 */
function bestSolution<T>(
  memoizationTable: ([number, T[]] | null)[][],
  values: [T, number, number][],
  currentIndex: number,
  remainingCapacity: number
): [number, T[]] {
  // If we've used all our capacity, this solution is no good.
  if (remainingCapacity < 0) return [-Infinity, []];
  if (remainingCapacity === 0 || currentIndex < 0) return [0, []];

  const memoized = memoizationTable[currentIndex][remainingCapacity - 1];
  if (memoized !== null) return memoized;

  const [item, value, weight] = values[currentIndex];
  const [valueIncludeRest, itemsInclude] = bestSolution(
    memoizationTable,
    values,
    currentIndex - 1,
    remainingCapacity - weight
  );
  const valueInclude = valueIncludeRest + value;
  const [valueExclude, itemsExclude] = bestSolution(
    memoizationTable,
    values,
    currentIndex - 1,
    remainingCapacity
  );

  // Pick the better of the two options between including/excluding.
  const result =
    valueInclude > valueExclude
      ? ([valueInclude, [...itemsInclude, item]] as [number, T[]])
      : ([valueExclude, itemsExclude] as [number, T[]]);

  memoizationTable[currentIndex][remainingCapacity - 1] = result;
  return result;
}
