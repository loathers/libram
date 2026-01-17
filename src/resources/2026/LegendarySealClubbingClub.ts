import { Monster } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { get } from "../../property";
import { $item, $skill } from "../../template-string.js";
import * as Counter from "../../counter.js";

/**
 * @returns Whether you `have` the Legendary Seal-Clubbing Club
 */
export function have(): boolean {
  return have_($item`Legendary Seal-Clubbing Club`);
}

/**
 * @returns The number of casts of Club 'Em Across the Battlefield available to you right now.
 */
export function clubAcrossBattlefieldAvailable(): number {
  return have() ? $skill`Club 'Em Across the Battlefield`.dailylimit : 0;
}

/**
 * @returns The number of casts of Club 'Em Into Next Week available to you right now.
 */
export function clubIntoNextWeekAvailable(): number {
  return have() ? $skill`Club 'Em Into Next Week`.dailylimit : 0;
}

/**
 * @returns The monster you currently have copied with Club 'Em Into Next Week.
 */
export function clubIntoNextWeekMonster(): Monster | null {
  return get("clubEmNextWeekMonster");
}

/**
 * @returns The number of turns remaining until your current Club 'Em Into Next Week fight; infinity if the counter isn't currently set.
 */
export function turnsUntilNextWeekFight(): number {
  return Counter.get("Club 'Em Into Next Week Monster");
}

/**
 * @returns The number of casts of Club 'Em Back In Time available to you right now.
 */
export function clubBackInTimeAvailable(): number {
  return have() ? $skill`Club 'Em Back In Time`.dailylimit : 0;
}
