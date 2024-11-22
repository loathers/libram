import { $familiar } from "../../template-string.js";
import { have as _have } from "../../lib.js";
import { Familiar, familiarEquipment, toInt, visitUrl } from "kolmafia";

const familiar = $familiar`Comma Chameleon`;

/**
 * Determines whether the player has the Comma Chameleon in their
 * terrarium
 *
 * @returns Whether the player has a Comma Chameleon
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * Transforms Comma Chameleon into the familiar of choice
 * @param fam determines what to transform into
 * @returns Whether Comma has been successfully transformed
 */
export function transform(fam: Familiar): boolean {
  let equipment = null;
  equipment = familiarEquipment(fam);
  if (!equipment) return false;
  if (!_have(equipment)) return false;
  visitUrl(
    `inv_equip.php?which=2&action=equip&whichitem=${toInt(equipment)}&pwd`,
  );
  return true;
}
