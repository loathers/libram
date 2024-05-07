import {
  canEquip,
  cliExecute,
  Effect,
  haveEffect,
  Item,
  toSlot,
} from "kolmafia";

import { ensureEffect, have } from "../../lib";
import { get } from "../../property";
import { $effect, $slot } from "../../template-string";

const firstTeaPartyEffect = $effect`Assaulted with Pepper`;
const lastTeaPartyEffect = $effect`Oleaginous Soles`;

/**
 * Checks if an item is a valid hat for The Mad Tea Party
 *
 * @param item The item to check
 * @param characters The desired nameLength for The Mad Tea Party effect
 * @returns If this item is a valid hat for The Mad Tea Party
 */
function validTeaPartyHat(item: Item, characters: number): boolean {
  if (toSlot(item) !== $slot`hat` || !canEquip(item)) {
    return false;
  } else if (characters <= 5) {
    return item.nameLength <= 5;
  } else if (characters >= 30) {
    return item.nameLength >= 30;
  }
  return characters === item.nameLength;
}

/**
 * Find the name length required to get an effect from The Mad Tea Party
 *
 * @param effect The effect to check
 * @returns The number of characters required to get an effect
 */
export function findTeaPartyHatLength(effect: Effect): number {
  const effectId = effect.id;
  if (effectId < firstTeaPartyEffect.id || effectId > lastTeaPartyEffect.id) {
    throw new Error(`Invalid Mad Tea Party effect ${effect}`);
  }
  return Math.floor(effectId - firstTeaPartyEffect.id + 5);
}

/**
 * Find all hats that will get an effect from The Mad Tea Party
 *
 * @param effect The effect to check
 * @returns An array of equippable hats
 */
export function findTeaPartyHats(effect: Effect): Item[] {
  const characters = findTeaPartyHatLength(effect);
  if (!characters) {
    throw new Error(`Invalid Mad Tea Party effect ${effect}`);
  }
  return Item.all().filter((item) => validTeaPartyHat(item, characters));
}

/**
 * Check if a hat is available to get an effect from The Mad Tea Party
 *
 * @param effect The effect to check
 * @returns If any valid hat is in inventory
 */
export function haveTeaPartyHat(effect: Effect): boolean {
  const characters = findTeaPartyHatLength(effect);
  if (!characters) {
    throw new Error(`Invalid Mad Tea Party effect ${effect}`);
  }
  return (
    Item.all().find(
      (item) => validTeaPartyHat(item, characters) && have(item),
    ) !== undefined
  );
}

/**
 * Try to get an effect from The Mad Tea Party
 *
 * @param effect The effect to get
 * @returns If the request was successful
 */
export function tryTeaPartyBuff(effect: Effect): boolean {
  if (get("_madTeaParty")) {
    return false;
  }

  const characters = findTeaPartyHatLength(effect);
  if (!characters) {
    throw new Error(`Invalid Mad Tea Party effect ${effect}`);
  }

  if (!haveTeaPartyHat(effect)) {
    return false;
  }

  ensureEffect($effect`Down the Rabbit Hole`);
  if (!have($effect`Down the Rabbit Hole`)) {
    return false;
  }

  const turns = haveEffect(effect);
  cliExecute(`hatter ${characters}`);
  return have(effect) && haveEffect(effect) > turns;
}
