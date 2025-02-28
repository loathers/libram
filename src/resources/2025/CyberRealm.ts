import { gamedayToString, Item } from "kolmafia";
import { realmAvailable } from "../../lib.js";
import { $item } from "../../index.js";

/**
 * @returns Whether or not you have Cyber Realm
 */
export function have(): boolean {
  return realmAvailable("cyber");
}

const ZONE3ITEMS_ARRAY: Item[] = [
  $item`dedigitizer schematic: virtual cybertattoo`, // Index 0 → Day 1
  $item`dedigitizer schematic: SLEEP(5) rom chip`,
  $item`dedigitizer schematic: insignificant bit`,
  $item`dedigitizer schematic: OVERCLOCK(10) rom chip`,
  $item`dedigitizer schematic: hashing vise`,
  $item`dedigitizer schematic: geofencing rapier`,
  $item`dedigitizer schematic: STATS+++ rom chip`,
  $item`dedigitizer schematic: geofencing shield`,
];

/**
 * @returns The Zone 3 Item we expect to find today, based on KOL Calendar
 */
export function zone3Rewards(): Item {
  const lastDigit = parseInt(gamedayToString().slice(-1), 10);
  return ZONE3ITEMS_ARRAY[lastDigit - 1]; // Adjust index since array starts at 0
}
