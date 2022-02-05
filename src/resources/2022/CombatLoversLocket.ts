import {
  cliExecute,
  getLocketMonsters,
  Monster,
  setAutoAttack,
  toMonster,
} from "kolmafia";
import { Macro } from "../..";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { clamp } from "../../utils";

// eslint-disable-next-line libram/verify-constants
const locket = $item`Combat Lover's Locket`;

export function have(): boolean {
  return haveItem(locket);
}

export function availableLocketMonsters(): Monster[] {
  return Object.entries(getLocketMonsters())
    .filter(([, unused]) => unused)
    .map(([name]) => toMonster(name));
}

export function unlockedLocketMonsters(): Monster[] {
  return Object.entries(getLocketMonsters()).map(([name]) => toMonster(name));
}

export function reminiscesLeft(): number {
  return clamp(3 - get("_locketMonstersFought").split(",").length, 0, 3);
}

export function monstersReminisced(): Monster[] {
  return get("_locketMonstersFought")
    .split(",")
    .map((name) => toMonster(name));
}

export function reminisce<T extends Macro>(
  monster: Monster,
  macro: T,
  useAuto = false
): boolean {
  if (
    !have() ||
    reminiscesLeft() === 0 ||
    !availableLocketMonsters().includes(monster)
  ) {
    return false;
  }

  setAutoAttack(0);
  if (useAuto) macro.setAutoAttack();
  macro.save();

  try {
    cliExecute(`reminisce ${monster}`);
  } finally {
    Macro.clearSaved();
    if (useAuto) setAutoAttack(0);
  }

  return monstersReminisced().includes(monster);
}
