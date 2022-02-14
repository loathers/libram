import { Item, myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  findLoot as findLootDungeon,
  open as openDungeon,
  SlimeTube,
} from "./Dungeon";

export function close(): boolean {
  return closeDungeon(SlimeTube);
}

export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
): boolean {
  return openDungeon(SlimeTube, paymentPolicy);
}

export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] | Map<Item, number> = SlimeTube.loot,
  distributeAllOfAGivenItem = true
): void {
  distributeDungeon(SlimeTube, idOrName, loot, distributeAllOfAGivenItem);
}

export function findLoot(): Map<Item, number> {
  return findLootDungeon(SlimeTube);
}
