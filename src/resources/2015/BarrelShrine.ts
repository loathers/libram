import { availableAmount, runChoice, visitUrl } from "kolmafia";
import { get } from "../../property.js";
import { $items } from "../../template-string.js";
import { sum } from "../../utils.js";

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

  visitUrl("inv_use.php?pwd&whichitem=8568&choice=1");

  for (let i = 0; i < total / 100; i++) {
    runChoice(2);
  }
}
