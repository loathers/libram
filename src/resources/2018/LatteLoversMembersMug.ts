import { cliExecute, getCounter, Monster } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item, $location } from "../../template-string";

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
  return getCounter("Latte Monster") !== -1 ? get("_latteMonster") : null;
}

/**
 * @returns The number of latte refills remaining for the day
 */
export function refillsRemaining(): number {
  return 3 - get("_latteRefillsUsed");
}

const UNLOCKABLE_INGREDIENTS = [
  {
    ingredient: "ancient spice",
    modifier: { "Spooky Damage": 50 },
    location: $location`The Mouldering Mansion`,
  },
  {
    ingredient: "asp venom",
    modifier: { "Weapon Damage": 25 },
    location: $location`The Middle Chamber`,
  },
  {
    ingredient: "basil",
    modifier: { "HP Regen Min": 5, "HP Regen Max": 5 },
    location: $location`The Overgrown Lot`,
  },
  {
    ingredient: "belgian vanilla",
    modifier: {
      "Moxie Percent": 20,
      "Mysticality Percent": 20,
      "Muscle Percent": 20,
    },
    location: $location`Whitey's Grove`,
  },
  {
    ingredient: "blue chalks",
    modifier: { "Cold Damage": 25 },
    location: $location`The Haunted Billiards Room`,
  },
  {
    ingredient: "bug-thistle",
    modifier: { Mysticality: 20 },
    location: $location`The Bugbear Pen`,
  },
  {
    ingredient: "butternut",
    modifier: { "Spell Damage": 10 },
    location: $location`Madness Bakery`,
  },
  {
    ingredient: "cajun",
    modifier: { "Meat Drop": 40 },
    location: $location`The Black Forest`,
  },
  {
    ingredient: "carrot",
    modifier: { "Item Drop": 20 },
    location: $location`The Dire Warren`,
  },
  {
    ingredient: "carrrdamom",
    modifier: { "MP Regen Min": 4, "MP Regen Max": 6 },
    location: $location`Barrrney's Barrr`,
  },
  {
    ingredient: "chili seeds",
    modifier: { "Hot Resistance": 3 },
    location: $location`The Haunted Kitchen`,
  },
  {
    ingredient: "clove",
    modifier: { "Stench Resistance": 3 },
    location: $location`The Sleazy Back Alley`,
  },
  {
    ingredient: "coal",
    modifier: { "Hot Damage": 25 },
    location: $location`The Haunted Boiler Room`,
  },
  {
    ingredient: "cocoa powder",
    modifier: { "Cold Resistance": 3 },
    location: $location`The Icy Peak`,
  },
  {
    ingredient: "diet soda",
    modifier: { Initiative: 50 },
    location: $location`Battlefield (No Uniform)`,
  },
  {
    ingredient: "dwarf cream",
    modifier: { Muscle: 30 },
    location: $location`Itznotyerzitz Mine`,
  },
  {
    ingredient: "dyspepsi",
    modifier: { Initiative: 25 },
    location: $location`Battlefield (Dyspepsi Uniform)`,
  },
  {
    ingredient: "filth milk",
    modifier: { "Damage Reduction": 20 },
    location: $location`The Feeding Chamber`,
  },
  {
    ingredient: "fresh grass",
    modifier: { Experience: 3 },
    location: $location`The Hidden Park`,
  },
  {
    ingredient: "fungus",
    modifier: { "Maximum MP": 30 },
    location: $location`The Fungal Nethers`,
  },
  {
    ingredient: "grave mold",
    modifier: { "Spooky Damage": 20 },
    location: $location`The Unquiet Garves`,
  },
  {
    ingredient: "greek spice",
    modifier: { "Sleaze Damage": 25 },
    location: $location`Wartime Frat House`,
  },
  {
    ingredient: "grobold rum",
    modifier: { "Sleaze Damage": 25 },
    location: $location`The Old Rubee Mine`,
  },
  {
    ingredient: "guarna",
    modifier: { Adventures: 4 },
    location: $location`The Bat Hole Entrance`,
  },
  {
    ingredient: "gunpowder",
    modifier: { "Weapon Damage": 50 },
    location: $location`1st Floor, Shiawase-Mitsuhama Building`,
  },
  {
    ingredient: "health potion",
    modifier: { "HP Regen Min": 10, "HP Regen Max": 20 },
    location: $location`The Daily Dungeon`,
  },
  {
    ingredient: "hellion",
    modifier: { "PvP Fights": 6 },
    location: $location`The Dark Neck of the Woods`,
  },
  {
    ingredient: "hobo spices",
    modifier: { "Damage Absorption": 50 },
    location: $location`Hobopolis Town Square`,
  },
  {
    ingredient: "hot sausage",
    modifier: { "Muscle Percent": 50 },
    location: $location`Cobb's Knob Barracks`,
  },
  {
    ingredient: "hot wing",
    modifier: { "Combat Rate": 10 },
    location: $location`The Dark Heart of the Woods`,
  },
  {
    ingredient: "ink",
    modifier: { "Combat Rate": -10 },
    location: $location`The Haunted Library`,
  },
  {
    ingredient: "kombucha",
    modifier: { "Stench Damage": 25 },
    location: $location`Wartime Hippy Camp`,
  },
  {
    ingredient: "lihc saliva",
    modifier: { "Spooky Damage": 25 },
    location: $location`The Defiled Niche`,
  },
  {
    ingredient: "lizard milk",
    modifier: { "MP Regen Min": 5, "MP Regen Max": 15 },
    location: $location`The Arid, Extra-Dry Desert`,
  },
  {
    ingredient: "macaroni",
    modifier: { "Maximum HP": 20 },
    location: $location`The Haunted Pantry`,
  },
  {
    ingredient: "mega sausage",
    modifier: { "Moxie Percent": 50 },
    location: $location`Cobb's Knob Laboratory`,
  },
  {
    ingredient: "motor oil",
    modifier: { "Sleaze Damage": 20 },
    location: $location`The Old Landfill`,
  },
  {
    ingredient: "msg",
    modifier: { "Critical Hit Percent": 15 },
    location: $location`The Briniest Deepests`,
  },
  {
    ingredient: "norwhal milk",
    modifier: { "Maximum HP Percent": 200 },
    location: $location`The Ice Hole`,
  },
  {
    ingredient: "oil paint",
    modifier: { "Prismatic Damage": 5 },
    location: $location`The Haunted Gallery`,
  },
  {
    ingredient: "paradise milk",
    modifier: { Moxie: 20, Muscle: 20, Mysticality: 20 },
    location: $location`The Stately Pleasure Dome`,
  },
  {
    ingredient: "rawhide",
    modifier: { "Familiar Weight": 5 },
    location: $location`The Spooky Forest`,
  },
  {
    ingredient: "rock salt",
    modifier: { "Critical Hit Percent": 10 },
    location: $location`The Brinier Deepers`,
  },
  {
    ingredient: "salt",
    modifier: { "Critical Hit Percent": 5 },
    location: $location`The Briny Deeps`,
  },
  {
    ingredient: "sandalwood",
    modifier: { Moxie: 5, Muscle: 5, Mysticality: 5 },
    location: $location`Noob Cave`,
  },
  {
    ingredient: "sausage",
    modifier: { "Mysticality Percent": 50 },
    location: $location`Cobb's Knob Kitchens`,
  },
  {
    ingredient: "space pumpkin",
    modifier: { Moxie: 10, Muscle: 10, Mysticality: 10 },
    location: $location`The Hole in the Sky`,
  },
  {
    ingredient: "spaghetti squash",
    modifier: { "Spell Damage": 10 },
    location: $location`The Copperhead Club`,
  },
  {
    ingredient: "teeth",
    modifier: { "Spooky Damage": 25, "Weapon Damage": 25 },
    location: $location`The VERY Unquiet Garves`,
  },
  {
    ingredient: "vitamin",
    modifier: { "Familiar Experience": 3 },
    location: $location`The Dark Elbow of the Woods`,
  },
  {
    ingredient: "white flour",
    modifier: { "Sleaze Resistance": 3 },
    location: $location`The Road to the White Citadel`,
  },
  {
    ingredient: "squamous salt",
    modifier: { "Spooky Resistance": 3 },
    location: $location`The Caliginous Abyss`,
  },
] as const;

const FREE_INGREDIENTS = [
  {
    ingredient: "pumpkin spice",
    modifier: {
      "Mysticality Experience": 1,
      "Spell Damage": 5,
      "Mysticality Percent": 5,
    },
  },
  {
    ingredient: "cinnamon",
    modifier: {
      "Moxie Experience": 1,
      "Pickpocket Rate": 5,
      "Moxie Percent": 5,
    },
  },
  {
    ingredient: "vanilla",
    modifier: {
      "Muscle Experience": 1,
      "Weapon Damage Percent": 5,
      "Muscle Percent": 5,
    },
  },
] as const;

export type UnlockableIngredient =
  typeof UNLOCKABLE_INGREDIENTS[number]["ingredient"];
export type FreeIngredient = typeof FREE_INGREDIENTS[number]["ingredient"];
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
