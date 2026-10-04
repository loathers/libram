import {
  autosellPrice,
  availableAmount,
  buy,
  canInteract,
  cliExecute,
  Effect,
  getFuel,
  getWorkshed,
  haveEffect,
  isNpcItem,
  Item,
  itemAmount,
  npcPrice,
  retrieveItem,
  use,
  visitUrl,
} from "kolmafia";
import {
  getAcquirePrice,
  getAverageAdventures,
  have as haveItem,
} from "../../lib.js";
import { $effect, $item, $items } from "../../template-string.js";
import { clamp } from "../../utils.js";
import { withProperty } from "../../property.js";

/**
 * @returns Whether the Asdon is our current active workshed
 */
export function installed(): boolean {
  return getWorkshed() === $item`Asdon Martin keyfob (on ring)`;
}

/**
 * @returns `true` if we `have` the Asdon or if it's installed
 */
export function have(): boolean {
  return installed() || haveItem($item`Asdon Martin keyfob (on ring)`);
}

const fuelSkiplist = $items`cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"`;

function inventoryItems(): Item[] {
  return Item.all()
    .filter(isFuelItem)
    .filter(
      (item) =>
        haveItem(item) &&
        [100, autosellPrice(item)].includes(getAcquirePrice(item)),
    );
}

function fuelEfficiency(it: Item) {
  return getAverageAdventures(it) / getAcquirePrice(it);
}

/**
 * @param it the item in question
 * @returns Can `it` be used as Asdon fuel?
 */
export function isFuelItem(it: Item) {
  return (
    !isNpcItem(it) &&
    it.fullness + it.inebriety > 0 &&
    getAverageAdventures(it) > 0 &&
    it.tradeable &&
    it.discardable &&
    !fuelSkiplist.includes(it)
  );
}

/**
 * @returns An array of all fuel items sorted by their efficiency
 */
function getBestFuels(): Item[] {
  // Find all fuel items and sort them by fuel unit cost
  const candidates = Item.all().filter(isFuelItem);

  candidates.sort((a, b) => fuelEfficiency(b) - fuelEfficiency(a));

  if (fuelEfficiency(candidates[0]) < 0.01) {
    throw new Error(
      "Could not identify any fuel with efficiency better than 100 meat per fuel. " +
        "This means something went wrong.",
    );
  }

  return candidates;
}

/**
 * Fuel your Asdon Martin with a given quantity of a given item
 *
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */
export function insertFuel(it: Item, quantity = 1): boolean {
  const result = visitUrl(
    `campground.php?action=fuelconvertor&pwd&qty=${quantity}&iid=${it.id}&go=Convert%21`,
  );
  return result.includes("The display updates with a");
}

/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 *
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */
export function fillTo(targetUnits: number): boolean {
  if (!installed()) return false;

  // if in Hardcore/ronin, skip the price calculation and just use soda bread
  const bestFuels = canInteract()
    ? getBestFuels()
    : [$item`loaf of soda bread`];

  while (bestFuels.length > 0 && getFuel() < targetUnits) {
    const currentFuel = bestFuels.shift()!;
    const nextFuel = bestFuels.at(0);
    const currentEfficiency = fuelEfficiency(currentFuel);
    const nextEfficiency = fuelEfficiency(nextFuel ?? currentFuel);
    const priceCeiling =
      1 +
      (nextFuel
        ? Math.ceil(
            getAcquirePrice(nextFuel) * (currentEfficiency / nextEfficiency),
          )
        : getAcquirePrice(currentFuel));

    const count = Math.ceil(targetUnits / getAverageAdventures(currentFuel));

    if (!canInteract()) {
      // If we can't access the bugbear bakery but do have access to all-purpose flower, use that to get soda bread
      if (
        npcPrice($item`wad of dough`) === 0 &&
        npcPrice($item`all-purpose flower`) > 0
      ) {
        const maxTries = Math.ceil(count / 35); // minimum amount of wad of dough created from all-purpose flower is 35
        for (
          let i = 0;
          i < maxTries && availableAmount($item`wad of dough`) < count;
          i++
        ) {
          buy($item`all-purpose flower`);
          use($item`all-purpose flower`);
        }
        retrieveItem(count, currentFuel);
      } else retrieveItem(count, currentFuel);
    } else {
      withProperty("autoBuyPriceLimit", priceCeiling, () =>
        retrieveItem(count, currentFuel),
      );
    }

    if (
      itemAmount(currentFuel) > 0 &&
      !insertFuel(currentFuel, Math.min(itemAmount(currentFuel), count))
    ) {
      throw new Error(
        "Failed to insert fuel into Asdon Martin. Possible inventory desync?",
      );
    }
  }
  return getFuel() >= targetUnits;
}

/**
 * @param targetUnits The fuel level we aim to achieve
 * @returns Whether we successfully filled our Asdon's tank
 */
function fillWithBestInventoryItem(targetUnits: number): boolean {
  const options = inventoryItems().sort(
    (a, b) =>
      getAverageAdventures(b) / autosellPrice(b) -
      getAverageAdventures(a) / autosellPrice(a),
  );
  if (options.length === 0) return false;

  const best = options[0];
  if (autosellPrice(best) / getAverageAdventures(best) > 100) return false;

  const amountToUse = clamp(
    Math.ceil(targetUnits / getAverageAdventures(best)),
    0,
    itemAmount(best),
  );
  return insertFuel(best, amountToUse);
}

/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 *
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
 *
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */
export function drive(
  style: Effect,
  turns = 1,
  preferInventory = false,
): boolean {
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if (haveEffect(style) >= turns) return true;

  const fuelNeeded = 37 * Math.ceil((turns - haveEffect(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  const casts = Math.min(
    Math.ceil((turns - haveEffect(style)) / 30),
    Math.ceil(getFuel() / 37),
  );

  cliExecute(
    `asdonmartin drive ${style.name.replace("Driving ", "")} ${casts}`,
  );

  return haveEffect(style) >= turns;
}
