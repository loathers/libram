import { get } from "../../property";
import { $item, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon BRICKOs`;
const brickoItem = $item`BRICKO brick`;
const brickoEyeItem = $item`BRICKO eye brick`;

/**
 * Returns true if the player can summon candy hearts
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * Returns A map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const results = new Map<Item, number>();
  const eyeSummons = get("_brickoEyeSummons");
  const eyeChance = eyeSummons < 3 ? (eyeSummons === 0 ? 0.5 : 1.0 / 3.0) : 0.0;
  results.set(brickoEyeItem, eyeChance);
  results.set(brickoItem, 3.0 - eyeChance);
  return results;
}
