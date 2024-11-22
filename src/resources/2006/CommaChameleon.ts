import { $familiar } from "../../template-string.js";
import { have as have_ } from "../../lib.js";
import { Familiar, familiarEquipment, toInt, visitUrl } from "kolmafia";

const familiar = $familiar`Comma Chameleon`;

/**
 * Determines whether the player has the Comma Chameleon in their
 * terrarium
 *
 * @returns Whether the player has a Comma Chameleon
 */
export function have(): boolean {
  return have_(familiar);
}

/**
 * Transforms Comma Chameleon into the familiar of choice
 * @param fam determines what to transform into
 * @returns Whether Comma has been successfully transformed
 */
export function transform(fam: Familiar): boolean {
  const equipment = familiarEquipment(fam);
  if (equipment !== $item.none) return false;
  if (!have_(equipment)) return false;
  visitUrl(
    `inv_equip.php?which=2&action=equip&whichitem=${toInt(equipment)}&pwd`,
  );
  return true;
}
