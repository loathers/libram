import {
  Item,
  itemAmount,
  Location,
  mallPrice,
  runChoice,
  use,
  visitUrl,
} from "kolmafia";
import { have as haveItem } from "../../lib";
import { get, withChoice } from "../../property";
import { $item, $items } from "../../template-string";
import { invertMap, maxBy } from "../../utils";

const item = $item`Guzzlr tablet`;
/**
 * Determines whether you `have` Guzzlr
 *
 * @returns Whether you `have` Guzzlr
 */
export function have(): boolean {
  return haveItem(item);
}

/**
 * Internal function used to navigate the Guzzlr interface
 *
 * @param option Choice option to select
 */
function useTabletWithChoice(option: number) {
  withChoice(1412, option, () => use(1, item));
}

/**
 * Determines whether you currently have an active Guzzlr quest
 *
 * @returns Whether you currently have an active Guzzlr quest
 */
export function isQuestActive(): boolean {
  return get("questGuzzlr") !== "unstarted";
}

/**
 * Determines total number of Platinum deliveries completed
 *
 * @returns Platinum deliveries completed overall
 */
export function getPlatinum(): number {
  return get("guzzlrPlatinumDeliveries");
}

/**
 * Determines the number of Platinum deliveries completed today
 *
 * @returns Platinum deliveries completed today
 */
export function getPlatinumToday(): number {
  return get("_guzzlrPlatinumDeliveries");
}

/**
 * Determines whether you are currently eligible to do a Platinum delivery
 *
 * @returns Whether you are currently eligible to do a Platinum delivery
 */
export function canPlatinum(): boolean {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}

/**
 * Determines whether you have fully unlocked the Platinum delivery bonuses (done >= 30)
 *
 * @returns Whether you have fully unlocked the Platinum delivery enchantment bonuses
 */
export function haveFullPlatinumBonus(): boolean {
  return getPlatinum() >= 30;
}

/**
 * Accepts a Platinum delivery
 *
 * @returns Whether we succeeded in this endeavor
 */
export function acceptPlatinum(): boolean {
  if (!canPlatinum()) return false;
  useTabletWithChoice(4);
  return true;
}

/**
 * Determines total number of Gold deliveries completed
 *
 * @returns Gold deliveries completed overall
 */
export function getGold(): number {
  return get("guzzlrGoldDeliveries");
}

/**
 * Determines the number of Gold deliveries completed today
 *
 * @returns Gold deliveries completed today
 */
export function getGoldToday(): number {
  return get("_guzzlrGoldDeliveries");
}

/**
 * Determines whether you are currently eligible to do a Gold delivery
 *
 * @returns Whether you are currently eligible to do a Gold delivery
 */
export function canGold(): boolean {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}

/**
 * Determines whether you have fully unlocked the Gold delivery bonuses (done >= 150)
 *
 * @returns Whether you have fully unlocked the Gold delivery enchantment bonuses
 */
export function haveFullGoldBonus(): boolean {
  return getGold() >= 150;
}

/**
 * Accepts a Gold delivery
 *
 * @returns Whether we succeeded in this endeavor
 */
export function acceptGold(): boolean {
  if (!canGold()) return false;
  useTabletWithChoice(3);
  return true;
}

/**
 * Determines total number of Bronze deliveries completed
 *
 * @returns Bronze deliveries completed overall
 */
export function getBronze(): number {
  return get("guzzlrBronzeDeliveries");
}

/**
 * Determines whether you have fully unlocked the Bronze delivery bonuses (done >= 196)
 *
 * @returns Whether you have fully unlocked the Bronze delivery enchantment bonuses
 */
export function haveFullBronzeBonus(): boolean {
  return getBronze() >= 196;
}

/**
 * Accepts a Bronze delivery
 *
 * @returns Whether we succeeded in this endeavor
 */
export function acceptBronze(): boolean {
  if (isQuestActive()) return false;
  useTabletWithChoice(2);
  return true;
}

/**
 * Determines whether we can abandon the current Guzzlr quest
 *
 * @returns Whether we are able to abandon our current Guzzlr quest
 */
export function canAbandon(): boolean {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}

/**
 * Abandons Guzzlr quest
 *
 * @returns `false` if we were unable to abandon a quest; `true` otherwise
 */
