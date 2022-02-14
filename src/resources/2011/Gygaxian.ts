import { Item } from "kolmafia";
import { have as _have } from "../../lib";
import { $item, $skill } from "../../template-string";

export const summonSkill = $skill`Summon Dice`;
const libramChance = 1.0 / 6;
const libramExpected = new Map<Item, number>([
  [$item`d4`, libramChance],
  [$item`d6`, libramChance],
  [$item`d8`, libramChance],
  [$item`d10`, libramChance],
  [$item`d12`, libramChance],
  [$item`d20`, libramChance],
]);

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
