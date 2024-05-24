import { familiarWeight, useFamiliar, weightAdjustment } from "kolmafia";
import { have as _have, isCurrentFamiliar } from "../../lib.js";
import { get } from "../../property.js";
import { $familiar } from "../../template-string.js";

const familiar = $familiar`Pair of Stomping Boots`;

/**
 * @returns whether the player has the Pair of Stomping Boots in their terrarium
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * @returns number of free runaways that have already been used today
 * @see Bandersnatch with which the Stomping Boots shares a counter
 */
export function getRunaways(): number {
  return get("_banderRunaways");
}

/**
 * @param considerWeightAdjustment Include familiar weight modifiers
 * @returns total number of free runaways that the player can get from their Stomping Boots
 */
export function getMaxRunaways(considerWeightAdjustment = true): number {
  const weightBuffs = considerWeightAdjustment ? weightAdjustment() : 0;
  return Math.floor((familiarWeight(familiar) + weightBuffs) / 5);
}

/**
 * @param considerWeightAdjustment Whether to consider weight adjustment in free run calculation
 * @returns the number of remaining free runaways the player can get from their Stomping Boots
 */
export function getRemainingRunaways(considerWeightAdjustment = true): number {
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}

/**
 * @param considerWeightAdjustment Include familiar weight modifiers
 * @returns whether the player could use their Stomping Boots to get a free run in theory
 */
export function couldRunaway(considerWeightAdjustment = true): boolean {
  return have() && getRemainingRunaways(considerWeightAdjustment) > 0;
}

/**
 * @returns whether the player can use their Stomping Boots to get a free run right now
 */
export function canRunaway(): boolean {
  return isCurrentFamiliar(familiar) && couldRunaway();
}

/**
 * Prepare a Stomping Boots runaway.
 *
 * This will take your Stomping Boots with you.
 * If any of those steps fail, it will return false.
 *
 * @returns Success
 */
export function prepareRunaway(): boolean {
  return useFamiliar(familiar);
}
