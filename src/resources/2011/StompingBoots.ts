import { familiarWeight, useFamiliar, weightAdjustment } from "kolmafia";
import { have as _have, isCurrentFamiliar } from "../../lib";
import { get } from "../../property";
import { $familiar } from "../../template-string";

export const familiar = $familiar`Pair of Stomping Boots`;

/**
 * Returns true if the player has the Pair of Stomping Boots in their
 * terrarium
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * Returns the number of free runaways that have already been used
 *
 * @see Bandersnatch with which the Stomping Boots shares a counter
 */
export function getRunaways(): number {
  return get("_banderRunaways");
}

/**
 * Returns the total number of free runaways that the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */
export function getMaxRunaways(considerWeightAdjustment = true): number {
  const weightBuffs = considerWeightAdjustment ? weightAdjustment() : 0;
  return Math.floor((familiarWeight(familiar) + weightBuffs) / 5);
}

/**
 * Returns the number of remaining free runaways the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment
 */
export function getRemainingRunaways(considerWeightAdjustment = true): number {
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}

/**
 * Returns true if the player could use their Stomping Boots to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */
export function couldRunaway(considerWeightAdjustment = true): boolean {
  return have() && getRemainingRunaways(considerWeightAdjustment) > 0;
}

/**
 * Returns true if the player can use their Stomping Boots to get a
 * free run right now
 */
export function canRunaway(): boolean {
  return isCurrentFamiliar(familiar) && couldRunaway();
}

/**
 * Prepare a Stomping Boots runaway.
 *
 * This will take your Stomping Boots with you.
 * If any of those steps fail, it will return false.
 */
export function prepareRunaway(): boolean {
  return useFamiliar(familiar);
}
