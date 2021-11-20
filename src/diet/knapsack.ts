import { sum } from "../utils";

class Not<T> {
  thing: T;
  constructor(thing: T) {
    this.thing = thing;
  }
}

// Assuming list is already sorted, count adjacent items.
// Effectively run-length encoding.
function aggregate<T>(
  list: T[],
  isEqual?: (x: T, y: T) => boolean
): [T, number][] {
  const aggregatedList = [];
  for (const item of list) {
    if (aggregatedList.length === 0) {
      aggregatedList.push([item, 1] as [T, number]);
    } else {
      const last = aggregatedList[aggregatedList.length - 1];
      const [lastItem] = last;
      if (isEqual ? isEqual(item, lastItem) : item === lastItem) {
        last[1]++;
      } else {
        aggregatedList.push([item, 1] as [T, number]);
      }
    }
  }
  return aggregatedList;
}

/**
 * Solve the knapsack problem.
 * @param values Array of {[item, value, weight, maximum]} tuples for knapsack parameter.
 * @param capacity Capacity of knapsack.
 * @returns Tuple {[totalValue, items]} of selected items and total value of those items.
 */
export function knapsack<T>(
  values: [T, number, number, number?][],
  capacity: number
): [number, [T, number][]] {
  if (!Number.isFinite(capacity)) {
    throw new Error("Invalid capacity.");
  }

  // Invert negative values into a fake value for not using it.
  const valuesInverted = values.map(
    ([thing, value, weight, maximum]) =>
      (weight < 0 && maximum !== undefined
        ? [new Not(thing), -value, -weight, maximum]
        : [thing, value, weight, maximum]) as [
        T | Not<T>,
        number,
        number,
        number?
      ]
  );
  const capacityAdjustment = sum(values, ([, , weight, maximum]) =>
    weight < 0 && maximum !== undefined ? -weight * maximum : 0
  );
  const adjustedCapacity = capacity + capacityAdjustment;

  if (adjustedCapacity < 0) {
    // We don't have enough cleaners to create any space, so can't fit anything.
    return [-Infinity, []];
  }

  // Sort values by weight.
  const valuesSorted = [...valuesInverted].sort((x, y) => x[2] - y[2]);
  // Convert the problem into 0/1 knapsack - just include as many copies as possible of each item.
  const values01 = ([] as [T | Not<T>, number, number][]).concat(
    ...valuesSorted.map(([thing, value, weight, maximum]) => {
      if (!Number.isFinite(weight) || weight < 0) {
        throw new Error(
          `Invalid weight ${weight} for ${
            thing instanceof Not ? `not ${thing.thing}` : thing
          }`
        );
      }
      const maxQuantity = maximum ?? Math.floor(adjustedCapacity / weight);
      return new Array<[T | Not<T>, number, number]>(maxQuantity).fill([
        thing,
        value,
        weight,
      ]);
    })
  );

  const memoizationTable: ([number, (T | Not<T>)[]] | null)[][] = new Array(
    values01.length
  );
  for (let i = 0; i < values01.length; i++) {
    memoizationTable[i] = new Array(adjustedCapacity).fill(null);
  }

  const [value, invertedSolution] = bestSolution(
    memoizationTable,
    values01,
    values01.length - 1,
    adjustedCapacity
  );

  // Still need to replace Not<T>s with right quantity of T's.
  const aggregatedSolution = aggregate(invertedSolution);
  const countMap = new Map(aggregatedSolution);

  let valueAdjustment = 0;
  const solution: [T, number][] = aggregatedSolution.filter(
    ([thingOrNot]) => !(thingOrNot instanceof Not)
  ) as [T, number][];
  for (const [thingOrNot, value, , maximum] of valuesSorted) {
    if (thingOrNot instanceof Not) {
      const notCount = countMap.get(thingOrNot) ?? 0;
      if (maximum === undefined) {
        throw new Error(`Cannot find maximum for item ${thingOrNot.thing}.`);
      }
      if (notCount > maximum) {
        throw new Error(
          `Somehow picked ${notCount} more than the maximum ${notCount} for item ${thingOrNot.thing}.`
        );
      }
      if (notCount < maximum) {
        solution.push([thingOrNot.thing, maximum - notCount]);
      }
      valueAdjustment -= maximum * value;
    }
  }

  return [value + valueAdjustment, solution];
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
