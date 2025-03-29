import { $familiar, $item } from "../../template-string.js";
import { have as have_ } from "../../lib.js";
import { Familiar, familiarEquipment, toInt, visitUrl } from "kolmafia";
import { get } from "../../property.js";

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
 * Transforms Comma Chameleon into the familiar of choice if you already have the appropriate familiar equipment
 * Will not transform if you do not
 * @param fam determines what to transform into
 * @returns Whether Comma has been successfully transformed
 */
export function transform(fam: Familiar): boolean {
  if (currentFamiliar() === fam) {
    return true;
  }
  const equipment = familiarEquipment(fam);
  if (equipment === $item.none) return false;
  if (!have_(equipment)) return false;
  visitUrl(
    `inv_equip.php?which=2&action=equip&whichitem=${toInt(equipment)}&pwd`,
  );
  return true;
}

/**
 * @returns The current familiar that Comma is behaving as
 */
export function currentFamiliar(): Familiar | null {
  return get("commaFamiliar");
}
