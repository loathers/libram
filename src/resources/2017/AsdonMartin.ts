import "core-js/modules/es.object.values";

import {
  autosellPrice,
  buy,
  canInteract,
  cliExecute,
  Effect,
  getFuel,
  getWorkshed,
  haveEffect,
  historicalAge,
  historicalPrice,
  isNpcItem,
  Item,
  itemAmount,
  mallPrice,
  mallPrices,
  toInt,
  visitUrl,
} from "kolmafia";
import { getAverageAdventures, have as haveItem } from "../../lib";
import { $effect, $item, $items } from "../../template-string";
import { clamp } from "../../utils";

enum PriceAge {
  HISTORICAL, // If Mafia has a historical price stored, use it.
  RECENT, // Use historical price if less than a week old.
  TODAY, // Only use a price from this session.
}

/**
 * Returns whether or not we have the Asdon installed in the workshed at present.
 */
export function installed(): boolean {
  return getWorkshed() === $item`Asdon Martin keyfob`;
}

/**
 * Returns true if we have the Asdon or if it's installed.
 */
export function have(): boolean {
  return installed() || haveItem($item`Asdon Martin keyfob`);
}

const fuelSkiplist = $items`cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"`;

function priceTooOld(item: Item) {
  return historicalPrice(item) === 0 || historicalAge(item) >= 7;
}

// Return mall max if historicalPrice returns -1.
function historicalPriceOrMax(item: Item): number {
  const historical = historicalPrice(item);
  return historical < 0 ? 999999999 : historical;
}

// Return mall max if mallPrice returns -1.
function mallPriceOrMax(item: Item): number {
  const mall = mallPrice(item);
  return mall < 0 ? 999999999 : mall;
}

function price(item: Item, priceAge: PriceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL: {
      const historical = historicalPriceOrMax(item);
      return historical === 0 ? mallPriceOrMax(item) : historical;
    }
    case PriceAge.RECENT:
      return priceTooOld(item)
        ? mallPriceOrMax(item)
        : historicalPriceOrMax(item);
    case PriceAge.TODAY:
      return mallPriceOrMax(item);
  }
}

function inventoryItems(): Item[] {
  return Item.all()
    .filter(isFuelItem)
    .filter(
      (item) =>
        haveItem(item) &&
        [100, autosellPrice(item)].includes(price(item, PriceAge.RECENT))
    );
}

// Efficiency in meat per fuel.
function calculateFuelUnitCost(it: Item, priceAge = PriceAge.RECENT): number {
  const units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}

function isFuelItem(it: Item) {
  return (
    !isNpcItem(it) &&
    it.fullness + it.inebriety > 0 &&
    getAverageAdventures(it) > 0 &&
    it.tradeable &&
    it.discardable &&
    !fuelSkiplist.includes(it)
  );
}

function getBestFuels(): Item[] {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  const allFuel = Item.all().filter(isFuelItem);
  if (allFuel.filter((item) => historicalPrice(item) === 0).length > 100) {
    mallPrices("food");
    mallPrices("booze");
  }

  const keyHistorical = (item: Item) =>
    calculateFuelUnitCost(item, PriceAge.HISTORICAL);
  allFuel.sort((x, y) => keyHistorical(x) - keyHistorical(y));
  const bestUnitCost = keyHistorical(allFuel[0]);
  const firstBadIndex = allFuel.findIndex(
    (item) => keyHistorical(item) > 5 * bestUnitCost
  );
  const potentialFuel =
    firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel;

  // 2. Filter to top 10 candidates using prices at most a week old.
  if (potentialFuel.filter((item) => priceTooOld(item)).length > 100) {
    mallPrices("food");
    mallPrices("booze");
  }

  const key1 = (item: Item) => -getAverageAdventures(item);
  const key2 = (item: Item) => calculateFuelUnitCost(item, PriceAge.RECENT);
  potentialFuel.sort((x: Item, y: Item) => key1(x) - key1(y));
  potentialFuel.sort((x: Item, y: Item) => key2(x) - key2(y));

  // 3. Find result using precise price for those top candidates.
  const candidates = potentialFuel.slice(0, 10);
  const key3 = (item: Item) => calculateFuelUnitCost(item, PriceAge.TODAY);
  candidates.sort((x: Item, y: Item) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100) {
    throw new Error(
      "Could not identify any fuel with efficiency better than 100 meat per fuel. " +
        "This means something went wrong."
    );
  }

  return candidates;
}

/**
 * Fuel your Asdon Martin with a given quantity of a given item
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */
export function insertFuel(it: Item, quantity = 1): boolean {
  const result = visitUrl(
    `campground.php?action=fuelconvertor&pwd&qty=${quantity}&iid=${toInt(
      it
    )}&go=Convert%21`
  );
  return result.includes("The display updates with a");
}

/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */
export function fillTo(targetUnits: number): boolean {
  if (!installed()) return false;

  while (getFuel() < targetUnits) {
    // if in Hardcore/ronin, skip the price calculation and just use soda bread
    const [bestFuel, secondBest] = canInteract()
      ? getBestFuels()
      : [$item`loaf of soda bread`, undefined];

    const count = Math.ceil(targetUnits / getAverageAdventures(bestFuel));

    let ceiling: number | undefined = undefined;
    if (secondBest) {
      const efficiencyOfSecondBest =
        mallPrice(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(
        efficiencyOfSecondBest * getAverageAdventures(bestFuel)
      );
    }
    ceiling ? buy(count, bestFuel, ceiling) : buy(count, bestFuel);

    if (!insertFuel(bestFuel, Math.min(itemAmount(bestFuel), count))) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }
  return getFuel() >= targetUnits;
}

function fillWithBestInventoryItem(targetUnits: number): boolean {
  const options = inventoryItems().sort(
    (a, b) =>
      getAverageAdventures(b) / autosellPrice(b) -
      getAverageAdventures(a) / autosellPrice(a)
  );
  if (options.length === 0) return false;

  const best = options[0];
  if (autosellPrice(best) / getAverageAdventures(best) > 100) return false;

  const amountToUse = clamp(
    Math.ceil(targetUnits / getAverageAdventures(best)),
    0,
    itemAmount(best)
  );
  return insertFuel(best, amountToUse);
}

/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */
export function fillWithInventoryTo(targetUnits: number): boolean {
  if (!installed()) return false;

  let continueFuelingFromInventory = true;
  while (getFuel() < targetUnits && continueFuelingFromInventory) {
    continueFuelingFromInventory &&= fillWithBestInventoryItem(targetUnits);
  }

  return fillTo(targetUnits);
}

/**
 * Object consisting of the various Asdon driving styles
 */
export const Driving = {
  Obnoxiously: $effect`Driving Obnoxiously`,
  Stealthily: $effect`Driving Stealthily`,
  Wastefully: $effect`Driving Wastefully`,
  Safely: $effect`Driving Safely`,
  Recklessly: $effect`Driving Recklessly`,
  Intimidatingly: $effect`Driving Intimidatingly`,
  Quickly: $effect`Driving Quickly`,
  Observantly: $effect`Driving Observantly`,
  Waterproofly: $effect`Driving Waterproofly`,
};

/**
 * Attempt to drive with a particular style for a particular number of turns.
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */
export function drive(
  style: Effect,
  turns = 1,
  preferInventory = false
): boolean {
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if (haveEffect(style) >= turns) return true;

  const fuelNeeded = 37 * Math.ceil((turns - haveEffect(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  while (getFuel() >= 37 && haveEffect(style) < turns) {
    cliExecute(`asdonmartin drive ${style.name.replace("Driving ", "")}`);
  }
  return haveEffect(style) >= turns;
}
