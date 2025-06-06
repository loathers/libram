import {
  getMonsters,
  Location,
  Monster,
  setProperty,
  toLocation,
} from "kolmafia";
import { have as have_ } from "../../lib.js";
import { get, Properties } from "../../property.js";
import { $item } from "../../template-string.js";

const peridot = $item`Peridot of Peril`;

/**
 * @returns Whether you `have` the Peridot of Peril.
 */
export function have(): boolean {
  return have_(peridot);
}

/**
 * @returns An array of what locations you've used your peridot of peril in today.
 */
export function zonesToday(): Location[] {
  return get("_perilLocations")
    .split(",")
    .filter(Boolean)
    .map((id) => toLocation(Number(id)));
}

/**
 * Determine if you've already used your peridot NC in a particular location today.
 * @param location The location in question.
 *
 * @returns Whether or not you've used the peridot in that location yet today.
 */
export function periledToday(location: Location): boolean {
  return RegExp(`(?:^|,)${location.id}(?:$|,)`).test(get("_perilLocations"));
}

/**
 * Determine if you can get the peridot NC in a particular location.
 * @param location The location in question.
 *
 * @returns Whether or not you can currently get the peridot NC in that location.
 */
export function canImperil(location: Location): boolean {
  return (
    location.wanderers &&
    location.combatPercent >= 0 &&
    getMonsters(location).length > 0 &&
    !periledToday(location)
  );
}

/**
 * Create a `Properties` object for handling the peridot choice for a given monster.
 * @param monster The monster in question.
 *
 * @returns A `Properties` object to handle the peridot choice for the given monster.
 */
export function getChoiceProperty(monster: Monster): Properties {
  return { 1557: `1&bandersnatch=${monster.id}` };
}

/**
 * Set the `choiceAdventure1557` pref to fight the given monster.
 * @param monster The monster in question.
 */
export function setChoice(monster: Monster) {
  setProperty("choiceAdventure1557", `1&bandersnatch=${monster.id}`);
}
