import {
  daycount,
  Item,
  myAdventures,
  myClass,
  myDaycount,
  myPath,
  phpMtRand,
  phpSeed,
  Rng,
} from "kolmafia";
import { $item, $items } from "../../template-string";
import { have as have_ } from "../../lib.js";
import { get } from "../../property";
import { clamp } from "../../utils";

const basicFruit = $items`orange, grapefruit, grapes, lemon, lime, papaya, cranberries, strawberry, cherry, kumquat, tangerine, raspberry, kiwi, blackberry, banana, cactus fruit, plum, pear, peach`;

const advFruit = $items`classic banana, antique watermelon, quince`;

function getSeed(classId: number, pathId: number, daycount: number): number {
  return classId ** 3 + 84 * pathId + 123 * (daycount - 1) + 381;
}

function getDeterministicDrops(fights: number): number {
  return fights <= 0 ? 0 : Math.floor((Math.sqrt(8 * fights - 7) - 1) / 2) + 1;
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

  function getFruit(rng: Rng): Item {
    const threshold = pityCount < 3 ? pityThreshold : 3;
    const isAdv = phpMtRand(rng, 1, 30) <= threshold;

    if (isAdv) {
      pityCount++;
      pityThreshold = 10;
      return advFruit[phpMtRand(rng, 0, 2)];
    }

    pityThreshold += 10;
    return basicFruit[phpMtRand(rng, 0, 18)];
  }

  const deterministicFights = clamp(maxFights, 0, 56);
  const overage = clamp(maxFights - 56, 0, Infinity);

  for (let i = 0; i < getDeterministicDrops(deterministicFights); i++) {
    const fight = 1 + (i * (i + 1)) / 2;
    const rng = phpSeed(getSeed(classId, pathId, daycount) + 381 * (fight - 1));

    results.set(fight - 1, getFruit(rng));
  }

  for (let i = 0; i < overage; i++) {
    const fight = 57 + i;
    const rng = phpSeed(getSeed(classId, pathId, daycount) + 381 * (fight - 1));

    if (phpMtRand(rng, 1, 50) !== 1) continue;

    results.set(fight - 1, getFruit(rng));
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
