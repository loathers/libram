import { use } from "kolmafia";

import {
  $item,
  have as haveItem,
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
  prop
} from "..";
import { Copier } from "../Copier";

export const box = $item`Rain-Doh black box`;

export function have(): boolean {
  return getFoldGroup(box).some((item) => haveItem(item));
}

export function getRainDohBlackBoxCopiesMade(): number {
  return Math.max(0, prop("_raindohCopiesMade"));
}

export function couldUseRainDohBlackBox(): boolean {
  return (
    have() &&
    getRainDohBlackBoxCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function getRainDohBlackBoxMonster(): Monster | null {
  return prop("rainDohMonster");
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
