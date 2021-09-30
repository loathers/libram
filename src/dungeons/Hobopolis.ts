import { myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  open as openDungeon,
  Hobopolis,
} from "./Dungeon";

export function close() {
  closeDungeon(Hobopolis);
}

export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
) {
  openDungeon(Hobopolis, paymentPolicy);
}

export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] = Hobopolis.loot,
  distributeAllOfAGivenItem = true
) {
  distributeDungeon(Hobopolis, idOrName, loot, distributeAllOfAGivenItem);
}
