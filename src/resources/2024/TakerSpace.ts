import { create, getWorkshed, Item, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { Tuple } from "../../utils.js";
import { $item } from "../../template-string.js";
import { get } from "../../property.js";

const item = $item`TakerSpace letter of Marque`;

/**
 * Determines whether the TakerSpace letter of Marque is your current workshed
 *
 * @returns Whether the TakerSpace letter of Marque is your current workshed
 */
export function installed(): boolean {
  return getWorkshed() === item;
}

/**
 * Determines whether you `have` the TakerSpace letter of Marque (or if it is installed)
 *
 * @returns Whether you `have` the TakerSpace letter of Marque or it's installed
 */
export function have(): boolean {
  return installed() || have_(item);
}

const RESOURCES = ["Spice", "Rum", "Anchor", "Mast", "Silk", "Gold"] as const;
export type Resource = (typeof RESOURCES)[number];

export type Recipe = Tuple<number, (typeof RESOURCES)["length"]>;
const RECIPES = new Map<Item, Recipe>([
  [$item`deft pirate hook`, [0, 0, 1, 1, 0, 1]],
  [$item`iron tricorn hat`, [0, 0, 2, 1, 0, 0]],
  [$item`jolly roger flag`, [0, 1, 0, 1, 1, 0]],
  [$item`sleeping profane parrot`, [15, 3, 0, 0, 2, 1]],
  [$item`pirrrate's currrse`, [2, 2, 0, 0, 0, 0]],
  [$item`tankard of spiced rum`, [1, 2, 0, 0, 0, 0]],
  [$item`packaged luxury garment`, [0, 0, 0, 0, 3, 2]],
  [$item`harpoon`, [0, 0, 0, 2, 0, 0]],
  [$item`chili powder cutlass`, [5, 0, 1, 0, 0, 0]],
  [$item`cursed Aztec tamale`, [2, 0, 0, 0, 0, 0]],
  [$item`jolly roger tattoo kit`, [0, 6, 1, 1, 0, 6]],
  [$item`golden pet rock`, [0, 0, 0, 0, 0, 7]],
  [$item`groggles`, [0, 6, 0, 0, 0, 0]],
  [$item`pirate dinghy`, [0, 0, 1, 1, 1, 0]],
  [$item`anchor bomb`, [0, 1, 3, 1, 0, 1]],
  [$item`silky pirate drawers`, [0, 0, 0, 0, 2, 0]],
  [$item`spices`, [1, 0, 0, 0, 0, 0]],
]);

/**
 * @returns A copy of our map of all recipes
 */
export function allRecipes(): Map<Item, Recipe> {
  return new Map(
    RECIPES.entries().map(([item, recipe]) => [item, [...recipe]]),
  );
}

const defaultAmount = (resource: Resource) =>
  ["Silk", "Gold"].includes(resource) ? 1 : 3;

/**
 * Collect daily resources from takerspace if you haven't yet today and are able to
 * @returns Whether, at the end of all things, your daily resources have been collected
 */
export function collect(): boolean {
  if (!installed() || get("_takerSpaceSuppliesDelivered")) return false;
  visitUrl("campground.php?action=workshed", false);
  return get("_takerSpaceSuppliesDelivered");
}

/**
 * Determine how much of a resource you will have when the TakerSpace is installed
 * @param resource The resource in question
 * @returns The amount of that resource that you will have when the TakerSpace is installed
 */
export function amount(resource: Resource): number {
  collect();
  return (
    get(`takerSpace${resource}`) +
    (!installed() && !get("_workshedItemUsed") ? defaultAmount(resource) : 0)
  );
}

/**
 * Determine the Recipe for a given item
 * @param item The item in question
 * @returns The Recipe for that item, as a length-6 array in the order Spice, Rum, Anchor, Mast, Silk, Gold
 */
export function recipeFor(item: Item): Recipe | null {
  const result = RECIPES.get(item);
  return result ? [...result] : null;
}

/**
 * @returns Your current available resources, as a length-6 array in the order Spice, Rum, Anchor, Mast, Silk, Gold
 */
export function currentResources(): Recipe {
  collect();
  return RESOURCES.map(amount) as Recipe;
}

/**
 * Determine if you have enough resources to make a particular item
 * @param item The item in question
 * @param amount The number of the item to make; defaults to one
 * @returns Whether we have enough resources available to make the amount of the item
 */
export function haveEnoughFor(item: Item, amount = 1): boolean {
  const recipe = recipeFor(item);
  if (!recipe) return false;
  return currentResources().every(
    (resource, index) => resource >= amount * recipe[index],
  );
}

/**
 * Determines if you're currently able to make a particular item
 * @param item The item in question
 * @param amount The number of the item to make; defaults to one
 * @returns Whether we currently can make the item--that is, whether the TakerSpace is in your workshed and you have enough resources
 */
export function canMake(item: Item, amount = 1): boolean {
  return installed() && haveEnoughFor(item, amount);
}

/**
 * Attempts to make a particular item
 * @param item The item in question
 * @param amount The number of the item to make; defaults to one
 * @returns Whether we succeeded in our endeavor
 */
export function make(item: Item, amount = 1): boolean {
  return canMake(item, amount) && create(item, amount);
}
