import { use } from "kolmafia";

import { Copier } from "../Copier";
import {
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
  have as haveItem,
} from "../lib";
import { get } from "../property";
import { $item } from "../template-string";

export const box = $item`Rain-Doh black box`;

export function have(): boolean {
  return getFoldGroup(box).some((item) => haveItem(item));
}

export function getRainDohBlackBoxCopiesMade(): number {
  return Math.max(0, get("_raindohCopiesMade"));
}

export function couldUseRainDohBlackBox(): boolean {
  return (
    have() &&
    getRainDohBlackBoxCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function getRainDohBlackBoxMonster(): Monster | null {
  return get("rainDohMonster");
}

export function useRainDohBlackBox(): boolean {
  return use(box);
}

export const RainDohBlackBox = new Copier(
  () => couldUseRainDohBlackBox(),
  null,
  () => couldUseRainDohBlackBox(),
  () => getRainDohBlackBoxMonster(),
  () => useRainDohBlackBox()
);
