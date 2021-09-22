import { get } from "../../property";
import { $item, $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Taffy`;
const commonItems = $items`pulled blue taffy, pulled orange taffy, pulled violet taffy, pulled red taffy`;
const rareItems = $items`pulled indigo taffy, pulled green taffy`;
const yellowItem = $item`pulled yellow taffy`;

/**
 * @returns true if the player can Summon Taffy
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const rareSummons = get("_taffyRareSummons");
  const yellowSummons = get("_taffyYellowSummons");
  const onlyYellow = yellowSummons === 0 && rareSummons === 3;
  const totalRareChance = rareSummons < 4 ? 1.0 / 2 ** (rareSummons + 1) : 0.0;
  const rareItemChance = onlyYellow
    ? 0.0
    : totalRareChance / (rareItems.length + 1 - get("_taffyYellowSummons"));
  const yellowChance =
    yellowSummons === 1 ? 0.0 : onlyYellow ? totalRareChance : rareItemChance;

  const results = new Map<Item, number>();
  commonItems.forEach((item) =>
    results.set(item, (1.0 - totalRareChance) / commonItems.length)
  );
  rareItems.forEach((item) =>
    results.set(item, rareItemChance / rareItems.length)
  );
  results.set(yellowItem, yellowChance);
  return results;
}
