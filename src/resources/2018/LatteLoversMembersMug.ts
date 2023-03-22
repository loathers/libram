import { cliExecute, Location, Monster } from "kolmafia";
import { Modifiers } from "../..";
import * as Counter from "../../counter";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item, $location } from "../../template-string";
import { clamp } from "../../utils";

/**
 * @returns Whether we `have` the latte lovers member's mug
 */
export function have(): boolean {
  return haveItem($item`latte lovers member's mug`);
}

/**
 * @returns The current target of `Offer Latte`, assuming the effect is active; otherwise, `null`
 */
export function sniffedMonster(): Monster | null {
  return Counter.exists("Latte Monster") ? get("_latteMonster") : null;
}

/**
 * @returns The number of latte refills remaining for the day
 */
export function refillsRemaining(): number {
  return clamp(3 - get("_latteRefillsUsed"), 0, 3);
}

const UNLOCKABLE_INGREDIENTS = {
  "ancient spice": {
    modifier: { "Spooky Damage": 50 },
    location: $location`The Mouldering Mansion`,
  },
  "asp venom": {
    modifier: { "Weapon Damage": 25 },
    location: $location`The Middle Chamber`,
  },
  basil: {
    modifier: { "HP Regen Min": 5, "HP Regen Max": 5 },
    location: $location`The Overgrown Lot`,
  },
  "belgian vanilla": {
    modifier: {
      "Moxie Percent": 20,
      "Mysticality Percent": 20,
      "Muscle Percent": 20,
    },
    location: $location`Whitey's Grove`,
  },
  "blue chalks": {
    modifier: { "Cold Damage": 25 },
    location: $location`The Haunted Billiards Room`,
  },
  "bug-thistle": {
    modifier: { Mysticality: 20 },
    location: $location`The Bugbear Pen`,
  },
  butternut: {
    modifier: { "Spell Damage": 10 },
    location: $location`Madness Bakery`,
  },
  cajun: {
    modifier: { "Meat Drop": 40 },
    location: $location`The Black Forest`,
  },
  carrot: {
    modifier: { "Item Drop": 20 },
    location: $location`The Dire Warren`,
  },
  carrrdamom: {
    modifier: { "MP Regen Min": 4, "MP Regen Max": 6 },
    location: $location`Barrrney's Barrr`,
  },
  "chili seeds": {
    modifier: { "Hot Resistance": 3 },
    location: $location`The Haunted Kitchen`,
  },
  clove: {
    modifier: { "Stench Resistance": 3 },
    location: $location`The Sleazy Back Alley`,
  },
  coal: {
    modifier: { "Hot Damage": 25 },
    location: $location`The Haunted Boiler Room`,
  },
  "cocoa powder": {
    modifier: { "Cold Resistance": 3 },
    location: $location`The Icy Peak`,
  },
  "diet soda": {
    modifier: { Initiative: 50 },
    location: $location`Battlefield (No Uniform)`,
  },
  "dwarf cream": {
    modifier: { Muscle: 30 },
    location: $location`Itznotyerzitz Mine`,
  },
  dyspepsi: {
    modifier: { Initiative: 25 },
    location: $location`Battlefield (Dyspepsi Uniform)`,
  },
  "filth milk": {
    modifier: { "Damage Reduction": 20 },
    location: $location`The Feeding Chamber`,
  },
  "fresh grass": {
    modifier: { Experience: 3 },
    location: $location`The Hidden Park`,
  },
  fungus: {
    modifier: { "Maximum MP": 30 },
    location: $location`The Fungal Nethers`,
  },
  "grave mold": {
    modifier: { "Spooky Damage": 20 },
    location: $location`The Unquiet Garves`,
  },
  "greek spice": {
    modifier: { "Sleaze Damage": 25 },
    location: $location`Wartime Frat House`,
  },
  "grobold rum": {
    modifier: { "Sleaze Damage": 25 },
    location: $location`The Old Rubee Mine`,
  },
  guarna: {
    modifier: { Adventures: 4 },
    location: $location`The Bat Hole Entrance`,
  },
  gunpowder: {
    modifier: { "Weapon Damage": 50 },
    location: $location`1st Floor, Shiawase-Mitsuhama Building`,
  },
  "health potion": {
    modifier: { "HP Regen Min": 10, "HP Regen Max": 20 },
    location: $location`The Daily Dungeon`,
  },
  hellion: {
    modifier: { "PvP Fights": 6 },
    location: $location`The Dark Neck of the Woods`,
  },
  "hobo spices": {
    modifier: { "Damage Absorption": 50 },
    location: $location`Hobopolis Town Square`,
  },
  "hot sausage": {
    modifier: { "Muscle Percent": 50 },
    location: $location`Cobb's Knob Barracks`,
  },
  "hot wing": {
    modifier: { "Combat Rate": 10 },
    location: $location`The Dark Heart of the Woods`,
  },
  ink: {
    modifier: { "Combat Rate": -10 },
    location: $location`The Haunted Library`,
  },
  kombucha: {
    modifier: { "Stench Damage": 25 },
    location: $location`Wartime Hippy Camp`,
  },
  "lihc saliva": {
    modifier: { "Spooky Damage": 25 },
    location: $location`The Defiled Niche`,
  },
  "lizard milk": {
    modifier: { "MP Regen Min": 5, "MP Regen Max": 15 },
    location: $location`The Arid, Extra-Dry Desert`,
  },
  macaroni: {
    modifier: { "Maximum HP": 20 },
    location: $location`The Haunted Pantry`,
  },
  "mega sausage": {
    modifier: { "Moxie Percent": 50 },
    location: $location`Cobb's Knob Laboratory`,
  },
  "motor oil": {
    modifier: { "Sleaze Damage": 20 },
    location: $location`The Old Landfill`,
  },
  msg: {
    modifier: { "Critical Hit Percent": 15 },
    location: $location`The Briniest Deepests`,
  },
  "norwhal milk": {
    modifier: { "Maximum HP Percent": 200 },
    location: $location`The Ice Hole`,
  },
  "oil paint": {
    modifier: { "Prismatic Damage": 5 },
    location: $location`The Haunted Gallery`,
  },
  "paradise milk": {
    modifier: { Moxie: 20, Muscle: 20, Mysticality: 20 },
    location: $location`The Stately Pleasure Dome`,
  },
  rawhide: {
    modifier: { "Familiar Weight": 5 },
    location: $location`The Spooky Forest`,
  },
  "rock salt": {
    modifier: { "Critical Hit Percent": 10 },
    location: $location`The Brinier Deepers`,
  },
  salt: {
    modifier: { "Critical Hit Percent": 5 },
    location: $location`The Briny Deeps`,
  },
  sandalwood: {
    modifier: { Moxie: 5, Muscle: 5, Mysticality: 5 },
    location: $location`Noob Cave`,
  },
  sausage: {
    modifier: { "Mysticality Percent": 50 },
    location: $location`Cobb's Knob Kitchens`,
  },
  "space pumpkin": {
    modifier: { Moxie: 10, Muscle: 10, Mysticality: 10 },
    location: $location`The Hole in the Sky`,
  },
  "spaghetti squash": {
    modifier: { "Spell Damage": 10 },
    location: $location`The Copperhead Club`,
  },
  teeth: {
    modifier: { "Spooky Damage": 25, "Weapon Damage": 25 },
    location: $location`The VERY Unquiet Garves`,
  },
  vitamin: {
    modifier: { "Familiar Experience": 3 },
    location: $location`The Dark Elbow of the Woods`,
  },
  "white flour": {
    modifier: { "Sleaze Resistance": 3 },
    location: $location`The Road to the White Citadel`,
  },
  "squamous salt": {
    modifier: { "Spooky Resistance": 3 },
    location: $location`The Caliginous Abyss`,
  },
} as const;

