import { Item, equippedItem, stringModifier } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { $item, $slots } from "../../template-string.js";
import { Modifiers, parseModifierString } from "../../modifier";

/**
 * @returns Whether or not you `have` The Eternity Codpiece
 */
export function have(): boolean {
  return have_($item`The Eternity Codpiece`);
}

export const SLOTS = Object.freeze(
  $slots`codpiece1, codpiece2, codpiece3, codpiece4, codpiece5`,
);

/**
 * @returns An array of the current gems you have equipped in your codpiece, regardless of whether the codpiece is active
 */
export function currentGems(): Item[] {
  return SLOTS.map((slot) => equippedItem(slot));
}

/**
 * Determines if a given item is a codpieceable gem
 * @param item The gem in question
 * @returns Whether or not it can be placed into your codpiece
 */
export function equippable(item: Item): boolean {
  return stringModifier(`EternityCodpiece:${item}`, "Modifiers").length > 0;
}

/**
 * Parse the expected modifiers of a gem item into a `Modifiers` object
 * @param item The gem in question
 * @returns A `Modifiers` object representing the gem's enchantment in the codpiece
 */
export function modifiers(item: Item): Modifiers {
  return parseModifierString(
    stringModifier(`EternityCodpiece:${item}, "Modifiers`),
  );
}
