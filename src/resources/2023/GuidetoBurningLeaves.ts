import { Item, Monster, itemAmount, visitUrl } from "kolmafia";
import { haveInCampground } from "../../lib";
import { $item, $monster } from "../../template-string";

const item = $item`A Guide to Burning Leaves`;

type Thing = Item | Monster;

export const specialLeaves: Map<Thing, number> = new Map([
  [$monster`flaming leaflet`, 11],
  [$item`autumnic bomb`, 37],
  [$item`impromptu torch`, 42],
  [$item`flaming fig leaf`, 43],
  [$item`smoldering drape`, 44],
  [$item`distilled resin`, 50],
  [$item`autumnal aegis`, 66],
  [$item`lit leaf lasso`, 69],
  [$item`forest canopy bed`, 74],
  [$item`autumnic balm`, 99],
  [$monster`flaming monstera`, 111],
  [$item`day shortener`, 222],
  [$monster`leaviathan`, 666],
  [$item`coping juice`, 1111],
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

/**
 * Burns the desired number of leaves
 */
export function burnLeaves(leaves: number): void {
  if (leaves > numberOfLeaves()) {
    visitUrl(`choice.php?pwd&whichchoice=1510&leaves=${leaves}`);
  }
}

/**
 * @returns The whether we can acquire the item or fight the monster in question
 */
expor;
export function canBurnFor(th: Thing): boolean {
  return numberOfLeaves() > specialLeaves.get(th);
}
