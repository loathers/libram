import {
  Class,
  daycount,
  Item,
  myAdventures,
  myClass,
  myDaycount,
  myPath,
  Path,
  phpMtRand,
  phpSeed,
  Rng,
} from "kolmafia";
import { $item, $items } from "../../template-string";
import { have as have_ } from "../../lib.js";
import { get } from "../../property";
import { clamp } from "../../utils";

const BASIC_FRUIT = $items`orange, grapefruit, grapes, lemon, lime, papaya, cranberries, strawberry, cherry, kumquat, tangerine, raspberry, kiwi, blackberry, banana, cactus fruit, plum, pear, peach`;

const ADVANCED_FRUIT = $items`classic banana, antique watermelon, quince`;

function getSeed(classId: number, pathId: number, daycount: number): number {
  return classId ** 3 + 84 * pathId + 123 * (daycount - 1) + 381;
}

const fixedDropTurns = Array(11)
  .fill(null)
  .map((_, i) => 1 + ((i + 1) * i) / 2);

class FruitTracker {
  private pityCount = 0;
  private pityThreshold = 10;

  getFruit(rng: Rng): Item {
    const threshold = this.pityCount < 3 ? this.pityThreshold : 3;
    const isAdvanced = phpMtRand(rng, 1, 30) <= threshold;

    if (isAdvanced) {
      this.pityCount++;
      this.pityThreshold = 10;
      return ADVANCED_FRUIT[phpMtRand(rng, 0, 2)];
    }

    this.pityThreshold += 10;
    return BASIC_FRUIT[phpMtRand(rng, 0, 18)];
  }
}

/**
 * Predict the fruit drops from a Portable Laughing Stock over a given number of fights
 * @param characterClass The character class to use for the RNG seed; defaults to the current class
 * @param path The path to use for the RNG seed; defaults to the current path
 * @param daycount The daycount to use for the RNG seed; defaults to the current daycount
 * @param maxFights The maximum number of fights to simulate
 * @returns A Map of fight numbers to the fruit dropped on that fight
 */
export function laughingStockDrops(
  characterClass: Class = myClass(),
  path: Path = myPath(),
  daycount: number = myDaycount(),
  maxFights: number,
): Map<number, Item> {
  const seed = getSeed(classId, pathId, daycount);

  const results = new Map<number, Item>();
  const fruitTracker = new FruitTracker();

  const deterministicFights = clamp(maxFights, 0, 56);
  const overage = clamp(maxFights - 56, 0, Infinity);

  for (const fight of fixedDropTurns.filter(
    (fight) => fight <= deterministicFights,
  )) {
    const rng = phpSeed(seed+ 381 * (fight - 1));

    results.set(fight, fruitTracker.getFruit(rng));
  }

  for (let i = 0; i < overage; i++) {
    const fight = 57 + i;
    const rng = phpSeed(seed + 381 * (fight - 1));

    if (phpMtRand(rng, 1, 50) !== 1) continue;

    results.set(fight, fruitTracker.getFruit(rng));
  }

  return results;
}

/**
 * @returns Whether or not you `have` The Portable Laughingstock
 */
export function have(): boolean {
  return have_($item`Portable Laughing Stock`);
}

/**
 * @returns Whether or not you can predict the next Portable Laughingstock drop
 */
export function canPredict(): boolean {
  return have() && daycount() <= 4;
}

/**
 * @param turnHorizon defines how many turns to check for available drops; defaults to remaining adventures
 * @returns The next predictable Portable Laughing Stock drop and how many
 * combats until it occurs, or null if the next drop is not predictable.
 */
export function nextDrop(
  turnHorizon = myAdventures(),
): [item: Item, combats: number] | null {
  const charges = get("_laughingStockCharges", 0);

  if (!canPredict()) {
    return null;
  }

  const drops = laughingStockDrops(
    myClass(),
    myPath(),
    myDaycount(),
    charges + turnHorizon,
  );

  for (const [fight, item] of drops) {
    if (fight > charges) {
      return [item, fight - charges];
    }
  }

  return null;
}

/**
 * @param turnHorizon defines how many turns to check for available drops; defaults to remaining adventures
 * @returns All predictable Portable Laughing Stock drops remaining today,
 * in order, or null if the next drop is no longer predictable.
 */
export function expectedDropsToday(
  turnHorizon = myAdventures(),
): [Item, number][] | null {
  const charges = get("_laughingStockCharges", 0);

  if (!canPredict()) {
    return null;
  }

  const drops = laughingStockDrops(
    myClass(),
    myPath(),
    myDaycount(),
    charges + turnHorizon,
  );

  return Array.from(drops.entries())
    .filter(([fight]) => fight > charges)
    .map(([fight, item]) => [item, fight - charges]);
}
