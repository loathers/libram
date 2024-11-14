import { cliExecute, Familiar, splitModifiers, visitUrl } from "kolmafia";
import { FamiliarTag, getFamiliarTags, have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import { NumericModifier } from "../../modifierTypes.js";
import { Modifiers, parseModifiers } from "../../modifier.js";
import { StringProperty } from "../../propertyTypes.js";
import { maxBy } from "../../utils.js";

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

const distillateModifiers = (
  pref: StringProperty,
): Modifiers<NumericModifier> => parseModifiers(pref);

/**
 * @returns A `Modifiers` object that contains your next Distillate modifiers
 */
export function nextDistillateModifiers(): Modifiers<NumericModifier> {
  visitUrl("inventory.php?action=distill&pwd");
  return distillateModifiers("nextDistillateMods");
}

/**
 * @returns A `Modifiers` object that contains your current Distillate modifiers
 */
export function currentDistillateModifiers(): Modifiers<NumericModifier> {
  return distillateModifiers("currentDistillateMods");
}

/**
 * Checks distillate for specific modifiers
 * @param modifier determines what modifier to check stillsuit buffs against
 * @returns the modifier value for the given modifier
 */
export function distillateModifier(modifier: NumericModifier): number {
  visitUrl("inventory.php?action=distill&pwd");

  const value = splitModifiers("currentDistillateMods")[modifier];
  return value ? Number(value) : 0;
}

type StillsuitTag = Exclude<FamiliarTag, "pokefam">;

export const MODIFIER_TAGS: Record<StillsuitTag, NumericModifier> =
  Object.freeze({
    mineral: "Muscle",
    robot: "Muscle",
    organic: "Muscle",
    hasbones: "Muscle",
    technological: "Mysticality",
    orb: "Mysticality",
    sentient: "Mysticality",
    polygonal: "Mysticality",
    software: "Mysticality",
    cantalk: "Mysticality",
    humanoid: "Moxie",
    hashands: "Moxie",
    cute: "Moxie",
    good: "Moxie",
    phallic: "Moxie",
    animatedart: "Moxie",
    person: "Moxie",
    haseyes: "Item Drop",
    object: "Item Drop",
    haslegs: "Item Drop",
    food: "Food Drop",
    vegetable: "Food Drop",
    edible: "Food Drop",
    animal: "Damage Reduction",
    insect: "Damage Reduction",
    wearsclothes: "Damage Reduction",
    isclothes: "Damage Reduction",
    hasshell: "Damage Reduction",
    haswings: "Initiative",
    fast: "Initiative",
    flies: "Initiative",
    hovers: "Initiative",
    swims: "Initiative",
    aquatic: "Initiative",
    spooky: "Spooky Damage",
    undead: "Spooky Damage",
    evil: "Spooky Damage",
    reallyevil: "Spooky Damage",
    hot: "Hot Damage",
    cold: "Cold Damage",
    sleaze: "Sleaze Damage",
    stench: "Stench Damage",
    bite: "Weapon Damage",
    hasclaws: "Weapon Damage",
    hasbeak: "Weapon Damage",
    hasstinger: "Weapon Damage",
    hard: "Weapon Damage",
  } as const);

function isStillsuitTag(tag: string): tag is StillsuitTag {
  return tag in MODIFIER_TAGS;
}

/**
 * Calculate the ratio of stillsuit modifiers for a particular familiar.
 * @param familiar The familiar in question
 * @returns An object whose keys are NumericModifiers potentially granted by the stillsuit distillate from this familiar, and whose values are the relative weights of those modifiers
 */
export function modifierRatio(familiar: Familiar): Modifiers<NumericModifier> {
  const tags = getFamiliarTags(familiar);
  return tags.filter(isStillsuitTag).reduce<Modifiers<NumericModifier>>(
    (acc, tag) => ({
      ...acc,
      [MODIFIER_TAGS[tag]]: ((acc[MODIFIER_TAGS[tag]] ?? 0) + 1) / tags.length,
    }),
    {},
  );
}

/**
 * Identify the best familiar you have to generate stillsuit distillate for a given modifier
 * @param modifier The modifier in question
 * @returns The familiar you currently `have` that returns the best stillsuit distillate for that modifier.
 */
export function bestFamiliar(modifier: NumericModifier): Familiar {
  return maxBy(
    Familiar.all().filter(have),
    (familiar) => modifierRatio(familiar)[modifier] ?? 0,
  );
}
