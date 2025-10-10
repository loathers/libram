import { myBasestat, Skill, Stat, useSkill } from "kolmafia";
import { $item, $skill, $stat } from "../../template-string.js";
import { have as have_ } from "../../lib.js";
import { get } from "../../property.js";

/**
 * @returns Whether or not you have the blood cubic zirconia
 */
export function have(): boolean {
  return have_($item`blood cubic zirconia`);
}

const BCZSKILLCOST = new Map<number, number>([
  [0, 11],
  [1, 23],
  [2, 37],
  [3, 110],
  [4, 230],
  [5, 370],
  [6, 1100],
  [7, 2300],
  [8, 3700],
  [9, 11000],
  [10, 23000],
  [11, 37000],
  [12, 420000],
  [13, 1100000],
  [14, 2300000],
  [15, 3700000],
  [16, 11000000],
  [17, 23000000],
  [18, 37000000],
  [19, 110000000],
  [20, 230000000],
  [21, 370000000],
]);

export const BCZCOSTS = new Map<Skill, Stat>([
  [$skill`BCZ: Blood Geyser`, $stat`SubMuscle`],
  [$skill`BCZ: Refracted Gaze`, $stat`SubMysticality`],
  [$skill`BCZ: Sweat Bullets`, $stat`SubMoxie`],
  [$skill`BCZ: Blood Bath`, $stat`SubMuscle`],
  [$skill`BCZ: Craft a Pheromone Cocktail`, $stat`SubMoxie`],
  [$skill`BCZ: Create Blood Thinner`, $stat`SubMuscle`],
  [$skill`BCZ: Dial it up to 11`, $stat`SubMysticality`],
  [$skill`BCZ: Prepare Spinal Tapas`, $stat`SubMysticality`],
  [$skill`BCZ: Sweat Equity`, $stat`SubMoxie`],
]);

export const BCZPREFS = new Map<Skill, string>([
  [$skill`BCZ: Blood Geyser`, "_bczBloodGeyserCasts"],
  [$skill`BCZ: Refracted Gaze`, "_bczRefractedGazeCasts"],
  [$skill`BCZ: Sweat Bullets`, "_bczSweatBulletsCasts"],
  [$skill`BCZ: Blood Bath`, "_bczBloodBathCasts"],
  [$skill`BCZ: Dial it up to 11`, "_bczDialitupCasts"],
  [$skill`BCZ: Sweat Equity`, "_bczSweatEquityCasts"],
  [$skill`BCZ: Create Blood Thinner`, "_bczBloodThinnerCasts"],
  [$skill`BCZ: Prepare Spinal Tapas`, "_bczSpinalTapasCasts"],
  [$skill`BCZ: Craft a Pheromone Cocktail`, "_bczPheromoneCocktailCasts"],
]);

function getBCZTimesCast(skill: Skill): number {
  const pref = BCZPREFS.get(skill);
  if (!pref) return 0;
  return get(pref, 0);
}

/**
 * @param skill The BCZ skill to check.
 * @param statFloor Minimum base stat you want to keep.
 * @returns The number of casts you can achieve of the selected skill before hitting the given stat floor.
 */
export function availableCasts(skill: Skill, statFloor: number): number {
  if (!have()) return 0;

  const stat = BCZCOSTS.get(skill);
  if (!stat) return 0;

  // const currentStat = myBasestat(stat);
  const currentStat = myBasestat(stat);
  const timesCast = getBCZTimesCast(skill);
  const subStatFloor = statFloor ** 2;

  let casts = 0;
  let remainingStat = currentStat;

  for (let i = timesCast; i < BCZSKILLCOST.size; i++) {
    const nextCost = BCZSKILLCOST.get(i);
    if (nextCost === undefined) break;
    if (remainingStat - nextCost < subStatFloor) break;
    remainingStat -= nextCost;
    casts++;
  }

  return casts;
}

/**
 * @param skill The BCZ skill to cast.
 * @param statFloor Minimum base stat you want to keep.
 * @returns Whether you successfully cast the spell.
 */
export function castDownTo(skill: Skill, statFloor: number): boolean {
  if (!have() || !BCZCOSTS.get(skill)) return false;
  const available = () => availableCasts(skill, statFloor);
  if (available() === 0) return false;
  while (available()) useSkill(skill, available());

  return !useSkill(skill, available());
}
