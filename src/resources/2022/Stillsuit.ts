import { cliExecute, Familiar, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import { NumericModifier } from "../../modifierTypes.js";
import { maxBy } from "../../index.js";

export const STILLSUIT_TRAIT_VALUES: Map<NumericModifier, string[]> = new Map([
  ["Muscle", ["mineral", "robot", "organic", "hasbones"]],
  [
    "Mysticality",
    ["technological", "orb", "sentient", "polygonal", "software", "cantalk"],
  ],
  [
    "Moxie",
    [
      "humanoid",
      "hashands",
      "cute",
      "good",
      "phallic",
      "animatedart",
      "person",
    ],
  ],
  ["Item Drop", ["haseyes", "object", "haslegs"]],
  ["Food Drop", ["food", "vegetable", "edible"]],
  [
    "Damage Reduction",
    ["animal", "insect", "wearsclothes", "isclothes", "hasshell"],
  ],
  ["Initiative", ["haswings", "fast", "flies", "hovers", "swims", "aquatic"]],
  ["Spooky Damage", ["spooky", "undead", "evil", "reallyevil"]],
  ["Hot Damage", ["hot"]],
  ["Cold Damage", ["cold"]],
  ["Sleaze Damage", ["sleaze"]],
  ["Stench Damage", ["stench"]],
  ["Weapon Damage", ["bite", "hasclaws", "hasbeak", "hasstinger", "hard"]],
]);

/**
 * Do you own a still-suit?
 * @returns Whether you have the tiny stillsuit
 */
export function have(): boolean {
  return haveItem($item`tiny stillsuit`);
}

/**
 * @returns the expected adventures from drinking stillsuit distillate
 */
export function distillateAdventures(): number {
  if (!have()) return 0;
  const sweat = get("familiarSweat");
  return Math.round(sweat ** 0.4);
}

/**
 * Drinks stillsuit distillate
 * @returns whether distillate was successfully drunk
 */
export function drinkDistillate(): boolean {
  if (!have() || get("familiarSweat") <= 0) return false;
  return cliExecute("drink stillsuit distillate");
}

/**
 * Checks distillate for specific modifiers
 * @param modifier determines what modifier to check stillsuit buffs against
 * @returns the modifier value for the given modifier
 */
export function distillateModifier(modifier: NumericModifier): number {
  visitUrl("inventory.php?action=distill&pwd");
  // Retrieve the current distillate modifiers as a string
  const distillateMods = get("currentDistillateMods");

  const experienceMap: Record<string, string> = {
    "Muscle Experience": "Experience (Muscle)",
    "Mysticality Experience": "Experience (Mysticality)",
    "Moxie Experience": "Experience (Moxie)",
  };

  // Adjust the modifier if it is one of the special cases
  const adjustedModifier = experienceMap[modifier] ?? modifier;

  // Construct a regex pattern to match the modifier and capture the numeric value
  const regex = new RegExp(`${adjustedModifier}: \\+?(-?\\d+)`);
  const match = distillateMods.match(regex);

  // If a match is found, parse and return the captured number; otherwise, return 0
  return match ? Number(match[1]) : 0;
}

/**
 * Checks a familiar for the expected distillate ratios
 * @param familiar determines what familiar to check ratios for
 * @returns the stillsuit modifier and ratios
 */
export function expectedDistillate(
  familiar: Familiar,
): [NumericModifier, number][] {
  const familiarTags = familiar.attributes.split(";").map((tag) => tag.trim()); // split and trim tags
  const result: [NumericModifier, number][] = [];

  STILLSUIT_TRAIT_VALUES.forEach((traits, modifier) => {
    const count = traits.reduce(
      (sum, trait) => sum + (familiarTags.includes(trait) ? 1 : 0),
      0,
    );
    if (count > 0) {
      result.push([modifier, count]);
    }
  });

  return result;
}

/**
 * Checks for the best familiar to maximize the given modifier
 * @param modifier the numeric modifier we want to search against
 * @returns the familiar with the highest ratio
 */
export function bestFamiliarModifier(
  modifier: NumericModifier,
): Familiar | null {
  const haveFamiliars = Familiar.all().filter((f) => haveItem(f));
  const familiarRatios: [Familiar, number][] = [];

  haveFamiliars.forEach((familiar) => {
    const modifiers = expectedDistillate(familiar);
    let desiredCount = 0;
    let otherCount = 0;

    modifiers.forEach(([mod, count]) => {
      if (mod === modifier) {
        desiredCount = count;
      } else {
        otherCount += count;
      }
    });

    const ratio = otherCount === 0 ? Infinity : desiredCount / otherCount;
    familiarRatios.push([familiar, ratio]);
  });

  const bestEntry = maxBy(familiarRatios, ([, ratio]) => ratio);
  return bestEntry ? bestEntry[0] : null;
}
