import { print, itemAmount, Item } from "kolmafia";
import { $item, $items } from "../src/index";

const lime = $item`lime`;
const citrus = $items`lime, lemon`;
const allItems = $items``;

if (lime.discardable) {
  print(`I have ${itemAmount(lime)} ${lime.quality} ${lime.plural}`);
}