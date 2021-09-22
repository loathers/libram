import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Dice`;
const libramItems = $items`d4, d6, d8, d10, d12, d20`;

/**
 * Returns true if the player can summon dice
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * Returns A map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const results = new Map<Item, number>();
  libramItems.forEach((item) => results.set(item, 1.0 / libramItems.length));
  return results;
}
