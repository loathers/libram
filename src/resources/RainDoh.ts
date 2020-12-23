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

export function have() {
  return getFoldGroup(box).some((item) => haveItem(item));
}

export function getRainDohBlackBoxCopiesMade() {
  return Math.max(0, property.getNumber("_raindohCopiesMade"));
}

export function couldUseRainDohBlackBox() {
  return (
    have() &&
    getRainDohBlackBoxCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function getRainDohBlackBoxMonster() {
  return property.getMonster("rainDohMonster");
}

export function useRainDohBlackBox() {
  return use(box);
}

export const RainDohBlackBox = new Copier(
  () => couldUseRainDohBlackBox(),
  null,
  () => couldUseRainDohBlackBox(),
  () => getRainDohBlackBoxMonster(),
  () => useRainDohBlackBox()
);
