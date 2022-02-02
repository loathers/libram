import {
  autosellPrice,
  Effect,
  getWorkshed,
  Item,
  npcPrice,
  toInt,
  visitUrl,
} from "kolmafia";
import { have as haveItem } from "../../lib";
import { get as getModifier } from "../../modifier";
import { $item, $monster } from "../../template-string";
import { clamp } from "../../utils";

/**
 * @returns true if the Diabolic pizza cube is installed in workshed.
 */
export function installed(): boolean {
  return getWorkshed() === $item`diabolic pizza cube`;
}

/**
 * @returns true if the Diabolic pizza cube is installed in workshed or in inventory.
 */
export function have(): boolean {
  return installed() || haveItem($item`diabolic pizza cube`);
}

/**
 * @param items One or more items to be checked.
 * @returns true if all items are a valid pizza ingredients.
 */
export function validIngredients(...items: Item[]): boolean {
  return items.every((item) => {
    return (
      item.tradeable && item.discardable && !item.gift && npcPrice(item) === 0
    );
  });
}

/**
 * Simulates a pizza given a set of four ingredients. Ingredient order determines the possible effects.
 * Possible effects depend on the KoLMafia nohookah flag and avatar potion data.
 * @param items The four selected ingredient items to be used
 * @returns Returns an object with properties:
 *   adventures: the number of adventures this pizza would generate, before modifiers (3-15 advs).
 *   duration: the duration of the effect of the pizza (5-100 advs).
 *   effects: an array of possible effects that this pizza can yield.
 * @returns -1 and an empty array if the ingredients are not valid.
 */
export function simulate(
  ...items: [Item, Item, Item, Item]
): { adventures: number; effects: Effect[]; duration: number } {
  const error = { adventures: -1, effects: [], duration: -1 };
  if (!validIngredients(...items)) return error;
  const totalLetters = items.reduce((sum, item) => sum + item.nameLength, 0);
  const adventures = clamp(Math.floor(totalLetters / 10), 3, 15);
  const totalPrice = items.reduce((sum, item) => sum + autosellPrice(item), 0);
  const duration = clamp(Math.floor(Math.sqrt(totalPrice)), 5, 100);
  const wishable = Effect.all().filter(
    (effect) =>
      !effect.attributes.includes("nohookah") &&
      getModifier("Avatar", effect) === $monster`none`
  );
  let possible: Effect[] = wishable;
  for (let i = 0; i < items.length; i++) {
    const itemLetter = items[i].name.toLowerCase().charAt(0);
    const matchingEffects = possible.filter((effect) => {
      const effectLetter = effect.name.toLowerCase().charAt(i);
      return effectLetter === itemLetter;
    });
    if (matchingEffects.length === 0) break;
    possible = matchingEffects;
  }
  return { adventures: adventures, duration: duration, effects: possible };
}

/**
 * Generates a pizza using the four items passed in. Items a, b, c, and d will be consumed by this function.
 * @param items The four selected ingredient items to be used
 * @returns true if pizza generation was a success else false if you cannot make a pizza or pizza generation failed.
 */
export function cook(...items: [Item, Item, Item, Item]): boolean {
  if (!installed()) return false;
  if (haveItem($item`diabolic pizza`)) return false;
  if (!validIngredients(...items)) return false;
  const need = new Map<Item, number>();
  for (const item of items) need.set(item, 1 + (need.get(item) ?? 0));
  for (const [item, count] of need) if (!haveItem(item, count)) return false;
  const params = items.map((item) => toInt(item)).join(",");
  visitUrl(`campground.php?action=makepizza&pizza=${params}`);
  if (haveItem($item`diabolic pizza`)) return true;
  return false;
}
