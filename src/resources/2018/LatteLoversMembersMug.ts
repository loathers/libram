import { getCounter, Monster } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

/**
 * @returns Whether we `have` the latte lovers member's mug
 */
export function have(): boolean {
  return haveItem($item`latte lovers member's mug`);
}

/**
 * @returns The current target of `Offer Latte`, assuming the effect is active; otherwise, `null`
 */
export function sniffedMonster(): Monster | null {
  return getCounter("Latte Monster") !== -1 ? get("_latteMonster") : null;
}

/**
 * @returns The number of latte refills remaining for the day
 */
export function refillsRemaining(): number {
  return 3 - get("_latteRefillsUsed");
}
