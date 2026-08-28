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
import { $item, $items } from "../../template-string.js";
import { have as have_ } from "../../lib.js";
import { get } from "../../property.js";

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

  private get rng() {
    return phpSeed(this.seed + 381 * this.fight);
  }

  private computeFruit(): Item {
    const threshold = this.pityCount < 3 ? this.pityThreshold : 3;
    const isAdvanced = phpMtRand(this.rng, 1, 30) <= threshold;
    if (isAdvanced) {
      this.pityCount++;
      this.pityThreshold = 10;
      return ADVANCED_FRUIT[phpMtRand(this.rng, 0, 2)];
    } else {
      this.pityThreshold += 10;
      return BASIC_FRUIT[phpMtRand(this.rng, 0, 18)];
    }
  }

  getFruit(fight: number): Item | null {
    if (fight < Math.max(...fixedDropTurns)) {
      for (const drop of fixedDropTurns) {
        const fruit = this.computeFruit();
        try {
          if (drop >= this.fight) {
            return drop === this.fight ? fruit : null;
          }
        } finally {
          this.fight = drop;
        }
      }
    }

    for (this.fight; this.fight < fight; this.fight++) {
      if (phpMtRand(this.rng, 1, 50) !== 1) continue;
      this.computeFruit();
    }

    return phpMtRand(this.rng, 1, 50) === 1 ? this.computeFruit() : null;
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