const FREE_INGREDIENTS = {
  "pumpkin spice": {
    modifier: {
      "Mysticality Experience": 1,
      "Spell Damage": 5,
      "Mysticality Percent": 5,
    },
  },
  cinnamon: {
    modifier: {
      "Moxie Experience": 1,
      "Pickpocket Rate": 5,
      "Moxie Percent": 5,
    },
  },
  vanilla: {
    modifier: {
      "Muscle Experience": 1,
      "Weapon Damage Percent": 5,
      "Muscle Percent": 5,
    },
  },
} as const;

export type UnlockableIngredient = keyof typeof UNLOCKABLE_INGREDIENTS;
export type FreeIngredient = keyof typeof FREE_INGREDIENTS;
export type Ingredient = UnlockableIngredient | FreeIngredient;

/**
 * @returns An array consisting of the Ingredients you've unlocked so far this ascension
 */
export function ingredientsUnlocked(): Ingredient[] {
  return get("latteUnlocks").split(",") as Ingredient[];
}

/**
 * Fill the latte with ingredients of your choosing
 *
 * @param ingredients Ingredients to fill the latte with
 * @returns Whether we succeeded in this endeavor
 */
export function fill(
  ...ingredients: [Ingredient, Ingredient, Ingredient]
): boolean {
  if (refillsRemaining() <= 0) return false;
  if (new Set(ingredients).size < 3) return false;
  if (ingredients.some((i) => !ingredientsUnlocked().includes(i))) return false;
  return cliExecute(`latte refill ${ingredients.join(" ")}`);
}

function isFree(ingredient: Ingredient): ingredient is FreeIngredient {
  return ingredient in FREE_INGREDIENTS;
}

/**
 * @param ingredient A latte ingredient
 * @returns An object containing the modifiers associated with that latte ingredient
 */
export function modifierOf(ingredient: Ingredient): Modifiers {
  if (isFree(ingredient)) {
    return FREE_INGREDIENTS[ingredient].modifier;
  } else {
    return UNLOCKABLE_INGREDIENTS[ingredient].modifier;
  }
}

/**
 * @param ingredient A latte ingredient
 * @returns The location that can be used to unlock said ingredient
 */
export function locationOf(ingredient: UnlockableIngredient): Location {
  return UNLOCKABLE_INGREDIENTS[ingredient].location;
}
