import { get } from "../../property";
import { $item, $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Taffy`;
const commonItems = $items`pulled blue taffy, pulled orange taffy, pulled violet taffy, pulled red taffy`;
const rareItems = $items`pulled indigo taffy, pulled green taffy`;
const yellowItem = $item`pulled yellow taffy`;

/**
 * Returns true if the player can summon taffy
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * Returns A map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const results = new Map<Item, number>();
  const rareSummons = get("_taffyRareSummons");
  const rareChance = rareSummons < 4 ? 1.0 / 2 ** (rareSummons + 1) : 0.0;
  const yellowRemaining = get("_taffyYellowSummons") === 0;
  // Four possible rare summons, one and only one will be pulled yellow taffy
  if (rareChance > 0.0) {
    if (yellowRemaining) {
      if (rareSummons === 3) {
        results.set(yellowItem, rareChance);
        rareItems.forEach((item) => results.set(item, 0.0));
      } else {
        results.set(yellowItem, rareChance / rareItems.length + 1);
        rareItems.forEach((item) =>
          results.set(item, rareChance / rareItems.length + 1)
        );
      }
    } else {
      results.set(yellowItem, 0.0);
      rareItems.forEach((item) =>
        results.set(item, rareChance / rareItems.length)
      );
    }
  }
  commonItems.forEach((item) =>
    results.set(item, (1.0 - rareChance) / commonItems.length)
  );
  return results;
}
