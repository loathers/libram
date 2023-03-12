import { cliExecute, Monster, use } from "kolmafia";

import { getFoldGroup, have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const sheet = $item`Spooky Putty sheet`;

/**
 * See whether the player has a Spooky Putty item in some form
 *
 * @returns Whether the player has any Spooky Putty item
 */
export function have(): boolean {
  return getFoldGroup(sheet).some((item) => haveItem(item));
}

/**
 * Get spooky putty sheet copies made today
 *
 * @returns Number of spooky putty sheet copies made
 */
export function getSpookyPuttySheetCopiesMade(): number {
  return Math.max(0, get("spookyPuttyCopiesMade"));
}

/**
 * Prepares a spooky putty sheet for use
 *
 * @returns Success
 */
export function prepareSpookyPuttySheet(): boolean {
  if (!have()) return false;
  if (haveItem(sheet)) return true;

  return cliExecute("fold Spooky putty sheet");
}

/**
 * Get the current puttied monster
 *
 * @returns Current puttied monster
 */
export function getSpookyPuttySheetMonster(): Monster | null {
  return get("spookyPuttyMonster");
}

/**
 * Use the spooky putty sheet (i.e. fight the monster probably)
 *
 * @returns Success
 */
export function useSpookyPuttySheet(): boolean {
  return use(sheet);
}
