import { Item, Monster, cliExecute, itemAmount, runChoice } from "kolmafia";
import { haveInCampground } from "../../lib";
import { get } from "../../property";
import { $item, $monster } from "../../template-string";

const item = $item`A Guide to Burning Leaves`;

export const burnFor = new Map<Monster | Item, number>([
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
  [$item`super-heated leaf`, 11111],
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
 * @returns Whether or not we can do the requested burn
 * @param leaves determines the number of leaves to burn
 */
export function burnSpecialLeaves(leaves: Item | Monster): boolean {
  const lea = burnFor.get(leaves);
  if (lea === undefined || lea > numberOfLeaves()) {
    return false;
  }
  return cliExecute(`leaves ${leaves}`);
}

/**
 * @returns Whether or not we can do the requested burn
 * @param leaves determines the number of leaves to burn
 */
export function burnLeaves(leaves: number): boolean {
  if (leaves > numberOfLeaves()) {
    return false;
  }
  return cliExecute(`leaves ${leaves}`);
}

function visitLeaves() {
  cliExecute("leaves");
}

/**
 * Checks whether you can, then jumps into the fire
 */
export function jumpInFire(): void {
  if (!get("_leavesJumped", false)) {
    visitLeaves();
    runChoice(2);
  }
}
