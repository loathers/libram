import { mallPrice, runChoice, use, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get, withChoice } from "../../property";
import { $item, $items } from "../../template-string";
import { argmax, invertMap } from "../../utils";

export const item = $item`Guzzlr tablet`;
export function have(): boolean {
  return haveItem(item);
}

function useTabletWithChoice(option: number) {
  withChoice(1412, option, () => use(1, item));
}

export function isQuestActive(): boolean {
  return get("questGuzzlr") !== "unstarted";
}

/**
 * Platinum deliveries completed overall
 */
export function getPlatinum(): number {
  return get("guzzlrPlatinumDeliveries");
}

/**
 * Platinum deliveries completed today
 */
export function getPlatinumToday(): number {
  return get("_guzzlrPlatinumDeliveries");
}

/**
 * Can do a platinum delivery (haven't done one today)
 */
export function canPlatinum(): boolean {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}

/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */
export function haveFullPlatinumBonus(): boolean {
  return getPlatinum() >= 30;
}

/**
 * Accept platinum delivery
 */
export function acceptPlatinum(): boolean {
  if (!canPlatinum()) return false;
  useTabletWithChoice(4);
  return true;
}

/**
 * Gold deliveries completed overall
 */
export function getGold(): number {
  return get("guzzlrGoldDeliveries");
}

/**
 * Gold deliveries completed today
 */
export function getGoldToday(): number {
  return get("_guzzlrGoldDeliveries");
}

/**
 * Can do a gold delivery (have done fewer than 3 today)
 */
export function canGold(): boolean {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}

/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */
export function haveFullGoldBonus(): boolean {
  return getGold() >= 150;
}

/**
 * Accept gold delivery
 */
export function acceptGold(): boolean {
  if (!canGold()) return false;
  useTabletWithChoice(3);
  return true;
}

/**
 * Bronze deliveries completed overall
 */
export function getBronze(): number {
  return get("guzzlrBronzeDeliveries");
}

/**
 * Accept bronze delivery
 */
export function acceptBronze(): boolean {
  if (isQuestActive()) return false;
  useTabletWithChoice(2);
  return true;
}

/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */
export function haveFullBronzeBonus(): boolean {
  return getBronze() >= 196;
}

/**
 * Can abandon the current Guzzlr quest
 */
export function canAbandon(): boolean {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}

/**
 * Abandon Guzzlr quest
 */
export function abandon(): boolean {
  if (!canAbandon()) return false;
  visitUrl("inventory.php?tap=guzzlr", false);
  runChoice(1);
  runChoice(5);
  return true;
}

/**
 * Get current Guzzlr quest location
 */
export function getLocation(): Location | null {
  return get("guzzlrQuestLocation");
}

/**
 * Get current Guzzlr quest tier
 */
export function getTier(): "platinum" | "gold" | "bronze" | null {
  const tier = get("guzzlrQuestTier") as "platinum" | "gold" | "bronze" | "";
  return tier === "" ? null : tier;
}

/**
 * Get current Guzzlr quest booze
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
 * Returns true if the user has a platinum cocktail in their inventory
 */
export function havePlatinumBooze(): boolean {
  return Cocktails.some((cock) => haveItem(cock));
}

/**
 * Returns true if the user has the cocktail that they need for their current quest
 *
 * If they have no quest, returns false
 */
export function haveBooze(): boolean {
  const booze = getBooze();
  switch (booze) {
    case null:
      return false;
    case $item`Guzzlr cocktail set`:
      return havePlatinumBooze();
    default:
      return haveItem(booze);
  }
}

const ingredientToPlatinumCocktail = new Map<Item, Item>([
  [$item`miniature boiler`, $item`steamboat`],
  [$item`cold wad`, $item`ghiaccio colada`],
  [$item`robin's egg`, $item`nog-on-the-cob`],
  [$item`mangled finger`, $item`sourfinger`],
  [$item`dish of clarified butter`, $item`buttery boy`],
]);

const platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);

export function getCheapestPlatinumCocktail(): Item {
  return argmax(
    Array.from(ingredientToPlatinumCocktail).map(
      ([ingredient, cocktail]) =>
        [cocktail, mallPrice(ingredient)] as [Item, number]
    )
  );
}
