import { canEquip, Familiar, familiarEquippedEquipment } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { get } from "../../property.js";
import { $familiar, $familiars, $item } from "../../template-string.js";
import { clamp } from "../../utils.js";

const cook = $familiar`Shorter-Order Cook`;

/**
 * @returns Whether you have the Shorter-Order Cook
 */
export function have(): boolean {
  return have_(cook);
}

/**
 * Determine how much experience a familiar will get when removed from the terrarium.
 *
 * @param familiar The familiar in question.
 * @param bluePlate Whether to treat the blue plate as equipped (defaults to the truth).
 * @returns How much experience you'd get taking this familiar out of the terrarium.
 */
export function pendingExperience(
  familiar: Familiar,
  bluePlate = familiarEquippedEquipment(cook) === $item`blue plate`,
): number {
  if (
    !have() ||
    !canEquip(cook) ||
    !have_(familiar) ||
    !canEquip(familiar) ||
    $familiars`Stocking Mimic, Inflatable Dodecapede`.includes(familiar) ||
    get("shortOrderCookFamiliars").split(";").includes(familiar.id.toString())
  ) {
    return 0;
  }
  return bluePlate ? 100 : 81;
}

/**
 * @returns Cook combats until the next potion drop.
 */
export function fightsUntilDrop(): number {
  return clamp(11 - get("_shortOrderCookCharge"), 1, 11);
}
