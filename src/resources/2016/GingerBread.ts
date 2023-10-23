import { Location, canAdventure } from "kolmafia";
import { get } from "../../property";
import { $location, $locations } from "../../template-string";

/**
 * @returns Whether or not you can currently access Gingerbread City
 */
export function available(): boolean {
  return (
    (get("gingerbreadCityAvailable") || get("_gingerbreadCityToday")) &&
    turns() < availableTurns()
  );
}

function turns(): number {
  return (
    get("_gingerbreadCityTurns") + (get("_gingerbreadClockAdvanced") ? 5 : 0)
  );
}

function availableTurns(): number {
  return 20 + (get("gingerExtraAdventures") ? 10 : 0);
}

/**
 * @returns The number of Gingerbread encounters until it's Midnight in the city; this may be negative if the time has passed
 */
export function minutesToMidnight(): number {
  return 19 - turns();
}

/**
 * @returns The number of Gingerbread encounters until it's Noon in the city; this may be negative if the time has passed
 */
export function minutesToNoon(): number {
  return 9 - turns();
}

export const LOCATIONS = Object.freeze(
  $locations`Gingerbread Civic Center, Gingerbread Train Station, Gingerbread Industrial Zone, Gingerbread Upscale Retail District, Gingerbread Sewers`
);

/**
 * @returns A list of all Gingerbread locations at which you can currently adventure
 */
export function availableLocations(): Location[] {
  return LOCATIONS.filter((l) => canAdventure(l));
}

const NOONS = new Map([
  [$location`Gingerbread Train Station`, 1204],
  [$location`Gingerbread Civic Center`, 1202],
  [$location`Gingerbread Industrial Zone`, 1206],
  [$location`Gingerbread Upscale Retail District`, 1208],
]);

const MIDNIGHTS = new Map([
  [$location`Gingerbread Train Station`, 1205],
  [$location`Gingerbread Civic Center`, 1203],
  [$location`Gingerbread Industrial Zone`, 1207],
  [$location`Gingerbread Upscale Retail District`, 1209],
]);

/**
 * @param location The location in question
 * @returns The id of the Noon choice adventure at that location; 0 if inapplicable
 */
export function getNoon(location: Location): number {
  return NOONS.get(location) ?? 0;
}

/**
 * @param location The location in question
 * @returns The id of the Midnight choice adventure at that location; 0 if inapplicable
 */
export function getMidnight(location: Location): number {
  return MIDNIGHTS.get(location) ?? 0;
}

/**
 * @returns Whether or not it is possible for you to fight Judge Fudge today
 */
export function canJudgeFudge(): boolean {
  if (minutesToNoon() >= 0) {
    return true;
  }
  if (minutesToMidnight() >= 0 && get("_gingerbreadColumnDestroyed")) {
    return true;
  }
  return false;
}
