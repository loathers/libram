import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Love Song`;
const libramItems = $items`love song of disturbing obsession, love song of icy revenge, love song of naughty innuendo, love song of smoldering passion, love song of sugary cuteness, love song of vague ambiguity`;
const libramExpected = new Map<Item, number>(
  libramItems.map((item) => [item, 1.0 / libramItems.length])
);

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
