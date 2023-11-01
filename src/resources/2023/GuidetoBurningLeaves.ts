import { Item, Monster, itemAmount, visitUrl } from "kolmafia";
import { haveInCampground } from "../../lib";
import { $item, $monster } from "../../template-string";

const item = $item`A Guide to Burning Leaves`;

type Thing = Item | Monster;

export const specialLeaves: Map<number, Thing> = new Map([
  [11, $monster`flaming leaflet`],
  [37, $item`autumnic bomb`],
  [42, $item`impromptu torch`],
  [43, $item`flaming fig leaf`],
  [44, $item`smoldering drape`],
  [50, $item`distilled resin`],
  [66, $item`autumnal aegis`],
  [69, $item`lit leaf lasso`],
  [74, $item`forest canopy bed`],
  [99, $item`autumnic balm`],
  [111, $monster`flaming monstera`],
  [222, $item`day shortener`],
  [666, $monster`leaviathan`],
  [1111, $item`coping juice`],
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
