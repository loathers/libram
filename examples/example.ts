import { $item, $items } from "../src/index";

const lime = $item`lime`;
const citrus = $items`lime, lemon`;
const allItems = $items``;

if (lime.discardable) {
  Lib.print(`I have ${Lib.itemAmount(lime)} ${lime.quality} ${lime.plural}`);
}