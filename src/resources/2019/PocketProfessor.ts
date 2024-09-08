import { haveEquipped } from "kolmafia";
import { have as have_, totalFamiliarWeight } from "../../lib.js";
import { get } from "../../property.js";
import { $familiar, $item } from "../../template-string.js";

const familiar = $familiar`Pocket Professor`;

/**
 * @returns Whether you `have` the Pocket Professor
 */
export function have(): boolean {
  return have_(familiar);
}

/**
 * @returns Whether or not you're currently able to `Deliver your Thesis`
 */
export function canThesis(): boolean {
  return have() && familiar.experience >= 400 && !get("_thesisDelivered");
}

/**
 * Calculate the total number of lectures available to you given a particular familiar weight and chip-equipped status
 * @param weight The weight to calculate at--defaults to your current total familiar weight
 * @param includeChip Whether or not to include the memory chip--defaults to whether or not it's currently equipped
 * @returns The total number of lectures you're able to deliver, including ones you've already delivered today
 */
export function totalAvailableLectures(
  weight = totalFamiliarWeight(familiar),
  includeChip = haveEquipped($item`Pocket Professor memory chip`),
): number {
  return (includeChip ? 2 : 0) + Math.floor(Math.sqrt(weight - 1));
}

/**
 * @returns The number of Pocket Professor lectures you've delivered today
 */
export function lecturesDelivered(): number {
  return get("_pocketProfessorLectures");
}

/**
 * Calculate the number of unused lectures available to you given a particular familiar weight and chip-equipped status
 * @param weight The weight to calculate at--defaults to your current total familiar weight
 * @param includeChip Whether or not to include the memory chip--defaults to whether or not it's currently equipped
 * @returns The number of lectures you're able to deliver, accounting for any you've already delivered today
 */
export function currentlyAvailableLectures(
  weight = totalFamiliarWeight(familiar),
  includeChip = haveEquipped($item`Pocket Professor memory chip`),
): number {
  return totalAvailableLectures(weight, includeChip) - lecturesDelivered();
}
