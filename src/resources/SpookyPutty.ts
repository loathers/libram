import { cliExecute, use } from "kolmafia";

import {
  $item,
  have as haveItem,
  property,
  getFoldGroup,
  getTotalPuttyLikeCopiesMade,
} from "..";
import { Copier } from "../Copier";

export const sheet = $item`Spooky Putty sheet`;

export function have() {
  return getFoldGroup(sheet).some((item) => haveItem(item));
}

export function getSpookyPuttySheetCopiesMade() {
  return Math.max(0, property.getNumber("spookyPuttyCopiesMade"));
}

export function couldUseSpookyPuttySheet() {
  return (
    have() &&
    getSpookyPuttySheetCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export function prepareSpookyPuttySheet() {
  if (!have()) return false;
  if (haveItem(sheet)) return true;

  return cliExecute("fold Spooky putty sheet");
}

export function getSpookyPuttySheetMonster() {
  return property.getMonster("spookyPuttyMonster");
}

export function useSpookyPuttySheet() {
  return use(sheet);
}

export const SpookyPuttySheet = new Copier(
  () => couldUseSpookyPuttySheet(),
  () => prepareSpookyPuttySheet(),
  () => couldUseSpookyPuttySheet(),
  () => getSpookyPuttySheetMonster(),
  () => useSpookyPuttySheet()
);
