import { splitByCommasWithEscapes } from "../src/utils";


describe("template-string", () => {
  it("can split commas with escapes", () => {
    const values = splitByCommasWithEscapes("weapon, off-hand, acc1");

    expect(values).toEqual(["weapon", "off-hand", "acc1"]);
  });
});