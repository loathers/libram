import { knapsack } from "../../src/diet/knapsack";

function sortValues<T>(items: [T, number][]) {
  return items.sort(([x], [y]) => (x < y ? -1 : x === y ? 0 : 1));
}

describe("knapsack", () => {
  it("selects better items", () => {
    const [value, items] = knapsack(
      [
        ["A", 1, 1],
        ["B", 3, 2],
      ],
      4
    );

    expect(sortValues(items)).toEqual([["B", 2]]);
    expect(value).toEqual(6);
  });

  it("beats greedy", () => {
    // Greedy would select CCC then A (25), but CCB (26) is better.
    const [value, items] = knapsack(
      [
        ["A", 1, 1],
        ["B", 10, 3],
        ["C", 8, 2],
      ],
      7
    );

    expect(sortValues(items)).toEqual([
      ["B", 1],
      ["C", 2],
    ]);
    expect(value).toEqual(26);
  });

  it("doesn't overfill", () => {
    const [value, items] = knapsack(
      [
        ["A", 2, 2],
        ["B", 2, 4],
      ],
      5
    );

    expect(sortValues(items)).toEqual([["A", 2]]);
    expect(value).toEqual(4);
  });

  it("respects maximum quantity", () => {
    const [value, items] = knapsack(
      [
        ["A", 10, 1, 1],
        ["B", 1, 2],
      ],
      5
    );

    expect(sortValues(items)).toEqual([
      ["A", 1],
      ["B", 2],
    ]);
    expect(value).toEqual(12);
  });

  it("uses negative items", () => {
    const [value, items] = knapsack(
      [
        ["A", 1, 1],
        ["B", 0, -1, 1],
      ],
      2
    );

    expect(sortValues(items)).toEqual([
      ["A", 3],
      ["B", 1],
    ]);
    expect(value).toEqual(3);
  });

  it("uses negative items with cost", () => {
    const [value, items] = knapsack(
      [
        ["A", 2, 1],
        ["B", -1, -1, 1],
      ],
      2
    );

    expect(sortValues(items)).toEqual([
      ["A", 3],
      ["B", 1],
    ]);
    expect(value).toEqual(5);
  });
});
