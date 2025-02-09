import * as fs from "node:fs/promises";
import path from "node:path";
import { describe, it, expect, vi } from "vitest";
import { descToItem, Item, visitUrl } from "kolmafia";

import * as Raffle from "./Raffle.js";

describe("Raffle", () => {
  it("detects today's raffle prizes", async () => {
    const page = await fs.readFile(
      path.resolve(import.meta.dirname, "./__fixtures__/raffle.html"),
      "utf8",
    );
    vi.mocked(visitUrl).mockImplementation(() => page);
    vi.mocked(descToItem).mockImplementation((descId: string) => {
      switch (descId) {
        case "500042705":
          // @ts-expect-error Constructing an item
          return new Item("Doll Moll violin case");
        case "405271774":
          // @ts-expect-error Constructing an item
          return new Item("clan underground fireworks shop");
        default:
          // @ts-expect-error Constructing an item
          return new Item("none");
      }
    });
    const prizes = Raffle.getRafflePrizes();

    expect(prizes).toHaveLength(2);
    expect(prizes[0].name).toBe("clan underground fireworks shop");
    expect(prizes[1].name).toBe("Doll Moll violin case");
  });

  it("detects the number of tickets purchased", async () => {
    const page = await fs.readFile(
      path.resolve(import.meta.dirname, "./__fixtures__/raffle.html"),
      "utf8",
    );
    vi.mocked(visitUrl).mockImplementation(() => page);
    const tickets = Raffle.currentTickets();
    expect(tickets).toEqual(111);
  });
});
