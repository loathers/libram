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

/**
 * Checks distillate for specific modifiers
 * @param modifier determines what modifier to check stillsuit buffs against
 * @returns the modifier value for the given modifier
 */
export function distillateModifier(modifier: string): number {
  // Retrieve the current distillate modifiers as a string
  const distillateMods = get("currentDistillateMods");

  // Construct a regex pattern to match the modifier and capture the numeric value
  const regex = new RegExp(`${modifier}: \\+?(-?\\d+)`);
  const match = distillateMods.match(regex);

  // If a match is found, parse and return the captured number; otherwise, return 0
  return match ? parseInt(match[1], 10) : 0;
}
