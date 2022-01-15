import { autosellPrice, getWorkshed, toInt, visitUrl } from "kolmafia";
import { get as getModifier } from "../../modifier";
import { have as haveItem } from "../../lib";
import { $item, $monster } from "../../template-string";
import { clamp } from "../../utils";

/**
 * @returns true if the Diabolic pizza cube is installed in workshed
 */
export function installed(): boolean {
  return getWorkshed() === $item`diabolic pizza cube`;
}

/**
 * @returns true if the Diabolic pizza cube is installed in workshed or in inventory
 */
export function have(): boolean {
  return installed() || haveItem($item`diabolic pizza cube`);
}

/**
 * @param item The item to be checked for validity
 * @returns true if an item is a valid pizza ingredient
 */
export function validIngredient(item: Item): boolean {
  return item.tradeable && item.discardable && !item.gift;
}

/**
 * @param items A list of items to be filtered
 * @returns A list of possible ingredients from the provided list of items
 */
export function validIngredients(items: Item[]): Item[] {
  return items.filter((item) => validIngredient(item));
}

/**
 * Simulates a pizza given a set of four ingredients. Ingredient order determines the possible effects.
 * Possible effects depend on the KoLMafia nohookah flag and avatar potion data.
 * @param a First pizza ingredient
 * @param b Second pizza ingredient
 * @param c Third pizza ingredient
 * @param d Fourth pizza ingredient
 * @returns Returns an object with properties:
 *   adventures: the number of adventures this pizza would generate, before modifiers (3-15 advs)
 *   duration: the duration of the effect of the pizza (5-100 advs)
 *   effects: an array of possible effects that this pizza can yield
 */
export function simulate(
  a: Item,
  b: Item,
  c: Item,
  d: Item
): { adventures: number; effects: Effect[]; duration: number } {
  const abcd = [a, b, c, d] as const;
  const error = { adventures: -1, effects: [], duration: -1 };
  if (abcd.some((item) => !validIngredient(item))) return error;
  const totalLetters = abcd.reduce((sum, item) => sum + item.nameLength, 0);
  const advs = clamp(Math.floor(totalLetters / 10), 3, 15);
  const totalPrice = abcd.reduce((sum, item) => sum + autosellPrice(item), 0);
  const dur = clamp(Math.floor(Math.sqrt(totalPrice)), 5, 100);
  const wishable = Effect.all().filter(
    (effect) =>
      !effect.attributes.includes("nohookah") &&
      getModifier("Avatar", effect) === $monster`none`
  );
  let possible: Effect[] = wishable;
  for (const item of abcd) {
    const filtered = possible.filter((effect) =>
      effect.name.startsWith(item.name.charAt(0))
    );
    if (filtered.length === 0) break;
    possible = filtered;
  }
  return { adventures: advs, duration: dur, effects: possible };
}

/**
 * Generates a pizza using the four items passed in. Items a, b, c, and d will be consumed by this function.
 * @param a First pizza ingredient
 * @param b Second pizza ingredient
 * @param c Third pizza ingredient
 * @param d Fourth pizza ingredient
 * @returns true if pizza generation was a success else false if you cannot make a pizza or pizza generation failed.
 */
export function cook(a: Item, b: Item, c: Item, d: Item): boolean {
  if (!installed()) return false;
  if (haveItem($item`diabolic pizza`)) return false;
  const abcd = [a, b, c, d] as const;
  if (abcd.some((item) => !validIngredient(item))) return false;
  const need = new Map<Item, number>();
  for (const item of abcd) need.set(item, 1 + (need.get(item) ?? 0));
  for (const [item, count] of need) if (!haveItem(item, count)) return false;
  visitUrl(
    `campground.php?action=makepizza&pizza=${abcd.map(toInt).join(",")}`
  );
  if (haveItem($item`diabolic pizza`)) return true;
  return false;
}
