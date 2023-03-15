import { Item } from "kolmafia";
import { have as _have } from "../../lib";
import { $item, $skill } from "../../template-string";

export const summonSkill = $skill`Summon Resolutions`;
const commonChance = 0.98 / 6;
const rareChance = 0.02 / 3;
const libramExpected = new Map<Item, number>([
  [$item`resolution: be feistier`, commonChance],
  [$item`resolution: be happier`, commonChance],
  [$item`resolution: be sexier`, commonChance],
  [$item`resolution: be smarter`, commonChance],
  [$item`resolution: be stronger`, commonChance],
  [$item`resolution: be wealthier`, commonChance],
  [$item`resolution: be kinder`, rareChance],
  [$item`resolution: be luckier`, rareChance],
  [$item`resolution: be more adventurous`, rareChance],
]);

/**
 * @returns Whether the player can Summon Resolutions
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns Map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  return libramExpected;
}
