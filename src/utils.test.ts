import { describe, it, expect } from "vitest";

import { splitByCommasWithEscapes } from "./utils.js";

describe("splitByCommasWithEscapes", () => {
  it("can split by commas with escapes", () => {
    const values = splitByCommasWithEscapes("weapon, off-hand, acc1");

    expect(values).toEqual(["weapon", "off-hand", "acc1"]);
  });
});
