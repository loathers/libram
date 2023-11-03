import { Item, Monster, itemAmount, visitUrl } from "kolmafia";
import { haveInCampground } from "../../lib";
import { get } from "../../property";
import { $item, $monster } from "../../template-string";

const item = $item`A Guide to Burning Leaves`;

export const burnItem: Map<Item, number> = new Map([
  [$item`autumnic bomb`, 37],
  [$item`impromptu torch`, 42],
  [$item`flaming fig leaf`, 43],
  [$item`smoldering drape`, 44],
  [$item`distilled resin`, 50],
  [$item`autumnal aegis`, 66],
  [$item`lit leaf lasso`, 69],
  [$item`forest canopy bed`, 74],
  [$item`autumnic balm`, 99],
  [$item`day shortener`, 222],
  [$item`coping juice`, 1111],
  [$item`super-heated leaf`, 11111],
]);

export const burnMonster: Map<Monster, number> = new Map([
  [$monster`flaming leaflet`, 11],
  [$monster`flaming monstera`, 111],
  [$monster`leaviathan`, 666],
]);

/**
 * @returns Whether or not we currently `have` the GuidetoBurningLeaves
 */
export function have(): boolean {
  return haveInCampground(item);
}

/**
 * @returns The number of leaves we have remaining
 */
export function numberOfLeaves(): number {
  return itemAmount($item`inflammable leaf`);
}

function visitLeaves() {
  visitUrl("campground.php?preaction=leaves");
}

/**
 * Checks whether you can, then jumps into the fire
 */
export function jumpInFire(): void {
  if (get("_leavesJumped", false)) {
    visitLeaves();
    visitUrl("choice.php?pwd&whichchoice=1510&option=2");
  }
}
