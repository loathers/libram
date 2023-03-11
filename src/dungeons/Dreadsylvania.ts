import { Item, myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  Dreadsylvania,
  findLoot as findLootDungeon,
  open as openDungeon,
} from "./Dungeon";

/**
 *
 */
export function close(): boolean {
  return closeDungeon(Dreadsylvania);
}

/**
 *
 * @param paymentPolicy
 */
export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
): boolean {
  return openDungeon(Dreadsylvania, paymentPolicy);
}

/**
 *
 * @param idOrName
 * @param loot
 * @param distributeAllOfAGivenItem
 */
export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] | Map<Item, number> = Dreadsylvania.loot,
  distributeAllOfAGivenItem = true
): void {
  distributeDungeon(Dreadsylvania, idOrName, loot, distributeAllOfAGivenItem);
}

/**
 *
 */
export function findLoot(): Map<Item, number> {
  return findLootDungeon(Dreadsylvania);
}
