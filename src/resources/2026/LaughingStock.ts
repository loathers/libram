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
} from "kolmafia";
import { $item, $items } from "../../template-string";
import { have as have_ } from "../../lib.js";
import { get } from "../../property";

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
  private fight = 0;
  private readonly seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  getFruit(fight: number): Item | null {
    while (this.fight < fight) {
      this.fight++;

      const rng = phpSeed(this.seed + 381 * (this.fight - 1));
      const guaranteed = fixedDropTurns.includes(this.fight);
      const randomDrop = this.fight > 56 && phpMtRand(rng, 1, 50) === 1;

      if (!guaranteed && !randomDrop) continue;

      const threshold = this.pityCount < 3 ? this.pityThreshold : 3;
      const isAdvanced = phpMtRand(rng, 1, 30) <= threshold;

      if (isAdvanced) {
        this.pityCount++;
        this.pityThreshold = 10;
        if (this.fight === fight) {
          return ADVANCED_FRUIT[phpMtRand(rng, 0, 2)];
        }
      } else {
        this.pityThreshold += 10;
        if (this.fight === fight) {
          return BASIC_FRUIT[phpMtRand(rng, 0, 18)];
        }
      }
    }

    return null;
  }
}

/**
 * Predict the fruit drops from a Portable Laughing Stock over a given number of fights
 * @param maxFights The maximum number of fights to simulate
 * @param characterClass The character class to use for the RNG seed; defaults to the current class
 * @param path The path to use for the RNG seed; defaults to the current path
 * @param daycount The daycount to use for the RNG seed; defaults to the current daycount
 * @returns A Map of fight numbers to the fruit dropped on that fight
 */
export function laughingStockDrops(
  maxFights: number,
  characterClass: Class = myClass(),
  path: Path = myPath(),
  daycount: number = myDaycount(),
): Map<number, Item> {
  const tracker = new FruitTracker(
    getSeed(characterClass.id, path.id, daycount),
  );

  const results = new Map<number, Item>();

  for (let fight = 1; fight <= maxFights; fight++) {
    const fruit = tracker.getFruit(fight);

    if (fruit) {
      results.set(fight, fruit);
    }
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
 * @returns The next predictable Portable Laughing Stock drop and how many
 * combats until it occurs, or null if the next drop is not predictable.
 */
export function nextDrop(): [item: Item, combats: number] | null {
  const charges = get("_laughingStockCharges", 0);

  if (!canPredict()) return null;

  const seed = getSeed(myClass().id, myPath().id, myDaycount());
  const tracker = new FruitTracker(seed);

  for (let fight = 1; ; fight++) {
    const fruit = tracker.getFruit(fight);

    if (fight <= charges) continue;

    if (fruit) {
      return [fruit, fight - charges];
    }
  }
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

  if (!canPredict()) return null;

  return Array.from(
    laughingStockDrops(
      charges + turnHorizon,
      myClass(),
      myPath(),
      myDaycount(),
    ),
  )
    .filter(([fight]) => fight > charges)
    .map(([fight, item]) => [item, fight - charges]);
}
