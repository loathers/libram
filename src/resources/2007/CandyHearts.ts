import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Candy Heart`;
const libramItems = $items`green candy heart, lavender candy heart, orange candy heart, pink candy heart, white candy heart, yellow candy heart`;
const libramExpected = new Map<Item, number>(
  libramItems.map((item) => [item, 1.0 / libramItems.length])
);

/**
 * @returns true if the player can Summon Candy Heart
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  return libramExpected;
}
