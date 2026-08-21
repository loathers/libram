import { PHPMTRand } from "kol-rng";
import {
  Class,
  Item,
  Path,
  availableAmount,
  daycount,
  myAdventures,
  myClass,
  myDaycount,
  myPath,
  phpMtRand,
  phpSeed,
  setProperty,
} from "kolmafia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearMockProperties } from "../../../tests/setupTests.js";
import * as LaughingStock from "./LaughingStock.js";

type Rng = ReturnType<typeof phpSeed>;

/**
 * Back the mocked mafia RNG functions with kol-rng, which simulates the same
 * PHP 5.3.10 Mersenne Twister that KoL (and therefore mafia) uses.
 */
function mockRng(): void {
  vi.mocked(phpSeed).mockImplementation(
    (seed) => new PHPMTRand(seed) as unknown as Rng,
  );
  vi.mocked(phpMtRand).mockImplementation(((
    rng: Rng,
    min: number,
    max: number,
  ) => (rng as unknown as PHPMTRand).roll(min, max)) as typeof phpMtRand);
}

beforeEach(() => {
  clearMockProperties();
  mockRng();
  vi.mocked(availableAmount).mockReturnValue(1);
  vi.mocked(daycount).mockReturnValue(1);
  vi.mocked(myDaycount).mockReturnValue(1);
  vi.mocked(myAdventures).mockReturnValue(200);
  vi.mocked(myClass).mockReturnValue({ id: 1 } as Class);
  vi.mocked(myPath).mockReturnValue({ id: 0 } as Path);
});

const names = (drops: [Item, number][] | null) =>
  drops?.map(([item, combats]): [string, number] => [item.name, combats]);

describe("LaughingStock", () => {
  it("only predicts drops while holding the stock early in the run", () => {
    expect(LaughingStock.canPredict()).toBe(true);

    vi.mocked(daycount).mockReturnValue(5);
    expect(LaughingStock.canPredict()).toBe(false);
    expect(LaughingStock.nextDrop()).toBeNull();
    expect(LaughingStock.expectedDropsToday()).toBeNull();

    vi.mocked(daycount).mockReturnValue(1);
    vi.mocked(availableAmount).mockReturnValue(0);
    expect(LaughingStock.canPredict()).toBe(false);
  });

  // A 400 turn horizon reaches well past the last fixed drop at combat 56, so
  // this covers both the fixed schedule and the 1-in-50 random drops after it,
  // as well as the advanced fruit pity system.
  //
  // NB: these values were recorded against the fixedDropTurns implementation,
  // before the switch to triangular numbers, and currently fail. The random
  // drops past combat 56 still match, but the deterministic ones are now keyed
  // one combat earlier, which also puts the first drop on key 0 where the
  // `fight > charges` filter in expectedDropsToday can never return it. Either
  // the schedule or these expectations need updating; see the PR discussion.
  it("predicts today's drops", () => {
    expect(names(LaughingStock.expectedDropsToday(400))).toEqual([
      // The fixed schedule
      ["antique watermelon", 1],
      ["cherry", 2],
      ["quince", 4],
      ["peach", 7],
      ["quince", 11],
      ["grapes", 16],
      ["papaya", 22],
      ["strawberry", 29],
      ["strawberry", 37],
      ["banana", 46],
      ["cactus fruit", 56],
      // 1-in-50 rolls from here on
      ["grapes", 115],
      ["orange", 128],
      ["orange", 219],
      ["classic banana", 248],
      ["peach", 257],
      ["cherry", 378],
    ]);
  });

  it("predicts the next drop", () => {
    const drops = LaughingStock.expectedDropsToday(100);
    expect(LaughingStock.nextDrop()).toEqual(drops?.[0]);
  });

  it("finds the next drop after the fixed drop schedule", () => {
    setProperty("_laughingStockCharges", "259");

    expect(LaughingStock.nextDrop()).toEqual([
      expect.objectContaining({ name: "cherry" }),
      119,
    ]);
  });

  it("predicts all drops through turn 378", () => {
    setProperty("_laughingStockCharges", "0");

    expect(names(LaughingStock.expectedDropsToday(378))).toEqual([
      ["antique watermelon", 1],
      ["cherry", 2],
      ["quince", 4],
      ["peach", 7],
      ["quince", 11],
      ["grapes", 16],
      ["papaya", 22],
      ["strawberry", 29],
      ["strawberry", 37],
      ["banana", 46],
      ["cactus fruit", 56],
      ["grapes", 115],
      ["orange", 128],
      ["orange", 219],
      ["classic banana", 248],
      ["peach", 257],
      ["cherry", 378],
    ]);
  });

  it("accounts for charges already spent today", () => {
    const all = names(LaughingStock.expectedDropsToday(100)) ?? [];

    setProperty("_laughingStockCharges", "20");
    const remaining = names(LaughingStock.expectedDropsToday(80)) ?? [];

    // The same drops, in the same order, minus the ones already collected, with
    // the combat counts rebased onto the current charge count.
    expect(remaining).toEqual(
      all
        .filter(([, combats]) => combats > 20)
        .map(([name, combats]): [string, number] => [name, combats - 20]),
    );
  });
});
