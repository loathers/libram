import { cliExecute, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import {
  arrayContains,
  NumericModifier,
  numericModifiers,
} from "../../index.js";

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
  return Math.round(sweat ^ 0.4);
}

/**
 * Drinks stillsuit distillate
 * @returns whether distillate was successfully drunk
 */
export function drinkDistillate(): boolean {
  if (!have() || get("familiarSweat") <= 0) return false;
  cliExecute("drink stillsuit distillate");
  return true;
}

/**
 * Checks distillate for specific modifiers
 * @param modifier determines what modifier to check stillsuit buffs against
 * @returns the modifier value for the given modifier
 */
export function distillateModifier(modifier: NumericModifier): number {
  visitUrl("inventory.php?action=distill&pwd"); // Update the mafia pref
  const distillateModsString = get("currentDistillateMods");

  const distillateMods: Record<NumericModifier, number> = distillateModsString
    .split(", ")
    .reduce(
      (acc, modString) => {
        const [key, value] = modString.split(": ");
        if (key && value && arrayContains(key, numericModifiers)) {
          acc[key as NumericModifier] = parseInt(value.replace("+", ""), 10);
        }
        return acc;
      },
      {} as Record<NumericModifier, number>,
    );

  return distillateMods[modifier] || 0;
}
