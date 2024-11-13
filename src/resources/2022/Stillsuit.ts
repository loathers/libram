import { cliExecute, splitModifiers, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import { NumericModifier } from "../../modifierTypes.js";
import { Modifiers, parseModifiers } from "../../modifier.js";
import { StringProperty } from "../../propertyTypes.js";

/**
 * Do you own a still-suit?
 * @returns Whether you have the tiny stillsuit
 */
export function have(): boolean {
  return haveItem($item`tiny stillsuit`);
}

/**
 * @returns the expected adventures from drinking stillsuit distillate
 */
export function distillateAdventures(): number {
  if (!have()) return 0;
  const sweat = get("familiarSweat");
  return Math.round(sweat ** 0.4);
}

/**
 * Drinks stillsuit distillate
 * @returns whether distillate was successfully drunk
 */
export function drinkDistillate(): boolean {
  if (!have() || get("familiarSweat") <= 0) return false;
  return cliExecute("drink stillsuit distillate");
}

const distillateModifiers = (
  pref: StringProperty,
): Modifiers<NumericModifier> => parseModifiers(pref);

/**
 * @returns A `Modifiers` object that contains your next Distillate modifiers
 */
export function nextDistillateModifiers(): Modifiers<NumericModifier> {
  visitUrl("inventory.php?action=distill&pwd");
  return distillateModifiers("nextDistillateMods");
}

/**
 * @returns A `Modifiers` object that contains your current Distillate modifiers
 */
export function currentDistillateModifiers(): Modifiers<NumericModifier> {
  return distillateModifiers("currentDistillateMods");
}

/**
 * Checks distillate for specific modifiers
 * @param modifier determines what modifier to check stillsuit buffs against
 * @returns the modifier value for the given modifier
 */
export function distillateModifier(modifier: NumericModifier): number {
  visitUrl("inventory.php?action=distill&pwd");

  const value = splitModifiers("currentDistillateMods")[modifier];
  return value ? Number(value) : 0;
}
