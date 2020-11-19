import { $item, $items } from "../src/index";

const lime = $item`lime`;
const citrus = $items`lime, lemon`;
const allItems = $items``;

if (lime.discardable) {
  Lib.print(lime.name);
}