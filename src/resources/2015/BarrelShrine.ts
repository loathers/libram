import { availableAmount, runChoice } from "kolmafia";
import { directlyUse } from "../../lib";
import { get } from "../../property";
import { $item, $items } from "../../template-string";
import { sum } from "../../utils";

const BARRELS = $items`little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel`;

/**
 * @returns Whether we have the barrel shrine
 */
export function have() {
  return get("barrelShrineUnlocked");
}

/**
 * Smashes all barrels in our inventory
 */
export function smashParty() {
  if (!have()) return;

  const total = sum(BARRELS, availableAmount);
  if (total <= 0) return;

  directlyUse($item`little firkin`);

  for (let i = 0; i < total / 100; i++) {
    runChoice(2);
  }
}
