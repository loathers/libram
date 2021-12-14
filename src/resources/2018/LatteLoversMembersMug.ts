import { getCounter } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export function have(): boolean {
  return haveItem($item`latte lovers member's mug`);
}

export function sniffedMonster(): Monster | null {
  return getCounter("Latte Monster") !== -1 ? get("_latteMonster") : null;
}

export function refillsRemaining(): number {
  return 3 - get("_latteRefillsUsed");
}
