import { bufferToFile } from "kolmafia";
import { have as have_ } from "../../lib";
import { $item } from "../../template-string";

const item = $item`Everfull Dart Holster`;

/**
 * @returns whether you `have` the Everfull Dart Holster
 */
export function have(): boolean {
  return have_(item);
}

const PERKS = [
  "Throw a second dart quickly",
  "Deal 25-50% more damage",
  "You are less impressed by bullseyes",
  "25% Better bullseye targeting",
  "Extra stats from stats targets",
  "Butt awareness",
  "Add Hot Damage",
  "Add Cold Damage",
  "Add Sleaze Damage",
  "Add Spooky Damage",
  "Add Stench Damage",
  "Expand your dart capacity by 1",
  "Bullseyes do not impress you much",
  "25% More Accurate bullseye targeting",
  "Deal 25-50% extra damage",
  "Expand your dart capacity by 1",
  "Increase Dart Deleveling from deleveling targets",
  "Deal 25-50% greater damage",
  "Extra stats from stats targets",
  "25% better chance to hit bullseyes",
] as const;
export type Perk = typeof PERKS[number];

/**
 * Creates a choice adventure script that allows you to prioritize certain dart perks. Does not set it as your current `choiceAdventureScript`.
 *
 * @param name What to name your script
 * @param priority An array containing the various Dart Perks you'd like to choose, ordered from most desirable to least
 * @returns Whether we successfully wrote to the file.
 */
export function makeChoiceAdventureScript(
  name: string,
  priority: Perk[]
): boolean {
  const script = `Object.assign(globalThis, require('kolmafia'));
  const priority = [${priority.map((perk) => `'${perk}'`).join(", ")}];
  module.exports.main = (choice, page) => {
    if (choice === 1525) {
      const options = Object.entries(availableChoiceOptions());
      const perkChoices = priority.map((perk) => options.find(([option, text]) => text === perk)?.option);
      return runChoice(perkChoices.find(Boolean) || 0);
    }
  }`;
  return bufferToFile(script, `${name}.js`);
}
