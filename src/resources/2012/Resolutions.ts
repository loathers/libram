import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Resolutions`;
const commonItems = $items`resolution: be feistier, resolution: be happier, resolution: be sexier, resolution: be smarter, resolution: be stronger, resolution: be wealthier`;
const rareItems = $items`resolution: be kinder, resolution: be luckier, resolution: be more adventurous`;

/**
 * Returns true if the player can summon resolutions
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * Returns A map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const results = new Map<Item, number>();
  const rareChance = 0.02;
  rareItems.forEach((item) => results.set(item, rareChance / rareItems.length));
  commonItems.forEach((item) =>
    results.set(item, (1.0 - rareChance) / commonItems.length)
  );
  return results;
}
