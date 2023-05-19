import { Item } from "kolmafia";
import { have as _have } from "../../lib";
import { $item, $skill } from "../../template-string";

const summonSkill = $skill`Summon Love Song`;
const libramChance = 1.0 / 6;
const libramExpected = new Map([
  [$item`love song of disturbing obsession`, libramChance],
  [$item`love song of icy revenge`, libramChance],
  [$item`love song of naughty innuendo`, libramChance],
  [$item`love song of smoldering passion`, libramChance],
  [$item`love song of sugary cuteness`, libramChance],
  [$item`love song of vague ambiguity`, libramChance],
]);

/**
 * @returns true if the player can Summon Love Song
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
