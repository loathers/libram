import {
  Effect,
  Item,
  Stat,
  cupOf13sTier,
  entityDecode,
  heartstoneStringLength,
  myHash,
  runChoice,
  visitUrl,
} from "kolmafia";
import { have as have_ } from "../../lib";
import { $effects, $item, $stats } from "../../template-string";
import { arrayToCountedMap, clamp, sum, Tuple } from "../../utils";
import { get } from "../../property";

/**
 * @returns Whether you `have` the Cup of 13s.
 */
export function have(): boolean {
  return have_($item`Cup of 13s`);
}

const RESULTS = Object.freeze([
  ...$stats`Muscle, Mysticality, Moxie`,
  ...$effects`Runneth Over, Runneth On Empty, Runneth Wild, Runneth With The Pack, Runneth a Tight Ship, Runneth a Fever, Runneth Cold, Runneth On Fumes, Runneth For Thy Life, Runneth Into Thine Ex`,
]) as Readonly<Tuple<Stat | Effect, 13>>;

export type DrinkResult = Map<Stat | Effect, number>;

export type Drink = {
  adventures: number;
  results: DrinkResult;
};

/**
 *
 * @param item The item you're passing into the cup
 * @returns Tuple consisting of the Stat or Effect, and the total exp or turncount of the effect
 */
export function resultFrom(item: Item): [Stat | Effect, number] {
  const result = RESULTS[heartstoneStringLength(entityDecode(item.name)) % 13];
  const adventures = adventuresFrom(item);
  const base = cupOf13sTier(item) - adventures;
  return [result, (result instanceof Stat ? 50 : 20) * base];
}

function compressResults(drinkResults: [Stat | Effect, number][]): DrinkResult {
  const results: DrinkResult = new Map();
  for (const [result, qty] of drinkResults) {
    if (qty) results.set(result, (results.get(result) ?? 0) + qty);
  }
  return results;
}

function adventuresFrom(item: Item): number {
  return Math.min(cupOf13sTier(item), 1 + (item.id % 5));
}

/**
 * Calculate the adventures and effects/exp expected from a beverage.
 * @param ingredients Spread 3-item tuple, the ingredients of your drink.
 * @returns An object containing the adventures and drink results.
 */
export function expectedDrink(...ingredients: Tuple<Item, 3>): Drink {
  const adventures = clamp(
    sum(ingredients, adventuresFrom),
    0,
    get("_cupOf13sJewels"),
  );
  return { adventures, results: compressResults(ingredients.map(resultFrom)) };
}

/**
 * Quaff from your cup!
 * @param ingredients Spread 3-item tuple, the ingredients of your drink
 * @returns Whether we believe we successfully drank.
 */
export function drink(...ingredients: Tuple<Item, 3>): boolean {
  if (!have()) return false;
  const itemsNeeded = arrayToCountedMap(ingredients);
  if (!itemsNeeded.entries().every(([item, quantity]) => have_(item, quantity)))
    return false;
  if (
    ingredients.some(
      (ingredient) => !ingredient.tradeable || !ingredient.discardable,
    )
  )
    return false;
  visitUrl(`inventory.php?action=cupof13s&pwd=${myHash()}`, false);
  return runChoice(
    1,
    ingredients
      .map((ingredient, index) => `whichitem${index + 1}=${ingredient.id}`)
      .join("&"),
  ).includes("and drink the resulting");
}
