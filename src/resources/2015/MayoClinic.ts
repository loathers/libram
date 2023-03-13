import { buy, getWorkshed, Item, retrieveItem, toInt, use } from "kolmafia";
import { have as haveItem } from "../../lib";
import logger from "../../logger";
import { get, withChoice } from "../../property";
import { $item } from "../../template-string";

export const Mayo = {
  nex: $item`Mayonex`,
  diol: $item`Mayodiol`,
  zapine: $item`Mayozapine`,
  flex: $item`Mayoflex`,
};

/**
 * @returns Whether the Mayo Clinic is our current active workshed
 */
export function installed(): boolean {
  return getWorkshed() === $item`portable Mayo Clinic`;
}

/**
 * @returns Whether we `have` the Mayo Clinic, or it's installed
 */
export function have(): boolean {
  return haveItem($item`portable Mayo Clinic`) || installed();
}

/**
 * Sets mayo minder to a particular mayo, and ensures you have enough of it.
 *
 * @param mayo Mayo to use
 * @param quantity Quantity to ensure
 * @returns Whether we succeeded in this endeavor; a trivial `false` for people without the clinic `installed`
 */
export function setMayoMinder(mayo: Item, quantity = 1): boolean {
  if (getWorkshed() !== $item`portable Mayo Clinic`) return false;
  if (!Object.values(Mayo).includes(mayo)) {
    logger.error("Invalid mayo selected");
    return false;
  }
  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name) {
    logger.error("Currently have incorrect mayo in mouth");
    return false;
  }
  retrieveItem(quantity, mayo);
  if (!haveItem($item`Mayo Minder™`)) buy($item`Mayo Minder™`);
  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, toInt(mayo) - 8260, () => use($item`Mayo Minder™`));
  }
  return get("mayoMinderSetting") === mayo.name;
}
