import "core-js/modules/es.object.values";

import {
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
  mallPrice,
  mallPrices,
  retrieveItem,
  toInt,
  visitUrl,
} from "kolmafia";
import { getAverageAdventures, have as haveItem } from "../../lib";
import { $effect, $item, $items } from "../../template-string";

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

// Efficiency in meat per fuel.
function calculateFuelUnitCost(
  it: Item,
  targetUnits: number,
  priceAge = PriceAge.RECENT
): number {
  const units = getAverageAdventures(it);
  return price(it, priceAge) / Math.min(targetUnits, units);
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

function getBestFuel(targetUnits: number): Item {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  const allFuel = $items``.filter(isFuelItem);
  if (allFuel.filter((item) => historicalPrice(item) === 0).length > 100) {
    mallPrices("food");
    mallPrices("booze");
  }

  const keyHistorical = (item: Item) =>
    calculateFuelUnitCost(item, targetUnits, PriceAge.HISTORICAL);
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
  const key2 = (item: Item) =>
    calculateFuelUnitCost(item, targetUnits, PriceAge.RECENT);
  potentialFuel.sort((x: Item, y: Item) => key1(x) - key1(y));
  potentialFuel.sort((x: Item, y: Item) => key2(x) - key2(y));

  // 3. Find result using precise price for those top candidates.
  const candidates = potentialFuel.slice(0, 10);
  const key3 = (item: Item) =>
    calculateFuelUnitCost(item, targetUnits, PriceAge.TODAY);
  candidates.sort((x: Item, y: Item) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], targetUnits, PriceAge.TODAY) > 100) {
    throw new Error(
      "Could not identify any fuel with efficiency better than 100 meat per fuel. " +
        "This means something went wrong."
    );
  }

  return candidates[0];
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
    const remaining = targetUnits - getFuel();

    // if in Hardcore/ronin, skip the price calculation and just use soda bread
    let fuel;
    if (canInteract()) fuel = getBestFuel(remaining);
    else fuel = $item`loaf of soda bread`;

    const count = Math.ceil(targetUnits / getAverageAdventures(fuel));

    retrieveItem(count, fuel);

    if (!insertFuel(fuel, count)) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }
  return getFuel() >= targetUnits;
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
 * Attempt to drive with a particular style for a particular number of turns
 * @param style The driving style to use
 * @param turns The number of turns to attempt to get
 * @returns Whether we have at least as many turns as requested of said driving style.
 */
export function drive(style: Effect, turns = 1): boolean {
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if (haveEffect(style) >= turns) return true;

  const fuelNeeded = 37 * Math.ceil((turns - haveEffect(style)) / 30);
  fillTo(fuelNeeded);
  while (getFuel() >= 37 && haveEffect(style) < turns) {
    cliExecute(`asdonmartin drive ${style.name.replace("Driving ", "")}`);
  }
  return haveEffect(style) >= turns;
}
