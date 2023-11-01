import { Item, Monster, itemAmount, visitUrl } from "kolmafia";
import { haveInCampground } from "../../lib";
import { $item, $monster } from "../../template-string";
import { get } from "../../property";

const item = $item`A Guide to Burning Leaves`;

export const specialLeaves: Map<Item | Monster, number> = new Map([
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
 * @param leaves Burns the desired number of leaves
 * @returns whether we could burn that number of leaves
 */
export function burnLeaves(leaves: number): boolean {
  if (leaves > numberOfLeaves()) {
    visitUrl(`choice.php?pwd&whichchoice=1510&leaves=${leaves}`);
    return true;
  }
  return false;
}

/**
 * @param th determines which thing (Monster or Item) we want to burn leaves for
 * @returns The whether we can acquire the item or fight the monster in question
 */
export function canBurnFor(th: Monster | Item): boolean {
  return numberOfLeaves() > specialLeaves.get(th);
}

/**
 * Checks whether you can, then jumps into the fire
 */
export function jumpInFire(): void {
  if (get("_leavesJumped", false))
    visitUrl("choice.php?pwd&whichchoice=1510&option=2");
}
