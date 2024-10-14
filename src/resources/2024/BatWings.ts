import { equip, equippedItem, visitUrl } from "kolmafia";
import { have as have_, questStep } from "../../lib.js";
import { get } from "../../property.js";
import { $item, $skill, $slot } from "../../template-string.js";

/**
 * @returns Whether you `have` the Bat Wings
 */
export function have(): boolean {
  return have_($item`bat wings`);
}

/**
 * @returns The number of times you can swoop like a bat today
 */
export function swoopsRemaining(): number {
  return have() ? $skill`Swoop like a Bat`.dailylimit : 0;
}

/**
 * @returns The number of times you can rest upside down today
 */
export function restUpsideDownRemaining(): number {
  return have() ? $skill`Rest upside down`.dailylimit : 0;
}

/**
 * @returns The number of times you can summon a cauldron of bats today
 */
export function cauldronsRemaining(): number {
  return have() ? $skill`Summon Cauldron of Bats`.dailylimit : 0;
}

/**
 * Calculates the chance of getting a free fight with the Bat Wings equipped
 * @param flaps The number of times your wings have _already_ granted a free fight for the purposes of this calculation; defaults to its current value
 * @returns The chance of getting a free fight
 */
export function flapChance(flaps = get("_batWingsFreeFights")): number {
  return flaps < 5 ? 1 / (2 + flaps) : 0;
}

/**
 * Attempts to do bridge skip
 * @returns whether we were successfully able to skip the bridge
 */
export function jumpBridge(): boolean {
  if (
    get("chasmBridgeProgress") < 25 ||
    questStep("questL09Topping") === 0 ||
    !have()
  ) {
    return false;
  }
  if (get("chasmBridgeProgress") === 30 || questStep("questL09Topping") >= 1) {
    return true;
  }
  const back = equippedItem($slot`back`);
  equip($item`bat wings`);
  visitUrl("place.php?whichplace=orc_chasm&action=bridge_jump"); // Jump the bridge
  visitUrl("place.php?whichplace=highlands&action=highlands_dude"); // Tell mafia you jumped the bridge
  equip(back);
  return questStep("questL09Topping") >= 2; // have spoken to the highland lord
}
