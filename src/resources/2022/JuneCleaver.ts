import { toItem, availableAmount } from "kolmafia";
import { get } from "../../property";

export const cleaver = toItem("June cleaver");

/**
 * Determines whether you currently `have` the June cleaver
 *
 * @returns Whether you currently `have` the June cleaver
 */
export function have(): boolean {
  return availableAmount(cleaver) > 0;
}

/**
 * Determines the number of cleaver-combats it takes to get a particular encounter number.
 *
 * @param encounters The ordinal value of the June cleaver encounter you're asking about
 * @returns The number of cleaver-combats it takes to get a particular encounter number--this is agnostic of your current fights.
 */
export function getInterval(
  encounters = get("_juneCleaverEncounters")
): number {
  return [1, 6, 10, 12, 15, 20][encounters] ?? 30;
}

/**
 * Determines the number of cleaver-combats it takes to get a particular encounter number, when a skip is in the mix
 *
 * @param encounters The ordinal value of the June cleaver encounter you're asking about, assuming you've skipped
 * @returns The number of cleaver-combats it would take to get a particular encounter after skipping.
 */
export function getSkippedInterval(
  encounters = get("_juneCleaverEncounters")
): number {
  return [1, 2, 3, 3, 4, 5][encounters] ?? 8;
}

/**
 * Determines the amount of bonus elemental damage your cleaver currently grants
 *
 * @param element The element in question
 * @returns The bonus damage your cleaver currently gives for a given element.
 */
export function damage(
  element: "Hot" | "Stench" | "Sleaze" | "Spooky" | "Cold"
): number {
  return get(`_juneCleaver${element}`);
}

/**
 * Determines the number of times today you can skip a june cleaver choice
 *
 * @returns The number of additional times you can select option 4 in a cleaver choice today.
 */
export function skipsRemaining(): number {
  return 5 - get("_juneCleaverSkips");
}

export const choices = [
  1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475,
] as const;

/**
 * Returns the current June cleaver queue; you are not currently able to encounter any June cleaver choice adventure in this list
 *
 * @returns An array consisting of the cleaver choice adventures currently in the queue.
 */
export function queue(): typeof choices[number][] {
  return get("juneCleaverQueue")
    .split(",")
    .filter((x) => x.trim().length > 0)
    .map((x) => parseInt(x)) as typeof choices[number][];
}

/**
 * Determines which choices are currently eligible to be encountered with your June cleaver
 *
 * @returns An array consisting of the cleaver choice adventures not currently in the queue.
 */
export function choicesAvailable(): typeof choices[number][] {
  const currentQueue = queue();
  return choices.filter((choice) => !currentQueue.includes(choice));
}
