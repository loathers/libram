import { Monster, use } from "kolmafia";

import { getFoldGroup, have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

const box = $item`Rain-Doh black box`;

/**
 * See whether the player has a Rain-Doh item in some form
 *
 * @returns Whether the player has any Rain-Doh item
 */
export function have(): boolean {
  return getFoldGroup(box).some((item) => haveItem(item));
}

/**
 * Get Rain-Doh black box copies made today
 *
 * @returns Number of Rain-Doh black box copies made
 */
export function getRainDohBlackBoxCopiesMade(): number {
  return Math.max(0, get("_raindohCopiesMade"));
}

/**
 * Get the current Rain-doh box monster
 *
 * @returns Current Rain-doh box monster
 */
export function getRainDohBlackBoxMonster(): Monster | null {
  return get("rainDohMonster");
}

/**
 * Use the Rain-Doh box full of monster (i.e. fight the monster probably)
 *
 * @returns Success
 */
export function useRainDohBlackBox(): boolean {
  return use(box);
}
