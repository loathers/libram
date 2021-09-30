import { myId } from "kolmafia";
import {
  close as closeDungeon,
  distribute as distributeDungeon,
  open as openDungeon,
  SlimeTube,
} from "./Dungeon";

export function close() {
  closeDungeon(SlimeTube);
}

export function open(
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
) {
  openDungeon(SlimeTube, paymentPolicy);
}

export function distribute(
  idOrName: number | string = myId(),
  loot: Item | Item[] = SlimeTube.loot,
  distributeAllOfAGivenItem = true
) {
  distributeDungeon(SlimeTube, idOrName, loot, distributeAllOfAGivenItem);
}
