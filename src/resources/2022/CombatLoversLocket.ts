import {
  cliExecute,
  getLocketMonsters,
  Monster,
  runCombat,
  toMonster,
} from "kolmafia";
import { CombatParams, have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import { clamp, maxBy } from "../../utils.js";

const locket = $item`combat lover's locket`;

/**
 * @returns Whether you `have` the Combat Lover's Locket
 */
export function have(): boolean {
  return haveItem(locket);
}

/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 *
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */
export function availableLocketMonsters(): Monster[] {
  if (reminiscesLeft() === 0) return [];
  return Object.entries(getLocketMonsters())
    .filter(([, unused]) => unused)
    .map(([name]) => toMonster(name));
}

/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 *
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */
export function unlockedLocketMonsters(): Monster[] {
  return Object.entries(getLocketMonsters()).map(([name]) => toMonster(name));
}

function parseLocketProperty() {
  return get("_locketMonstersFought")
    .split(",")
    .filter((id) => id.trim().length > 0);
}

/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 *
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */
export function reminiscesLeft(): number {
  return have() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}

/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 *
 * @returns An array consisting of the Monsters reminisced today.
 */
export function monstersReminisced(): Monster[] {
  return parseLocketProperty().map((id) => toMonster(id));
}

/**
 * Fight a Monster using the Combat Lover's Locket
 *
 * @param monster The Monster to fight
 * @param combatParams Any parameters you'd like to pass to `runCombat`
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */
export function reminisce(
  monster: Monster,
  ...combatParams: CombatParams
): boolean {
  if (!have() || reminiscesLeft() === 0 || !getLocketMonsters()[monster.name]) {
    return false;
  }

  cliExecute(`reminisce ${monster}`);
  runCombat(...combatParams);
  return monstersReminisced().includes(monster);
}

/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 *
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */
export function findMonster(
  criteria: (monster: Monster) => boolean,
  value: (monster: Monster) => number = () => 1,
): Monster | null {
  if (!have() || reminiscesLeft() === 0) return null;

  const options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return maxBy(options, value);
}

/**
 * Determine if a monster is currently reminiscible/reminiscable.
 * @param monster The monster in question
 * @returns Whether we can currently reminisce that monster
 */
export function canReminisce(monster: Monster): boolean {
  return (
    have() && reminiscesLeft() > 0 && Boolean(getLocketMonsters()[`${monster}`])
  );
}
