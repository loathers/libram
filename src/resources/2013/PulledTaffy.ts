import { get } from "../../property";
import { $item, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Taffy`;

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
  const commonChance = (1.0 - totalRareChance) / 4;
  const rareChance = onlyYellow
    ? 0.0
    : totalRareChance / (3 - get("_taffyYellowSummons"));
  const yellowChance =
    yellowSummons === 1 ? 0.0 : onlyYellow ? totalRareChance : rareChance;

  return new Map<Item, number>([
    [$item`pulled blue taffy`, commonChance],
    [$item`pulled orange taffy`, commonChance],
    [$item`pulled violet taffy`, commonChance],
    [$item`pulled red taffy`, commonChance],
    [$item`pulled indigo taffy`, rareChance],
    [$item`pulled green taffy`, rareChance],
    [$item`pulled yellow taffy`, yellowChance],
  ]);
}
