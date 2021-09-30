import { myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  Dreadsylvania,
  open as openDungeon,
} from "./Dungeon";

export function close() {
  closeDungeon(Dreadsylvania);
}

export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
) {
  openDungeon(Dreadsylvania, paymentPolicy);
}

export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] = Dreadsylvania.loot,
  distributeAllOfAGivenItem = true
) {
  distributeDungeon(Dreadsylvania, idOrName, loot, distributeAllOfAGivenItem);
}
