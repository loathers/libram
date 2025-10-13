import { myBasestat, Skill, Stat, useSkill } from "kolmafia";
import { $item, $skill, $stat } from "../../template-string.js";
import { have as have_ } from "../../lib.js";
import { get } from "../../property.js";
import { NumericProperty } from "../../propertyTypes.js";

/**
 * @returns Whether or not you have the blood cubic zirconia.
 */
export function have(): boolean {
  return have_($item`blood cubic zirconia`);
}

/**
 * @param skill The BCZ skill to check.
 * @returns The subtat cost to cast the skill.
 */
export function skillCost(skill: Skill): number {
  const castNumber = timesCast(skill);
  if (castNumber <= 11) {
    const cycle = Math.floor(castNumber / 3);
    const position = castNumber % 3;
    return [11, 23, 37][position] * 10 ** cycle;
  } else if (castNumber === 12) {
    return 420_000;
  } else {
    const cycle = Math.floor((castNumber - 13) / 3);
    const position = (castNumber - 13) % 3;
    return [11, 23, 37][position] * 10 ** (cycle + 5);
  }
}

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

export const BCZPREFS = new Map<Skill, NumericProperty>([
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

/**
 * @param skill The BCZ skill to check.
 * @returns The number of casts of the skill already used, parsing the pref.
 */
export function timesCast(skill: Skill): number {
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
  const subStatFloor = statFloor ** 2;

  let casts = 0;
  let remainingStat = currentStat;

  for (let i = timesCast(skill); i < 25; i++) {
    // 25 is abritrary
    const nextCost = skillCost(skill);
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
