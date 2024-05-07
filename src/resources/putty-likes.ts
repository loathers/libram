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
 * Get total putty-like copies made
 *
 * @returns Total copies made
 */
export function getTotalPuttyLikeCopiesMade(): number {
  return getSpookyPuttySheetCopiesMade() + getRainDohBlackBoxCopiesMade();
}

/**
 * Determine if Rain-Doh black box can be used
 *
 * @returns Whether it can be used
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
  () => useRainDohBlackBox(),
);

/**
 * Determines whether you can still use a spooky putty sheet
 *
 * @returns Whether you can still use a spooky putty sheet
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
  () => useSpookyPuttySheet(),
);
