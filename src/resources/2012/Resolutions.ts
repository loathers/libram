import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Resolutions`;
const commonItems = $items`resolution: be feistier, resolution: be happier, resolution: be sexier, resolution: be smarter, resolution: be stronger, resolution: be wealthier`;
const rareItems = $items`resolution: be kinder, resolution: be luckier, resolution: be more adventurous`;
const libramExpected = new Map<Item, number>();
commonItems.forEach((item) =>
  libramExpected.set(item, 0.98 / commonItems.length)
);
rareItems.forEach((item) => libramExpected.set(item, 0.02 / rareItems.length));

/**
 * @returns true if the player can Summon Resolutions
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
