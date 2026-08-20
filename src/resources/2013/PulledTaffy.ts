import { Item } from "kolmafia";
import { have as _have } from "../../lib.js";
import { get } from "../../property.js";
import { $item, $items, $skill } from "../../template-string.js";

const summonSkill = $skill`Summon Taffy`;

/**
 * @returns true if the player can Summon Taffy
 */
export function have(): boolean {
  return _have(summonSkill);
}

export const RED_TAFFY_DROPS = $items`Alewife™ Ale, bazookafish bubble gum, beefy fish meat, dull fish scale, eel battery, eel sauce, glistening fish meat, high-pressure seltzer bottle, imitation crab crate, ink bladder, live nautical mine, Mer-kin healscroll, Mer-kin lunchbox, Mer-kin thingpouch, pufferfish spine, rough fish scale, salinated mint julep, sand dollar, sea lace, seaweed, shark cartilage, slick fish meat, slug of rum, slug of shochu, slug of vodka, soggy seed packet`;

export const RED_TAFFY_DROP_WEIGHTS = new Map<Item, number>([
  [$item`Alewife™ Ale`, 0.03],
  [$item`bazookafish bubble gum`, 0.03],
  [$item`beefy fish meat`, 0.03],
  [$item`dull fish scale`, 0.0925],
  [$item`eel battery`, 0.03],
  [$item`eel sauce`, 0.03],
  [$item`glistening fish meat`, 0.03],
  [$item`high-pressure seltzer bottle`, 0.03],
  [$item`imitation crab crate`, 0.03],
  [$item`ink bladder`, 0.03],
  [$item`live nautical mine`, 0.03],
  [$item`Mer-kin healscroll`, 0.03],
  [$item`Mer-kin lunchbox`, 0.0925],
  [$item`Mer-kin thingpouch`, 0.03],
  [$item`pufferfish spine`, 0.03],
  [$item`rough fish scale`, 0.03],
  [$item`salinated mint julep`, 0.03],
  [$item`sand dollar`, 0.125],
  [$item`sea lace`, 0.03],
  [$item`seaweed`, 0.03],
  [$item`shark cartilage`, 0.03],
  [$item`slick fish meat`, 0.03],
  [$item`slug of rum`, 0.03],
  [$item`slug of shochu`, 0.03],
  [$item`slug of vodka`, 0.03],
  [$item`soggy seed packet`, 0.03],
]);

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
