import { toItem, availableAmount } from "kolmafia";
import { get } from "../../property";

export const cleaver = toItem("June cleaver");

export function have(): boolean {
  return availableAmount(cleaver) > 0;
}

/**
 * @returns The number of cleaver-combats it currently takes to get a choice--this is agnostic of your current fights.
 */
export function getInterval(): number {
  return [1, 6, 10, 12, 15, 20][get("_juneCleaverEncounters")] ?? 30;
}

/**
 * @returns The number of fights until your next cleaver choice.
 */
export function fightsToNextChoice(): number {
  return getInterval() - get("_juneCleaverCharge");
}

/**
 * @returns The bonus damage your cleaver currently gives for a given element.
 */
export function damage(
  element: "Hot" | "Stench" | "Sleaze" | "Spooky" | "Cold"
): number {
  return get(`_juneCleaver${element}`);
}
