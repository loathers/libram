import { use } from "kolmafia";

import {
  $item,
  have as haveItem,
  property,
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
} from "..";
import { Copier } from "../Copier";

export const box = $item`Rain-Doh black box`;

export function have(): boolean {
  return getFoldGroup(box).some((item) => haveItem(item));
}

export function getRainDohBlackBoxCopiesMade(): number {
  return Math.max(0, property.getNumber("_raindohCopiesMade"));
}

export function couldUseRainDohBlackBox(): boolean {
  return (
    have() &&
    getRainDohBlackBoxCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function getRainDohBlackBoxMonster(): Monster | null {
  return property.getMonster("rainDohMonster");
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
