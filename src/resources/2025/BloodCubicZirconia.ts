import { myBasestat, Skill, Stat } from "kolmafia";
import { $item, $skill, $skills, $stat } from "../../index.js";
import { have as have_ } from "../../lib.js";

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

const BCZSKILLS = $skills`BCZ: Blood Geyser, BCZ: Refracted Gaze, BCZ: Sweat Bullets, BCZ: Blood Bath, BCZ: Craft a Pheromone Cocktail, BCZ: Create Blood Thinner, BCZ: Dial it up to 11, BCZ: Prepare Spinal Tapas, BCZ: Sweat Equity`;
export const BCZCOSTS = new Map<Skill, Stat>([
  [$skill`BCZ: Blood Geyser`, $stat`Muscle`],
  [$skill`BCZ: Refracted Gaze`, $stat`Mysticality`],
  [$skill`BCZ: Sweat Bullets`, $stat`Moxie`],
  [$skill`BCZ: Blood Bath`, $stat`Muscle`],
  [$skill`BCZ: Craft a Pheromone Cocktail`, $stat`Moxie`],
  [$skill`BCZ: Create Blood Thinner`, $stat`Muscle`],
  [$skill`BCZ: Dial it up to 11`, $stat`Mysticality`],
  [$skill`BCZ: Prepare Spinal Tapas`, $stat`Mysticality`],
  [$skill`BCZ: Sweat Equity`, $stat`Moxie`],
]);

/**
 * @param skill The BCZ skill to check.
 * @param statFloor Minimum base stat you want to keep.
 * @returns The number of casts you can achieve of the selected skill before hitting the given stat floor.
 */
export function availableCasts(skill: Skill, statFloor: number): number {
  if (!have()) return 0;
  if (!BCZSKILLS.includes(skill)) return 0;

  const stat = BCZCOSTS.get(skill);
  if (!stat) return 0;

  // const currentStat = myBasestat(stat);
  const currentStat =
    stat === $stat`Moxie`
      ? myBasestat($stat`SubMoxie`)
      : stat === $stat`Mysticality`
        ? myBasestat($stat`SubMysticality`)
        : myBasestat($stat`SubMuscle`);
  const timesCast = skill.timescast ?? 0;

  let casts = 0;
  let remainingStat = currentStat;

  for (let i = timesCast; i < BCZSKILLCOST.size; i++) {
    const nextCost = BCZSKILLCOST.get(i);
    if (nextCost === undefined) break;
    if (remainingStat - nextCost < statFloor) break;
    remainingStat -= nextCost;
    casts++;
  }

  return casts;
}
