import { Copier } from "../Copier";
import {
  getSpookyPuttySheetCopiesMade,
  getSpookyPuttySheetMonster,
  have as haveSpookyPutty,
  prepareSpookyPuttySheet,
  useSpookyPuttySheet,
} from "./2009/SpookyPutty";
import {
  getRainDohBlackBoxCopiesMade,
  getRainDohBlackBoxMonster,
  have as haveRainDoh,
  useRainDohBlackBox,
} from "./2012/RainDoh";

/**
 *
 */
export function getTotalPuttyLikeCopiesMade(): number {
  return getSpookyPuttySheetCopiesMade() + getRainDohBlackBoxCopiesMade();
}

/**
 *
 */
export function couldUseRainDohBlackBox(): boolean {
  return (
    haveRainDoh() &&
    getRainDohBlackBoxCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export const RainDohBlackBox = new Copier(
  () => couldUseRainDohBlackBox(),
  null,
  () => couldUseRainDohBlackBox(),
  () => getRainDohBlackBoxMonster(),
  () => useRainDohBlackBox()
);

/**
 *
 */
export function couldUseSpookyPuttySheet(): boolean {
  return (
    haveSpookyPutty() &&
    getSpookyPuttySheetCopiesMade() < 5 &&
    getTotalPuttyLikeCopiesMade() < 6
  );
}

export const SpookyPuttySheet = new Copier(
  () => couldUseSpookyPuttySheet(),
  () => prepareSpookyPuttySheet(),
  () => couldUseSpookyPuttySheet(),
  () => getSpookyPuttySheetMonster(),
  () => useSpookyPuttySheet()
);
