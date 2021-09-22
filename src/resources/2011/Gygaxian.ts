import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Dice`;
const libramItems = $items`d4, d6, d8, d10, d12, d20`;
const libramExpected = new Map<Item, number>(
  libramItems.map((item) => [item, 1.0 / libramItems.length])
);

/**
 * @returns true if the player can Summon Dice
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
