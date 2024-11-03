import { have as have_ } from "../../lib.js";
import { $item } from "../../template-string.js";
import { get } from "../../property.js";
import { clamp } from "../../utils.js";

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
export type Perk = (typeof PERKS)[number];

/**
 * @returns An array consisting of the current dart perks you have unlocked
 */
export function currentPerks(): Perk[] {
  return get("everfullDartPerks").split(",") as Perk[];
}

/**
 * @returns Whether you currently have all possible dart perks
 */
export function perksMaxed(): boolean {
  return currentPerks().length === PERKS.length;
}

function makePerkFunction(
  perkOrPerks: readonly Perk[] | Perk,
  formula: (perks: number) => number,
) {
  const current = currentPerks();
  if (Array.isArray(perkOrPerks)) {
    return () =>
      formula(perkOrPerks.filter((perk) => current.includes(perk)).length);
  }
  return () => formula(current.filter((perk) => perk === perkOrPerks).length);
}

const BULLSEYE_ACCURACY_PERKS = [
  "25% Better bullseye targeting",
  "25% better chance to hit bullseyes",
  "25% More Accurate bullseye targeting",
] as const;
/**
 * @returns The chance of landing a bullseye
 */
export const bullseyeChance = makePerkFunction(
  BULLSEYE_ACCURACY_PERKS,
  (perks) => clamp(0.25 * (1 + perks), 0, 1),
);

const BULLSEYE_COOLDOWN_PERKS = [
  "You are less impressed by bullseyes",
  "Bullseyes do not impress you much",
] as const;
/**
 * @returns The current number of turns of Everything Looks Red you'll receive on a bullseye
 */
export const bullseyeCooldown = makePerkFunction(
  BULLSEYE_COOLDOWN_PERKS,
  (perks) => clamp(50 - 10 * perks, 30, 50),
);

/**
 * @returns The total number of darts you can have available based on your current perks
 */
export const dartCapacity = makePerkFunction(
  "Expand your dart capacity by 1",
  (perks) => 1 + perks,
);
