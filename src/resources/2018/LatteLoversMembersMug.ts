import { getCounters } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export function have(): boolean {
  return haveItem($item`latte lovers member's mug`);
}
export function sniffedMonster(): Monster | null {
  return getCounters("Latte Monster", 0, 69).trim()
    ? get("_latteMonster")
    : null;
}
