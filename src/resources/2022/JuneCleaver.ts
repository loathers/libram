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
 * @returns The bonus damage your cleaver currently gives for a given element.
 */
export function damage(
  element: "Hot" | "Stench" | "Sleaze" | "Spooky" | "Cold"
): number {
  return get(`_juneCleaver${element}`);
}

export function skipsRemaining(): number {
  return 5 - get("_juneCleaverSkips");
}

export const choices = [
  1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475,
] as const;

export function choicesAvailable(): typeof choices[number][] {
  const queue = get("juneCleaverQueue")
    .split(",")
    .filter((x) => x.trim().length > 0)
    .map((x) => parseInt(x));
  return choices.filter((choice) => !queue.includes(choice));
}
