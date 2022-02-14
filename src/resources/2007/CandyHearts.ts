import { Item } from "kolmafia";
import { have as _have } from "../../lib";
import { $item, $skill } from "../../template-string";

export const summonSkill = $skill`Summon Candy Heart`;
const libramChance = 1.0 / 6;
const libramExpected = new Map<Item, number>([
  [$item`green candy heart`, libramChance],
  [$item`lavender candy heart`, libramChance],
  [$item`orange candy heart`, libramChance],
  [$item`pink candy heart`, libramChance],
  [$item`white candy heart`, libramChance],
  [$item`yellow candy heart`, libramChance],
]);

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
