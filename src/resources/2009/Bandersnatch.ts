import {
  familiarWeight,
  useFamiliar,
  useSkill,
  weightAdjustment,
} from "kolmafia";
import { get } from "../../property";
import { $effect, $familiar, $skill } from "../../template-string";
import {
  have as _have,
  canRememberSong,
  getActiveSongs,
  isCurrentFamiliar,
  uneffect,
} from "../../lib";

export const familiar = $familiar`Frumious Bandersnatch`;

/**
 * Returns true if the player has the Frumious Bandersnatch in their
 * terrariukm
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * Returns the number of free runaways that have already been used
 * @see StompingBoots with which the Bandersnatch shares a counter
 */
export function getRunaways(): number {
  return get("_banderRunaways");
}

/**
 * Returns the total number of free runaways that the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */
export function getMaxRunaways(considerWeightAdjustment = true): number {
  const weightBuffs = considerWeightAdjustment ? weightAdjustment() : 0;
  return Math.floor((familiarWeight(familiar) + weightBuffs) / 5);
}

/**
 * Returns the number of remaining free runaways the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment
 */
export function getRemainingRunaways(considerWeightAdjustment = true): number {
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}

/**
 * Returns true if the player could use their Bandersnatch to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */
export function couldRunaway(considerWeightAdjustment = true): boolean {
  return have() && getRemainingRunaways(considerWeightAdjustment) > 0;
}

const odeSkill = $skill`Ode to Booze`;
const odeEffect = $effect`The Ode to Booze`;

/**
 * Returns true if the player can use their Bandersnatch to get a
 * free run right now
 */
export function canRunaway(): boolean {
  return isCurrentFamiliar(familiar) && couldRunaway() && _have(odeEffect);
}

/**
 * Prepare a Bandersnatch runaway.
 *
 * This will cast Ode to Booze and equip take your Bandersnatch with you.
 * If any of those steps fail, it will return false.
 *
 * @param songsToRemove Ordered list of songs that could be shrugged to make room for Ode to Booze
 */
export function prepareRunaway(songsToRemove: Effect[]): boolean {
  if (!_have(odeEffect)) {
    if (!_have(odeSkill)) {
      return false;
    }

    if (!canRememberSong()) {
      const activeSongs = getActiveSongs();

      for (const song of songsToRemove) {
        if (activeSongs.includes(song) && uneffect(song)) {
          break;
        }
      }
    }

    if (!useSkill(odeSkill)) {
      return false;
    }
  }

  return useFamiliar(familiar);
}
