import { knapsack } from "../../src/diet/knapsack";

describe("knapsack", () => {
  it("selects better items", () => {
    const results = knapsack(
      [
        ["A", 1, 1],
        ["B", 3, 2],
      ],
      4
    );

    expect(results).toEqual([6, ["B", "B"]]);
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

    expect(value).toEqual(26);
    expect(items.sort()).toEqual(["B", "C", "C"]);
  });

  it("respects maximum quantity", () => {
    const [value, items] = knapsack(
      [
        ["A", 10, 1, 1],
        ["B", 1, 2],
      ],
      5
    );

    expect(value).toEqual(12);
    expect(items.sort()).toEqual(["A", "B", "B"]);
  });
});
