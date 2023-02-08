import { splitByCommasWithEscapes } from "../src/utils";

describe("splitByCommasWithEscapes", () => {
  it("can split by commas with escapes", () => {
    const values = splitByCommasWithEscapes("weapon, off-hand, acc1");

    expect(values).toEqual(["weapon", "off-hand", "acc1"]);
  });
});
