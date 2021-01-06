import { cliExecute, use } from "kolmafia";

import { Copier } from "../Copier";
import {
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
  have as haveItem,
} from "../lib";
import { get } from "../property";
import { $item } from "../template-string";

export const sheet = $item`Spooky Putty sheet`;

export function have(): boolean {
  return getFoldGroup(sheet).some((item) => haveItem(item));
}

export function getSpookyPuttySheetCopiesMade(): number {
  return Math.max(0, get("spookyPuttyCopiesMade"));
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
  return get("spookyPuttyMonster");
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
