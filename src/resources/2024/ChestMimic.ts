import { visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $familiar } from "../../template-string";
import { clamp } from "../../utils";

// eslint-disable-next-line libram/verify-constants
const familiar = $familiar`Chest Mimic`;

/**
 * @returns Whether or not we currently `have` the cursed monkey's paw
 */
export function have(): boolean {
  return have_(familiar);
}

/**
 * @returns The number of eggs we can still acquire today
 */
export function eggs(): number {
  return clamp(11 - get("_mimicEggsObtained"), 0, 11);
}

/*export function inEggNetwork(mons: Monster): boolean {

} - Will include this eventually */

/**
 * @returns The current mimic XP
 */
export function mimicXp(): number {
  if (!have()) return 0;
  const regex = new RegExp(familiar + "\\s*(\\d+)\\s*experience");
  const famXp = visitUrl("familiar.php").match(regex);
  if (famXp === null) return 0;
  else return parseInt(famXp[1], 10);
}

/**
 * @returns The number of eggs we can make from monsters
 */
export function makeEggCopy(): number {
  return clamp(Math.min(mimicXp() / 50), 0, eggs());
}

/**
 * @returns The number of eggs we can make from monsters
 */
export function makeEggBank(): number {
  return clamp(Math.min(mimicXp() / 100), 0, eggs());
}
