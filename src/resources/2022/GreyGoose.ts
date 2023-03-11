import { toInt, myClass } from "kolmafia";
import { have as have_ } from "../../lib";
import { get as getModifier } from "../../modifier";
import { get } from "../../property";
import { $familiar, $item, $skill } from "../../template-string";

export const goose = $familiar`Grey Goose`;

/**
 * Determines whether you `have` the Grey Goose
 *
 * @returns Whether you `have` the Grey Goose
 */
export function have(): boolean {
  return have_(goose);
}

/**
 * Determines your expected Grey Goose experience, were you to make it your active familiar
 *
 * @returns Your current expected Grey Goose experience, paying attention to potential experience from the Shorter-Order Cook
 */
export function currentExperience(): number {
  return goose.experience ||
    (have_($familiar`Shorter-Order Cook`) && !get("gooseReprocessed"))
    ? 81 + (have_($item`blue plate`) ? 19 : 0)
    : 0;
}

/**
 * Determines the current expected weight of your goose, were you to make it your active familiar
 *
 * @returns Your current expected Grey Goose weight, paying attention to potential experience from the Shorter-Order Cook
 */
export function currentWeight(): number {
  return Math.min(Math.floor(Math.sqrt(currentExperience())), 20);
}

/**
 * Determines the number of drones emitted for a given weight
 *
 * @param weight The weight to test; defaults to current weight
 * @returns The nubmer of drones expected to be emitted for the weight in question
 */
export function expectedDrones(weight = currentWeight()): number {
  return Math.max(0, weight - 5);
}

/**
 * Determines the experience (or, in Grey You, fullstats) you'd get from using the appropriate Grey Goose skill for a given weight
 *
 * @param weight The goose weight you care about; defaults to current weight
 * @returns In Grey You, returns the fullstats you'll gain from goose levelling; outside Grey You, returns substats
 */
export function expectedExperience(weight = currentWeight()): number {
  return Math.pow(Math.max(weight - 5, 0), toInt(myClass()) === 27 ? 2 : 3);
}

/**
 * Determines the meat you'd expect to get from using Meatify Matter at the given weight
 *
 * @param weight The weight in question (defaults to current)
 * @returns The expected meat from Meatify Matter
 */
export function expectedMeat(weight = currentWeight()): number {
  return Math.pow(Math.max(weight - 5, 0), 4);
}

/**
 * Determines whether you've used Meatify Matter today
 *
 * @returns Whether you've used Meatify Matter today
 */
export function hasMeatified(): boolean {
  return get("_meatifyMatterUsed");
}

/**
 * Calculates the number of fights you need to reach a particular weight
 *
 * @param target The weight you want to reach
 * @param bonusExperience The amount of bonus exdperience you'll be running--defaults to the current value
 */
export function fightsUntil(
  target: number,
  bonusExperience = getModifier("Familiar Experience")
) {
  const diff = Math.pow(target, 2) - currentExperience();

  if (diff <= 0) return 0;
  return Math.ceil(
    diff /
      (1 + bonusExperience + (have_($skill`Testudinal Teachings`) ? 1 / 6 : 0))
  );
}

/**
 * Determines how many matter-duplicating drones are currently hovering around you
 *
 * @returns The number of matter-duplicating drones currently hovering around you
 */
export function currentDrones(): number {
  return get("gooseDronesRemaining");
}
