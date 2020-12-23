import { cliExecute, use } from "kolmafia";

import {
  $item,
  have as haveItem,
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
  prop,
} from "..";
import { Copier } from "../Copier";

export const sheet = $item`Spooky Putty sheet`;

export function have(): boolean {
  return getFoldGroup(sheet).some((item) => haveItem(item));
}

export function getSpookyPuttySheetCopiesMade(): number {
  return Math.max(0, prop("spookyPuttyCopiesMade"));
}

export function couldUseSpookyPuttySheet(): boolean {
  return (
    have() &&
    getSpookyPuttySheetCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function prepareSpookyPuttySheet(): boolean {
  if (!have()) return false;
  if (haveItem(sheet)) return true;

  return cliExecute("fold Spooky putty sheet");
}

export function getSpookyPuttySheetMonster(): Monster | null {
  return prop("spookyPuttyMonster");
}

export function useSpookyPuttySheet(): boolean {
  return use(sheet);
}

export const SpookyPuttySheet = new Copier(
  () => couldUseSpookyPuttySheet(),
  () => prepareSpookyPuttySheet(),
  () => couldUseSpookyPuttySheet(),
  () => getSpookyPuttySheetMonster(),
  () => useSpookyPuttySheet()
);
