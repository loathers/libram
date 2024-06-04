import { Item } from "kolmafia";
import { have as _have } from "../../lib.js";
import { get } from "../../property.js";
import { $item, $skill } from "../../template-string.js";

const summonSkill = $skill`Summon Party Favor`;

/**
 * @returns true if the player can Summon Party Favors
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const rareSummons = get("_favorRareSummons");
  const totalRareChance = 1.0 / 2 ** (rareSummons + 1);
  const commonChance = (1.0 - totalRareChance) / 3;
  const rareChance = totalRareChance / 3;

  return new Map<Item, number>([
    [$item`divine blowout`, commonChance],
    [$item`divine can of silly string`, commonChance],
    [$item`divine noisemaker`, commonChance],
    [$item`divine champagne flute`, rareChance],
    [$item`divine champagne popper`, rareChance],
    [$item`divine cracker`, rareChance],
  ]);
}
