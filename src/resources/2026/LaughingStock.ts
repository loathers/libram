import {
  daycount,
  Item,
  myAdventures,
  myClass,
  myDaycount,
  myPath,
  phpMtRand,
  phpSeed,
} from "kolmafia";
import { $item, $items } from "../../template-string";
import { have as have_ } from "../../lib.js";
import { get } from "../../property";

const fixedDropTurns = [1, 2, 4, 7, 11, 16, 22, 29, 37, 46, 56];

const basicFruit = $items`orange, grapefruit, grapes, lemon, lime, papaya, cranberries, strawberry, cherry, kumquat, tangerine, raspberry, kiwi, blackberry, banana, cactus fruit, plum, pear, peach`;

const advFruit = $items`classic banana, antique watermelon, quince`;

function getSeed(classId: number, pathId: number, daycount: number): number {
  return classId ** 3 + 84 * pathId + 123 * (daycount - 1) + 381;
}

function laughingStockDrops(
  classId: number,
  pathId: number,
  daycount: number,
  maxFights: number,
): Map<number, Item> {
  const results = new Map<number, Item>();

  let pityCount = 0;
  let pityThreshold = 10;
  let fixedPtr = 0;

  for (let fight = 0; fight < maxFights; fight++) {
    const seed = getSeed(classId, pathId, daycount) + 381 * fight;
    const rng = phpSeed(seed);

    let hasDrop: boolean;

    if (fight <= 56) {
      if (fixedDropTurns[fixedPtr] === fight) {
        hasDrop = true;
        fixedPtr++;
      } else {
        hasDrop = false;
      }
    } else {
      hasDrop = phpMtRand(rng, 1, 50) === 1;
    }

    if (!hasDrop) continue;

    const advP = phpMtRand(rng, 1, 30);

    let threshold = 3;
    if (pityCount < 3) {
      threshold = pityThreshold;
    }

    const isAdv = advP <= threshold;

    let fruit: Item;

    if (isAdv) {
      pityCount++;
      pityThreshold = 10;

      const index = phpMtRand(rng, 0, 2);
      fruit = advFruit[index];
    } else {
      pityThreshold += 10;

      const index = phpMtRand(rng, 0, 18);
      fruit = basicFruit[index];
    }

    results.set(fight, fruit);
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
    myClass().id,
    myPath().id,
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
    myClass().id,
    myPath().id,
    myDaycount(),
    charges + turnHorizon,
  );

  return Array.from(drops.entries())
    .filter(([fight]) => fight > charges)
    .map(([fight, item]) => [item, fight - charges]);
}
