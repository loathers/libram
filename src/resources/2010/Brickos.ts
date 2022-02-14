import { Item } from "kolmafia";
import { have as _have } from "../../lib";
import { get } from "../../property";
import { $item, $skill } from "../../template-string";

export const summonSkill = $skill`Summon BRICKOs`;

/**
 * @returns true if the player can Summon BRICKOs
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const eyeSummons = get("_brickoEyeSummons");
  const eyeChance = eyeSummons === 3 ? 0.0 : eyeSummons === 0 ? 0.5 : 1.0 / 3.0;
  return new Map<Item, number>([
    [$item`BRICKO eye brick`, eyeChance],
    [$item`BRICKO brick`, 3.0 - eyeChance],
  ]);
}
