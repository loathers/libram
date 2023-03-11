import { Item, myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  findLoot as findLootDungeon,
  Hobopolis,
  open as openDungeon,
} from "./Dungeon";

/**
 *
 */
export function close(): boolean {
  return closeDungeon(Hobopolis);
}

/**
 *
 * @param paymentPolicy
 */
export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
): boolean {
  return openDungeon(Hobopolis, paymentPolicy);
}

/**
 *
 * @param idOrName
 * @param loot
 * @param distributeAllOfAGivenItem
 */
export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] | Map<Item, number> = Hobopolis.loot,
  distributeAllOfAGivenItem = true
): void {
  distributeDungeon(Hobopolis, idOrName, loot, distributeAllOfAGivenItem);
}

/**
 *
 */
export function findLoot(): Map<Item, number> {
  return findLootDungeon(Hobopolis);
}