export function abandon(): boolean {
  if (!canAbandon()) return false;
  visitUrl("inventory.php?tap=guzzlr", false);
  runChoice(1);
  runChoice(5);
  return true;
}

/**
 * Determines the target location for your current Guzzlr quest
 *
 * @returns The current target location for your Guzzlr quest, if it exists
 */
export function getLocation(): Location | null {
  return get("guzzlrQuestLocation");
}

/**
 * Determines the tier of your current Guzzlr quest
 *
 * @returns The tier of your current Guzzlr quest; `null` if there is no active quest
 */
export function getTier(): "platinum" | "gold" | "bronze" | null {
  const tier = get("guzzlrQuestTier") as "platinum" | "gold" | "bronze" | "";
  return tier === "" ? null : tier;
}

/**
 * Determines the current booze item you need to deliver for your current Guzzlr quest
 *
 * @returns The booze item associated with your Guzzlr quest if it exists; `null` otherwise
 */
export function getBooze(): Item | null {
  const booze = get("guzzlrQuestBooze");
  if (booze === "") return null;
  return Item.get(booze);
}

/**
 * List of the platinum cocktails
 */
export const Cocktails = $items`Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger`;

/**
 * Determines whether you currently have a Platinum cocktail available
 *
 * @returns `true` if you have at least one Platinum cocktail in your inventory; `false` otherwise
 */
export function havePlatinumBooze(): boolean {
  return Cocktails.some((cock) => itemAmount(cock) > 0);
}

/**
 * Determines if you currently have in your inventory the booze necessary to progress your Guzzlr quest
 *
 * @returns `true` if you have the booze necessary to progress your Guzzlr quest
 */
export function haveBooze(): boolean {
  const booze = getBooze();
  switch (booze) {
    case null:
      return false;
    case $item`Guzzlr cocktail set`:
      return havePlatinumBooze();
    default:
      return itemAmount(booze) > 0;
  }
}

export const ingredientToPlatinumCocktail = new Map<Item, Item>([
  [$item`miniature boiler`, $item`Steamboat`],
  [$item`cold wad`, $item`Ghiaccio Colada`],
  [$item`robin's egg`, $item`Nog-on-the-Cob`],
  [$item`mangled finger`, $item`Sourfinger`],
  [$item`Dish of Clarified Butter`, $item`Buttery Boy`],
]);

export const platinumCocktailToIngredient = invertMap(
  ingredientToPlatinumCocktail,
);

/**
 * Determines the cheapest Platinum cocktail to obtain or produce
 *
 * @param freeCraft Defaults to `true`; if set to `false`, will count the price of any turns spent cocktailcrafting
 * @returns The expected price of the cheapest Platinum cocktail to obtain or produce
 */
export function getCheapestPlatinumCocktail(freeCraft = true): Item {
  if (freeCraft) {
    return maxBy(
      Array.from(ingredientToPlatinumCocktail),
      (ingredientAndCocktail: [Item, Item]) =>
        Math.min(...ingredientAndCocktail.map((item) => mallPrice(item))),
      true,
    )[1];
  } else {
    return maxBy(Array.from(ingredientToPlatinumCocktail), ([, cocktail]) =>
      mallPrice(cocktail),
    )[1];
  }
}

/**
 * Calculates the number of turns remaining for your Guzzlr quest
 *
 * @param useShoes Whether or not the calculation should assume you are using Guzzlr shoes
 * @returns The expected number of turns needed to finish your current delivery
 */
export function turnsLeftOnQuest(useShoes = false) {
  const progressPerTurn = useShoes
    ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5)
    : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}

/**
 * Calculates the expected Guzzlrbuck reward for completing your current Guzzlr quest
 *
 * @param usePants Whether or not we should account for Guzzlr pants in our calculation
 * @returns The expected Guzzlrbuck reward of our current Guzzlr quest
 */
export function expectedReward(usePants = false) {
  switch (getTier()) {
    case "platinum":
      // 20-25
      return 22.5 + (usePants ? 5 : 0);
    case "gold":
      // 5-7
      return 6 + (usePants ? 3 : 0);
    case "bronze":
      // 2-4
      return 3 + (usePants ? 3 : 0);
    default:
      return 0;
  }
}
