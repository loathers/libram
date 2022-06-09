import { toItem, availableAmount } from "kolmafia";
import { get } from "../../property";

export const cleaver = toItem("June cleaver");

export function have(): boolean {
  return availableAmount(cleaver) > 0;
}

/**
 * @returns The number of cleaver-combats it takes to get a particular encounter number--this is agnostic of your current fights.
 */
export function getInterval(
  encounters = get("_juneCleaverEncounters")
): number {
  return [1, 6, 10, 12, 15, 20][encounters] ?? 30;
}

/**
 * @returns The number of cleaver-combats it would take to get a particular encounter after skipping.
 */
export function getSkippedInterval(
  encounters = get("_juneCleaverEncounters")
): number {
  return [1, 2, 3, 3, 4, 5][encounters] ?? 8;
}

/**
 * @returns The bonus damage your cleaver currently gives for a given element.
 */
export function damage(
  element: "Hot" | "Stench" | "Sleaze" | "Spooky" | "Cold"
): number {
  return get(`_juneCleaver${element}`);
}

/**
 * @returns The number of additional times you can select option 4 in a cleaver choice today.
 */
export function skipsRemaining(): number {
  return 5 - get("_juneCleaverSkips");
}

export const choices = [
  1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475,
] as const;

/**
 * @returns An array consisting of the cleaver choice adventures currently in the queue.
 */
export function queue(): typeof choices[number][] {
  return get("juneCleaverQueue")
    .split(",")
    .filter((x) => x.trim().length > 0)
    .map((x) => parseInt(x)) as typeof choices[number][];
}

/**
 * @returns An array consisting of the cleaver choice adventures not currently in the queue.
 */
export function choicesAvailable(): typeof choices[number][] {
  const currentQueue = queue();
  return choices.filter((choice) => !currentQueue.includes(choice));
}
