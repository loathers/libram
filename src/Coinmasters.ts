/** @module Coinmasters */
import {
  batchClose,
  batchOpen,
  buyPrice,
  Coinmaster,
  Item,
  mallPrice,
  sell,
  sellCost,
  sellPrice,
  toItem,
} from "kolmafia";
import { $coinmaster } from "./template-string";

/**
 * Get all items that a coinmaster sells.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to query
 * @returns List of items the coinmaster sells
 */
export function itemsSold(coinmaster: Coinmaster): Item[] {
  return Item.all().filter((item) => item.seller === coinmaster);
}

/**
 * Get a map of items that a coinmaster sells to their sell prices.
 *
 * Only returns items sold for a single token.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to query
 * @returns Map of items the coinmaster sells, mapped to their sell price
 */
export function sellPrices(coinmaster: Coinmaster): Map<Item, number> {
  const result = new Map<Item, number>();
  for (const item of itemsSold(coinmaster)) {
    const price = sellPrice(coinmaster, item);
    if (price > 0) {
      result.set(item, sellPrice(coinmaster, item));
    }
  }
  return result;
}

/**
 * Get a map of items that a coinmaster sells to their sell prices,
 * accounting for multi-token costs.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to query
 * @returns Map of items the coinmaster sells, mapped to their sell prices per token
 */
export function sellCosts(
  coinmaster: Coinmaster,
): Map<Item, Map<Item, number>> {
  const result = new Map<Item, Map<Item, number>>();
  for (const item of itemsSold(coinmaster)) {
    const costs = sellCost(coinmaster, item);
    const itemCosts = new Map<Item, number>();
    for (const [cost, amount] of Object.entries(costs)) {
      itemCosts.set(toItem(cost), amount);
    }
    result.set(item, itemCosts);
  }
  return result;
}

/**
 * Get all items that a coinmaster buys.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to query
 * @returns List of items the coinmaster buys
 */
export function itemsBought(coinmaster: Coinmaster): Item[] {
  return Item.all().filter((item) => item.buyer === coinmaster);
}

/**
 * Get a map of items that a coinmaster buys to their buy prices.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to query
 * @returns Map of items the coinmaster buys, mapped to their buy price
 */
export function buyPrices(coinmaster: Coinmaster): Map<Item, number> {
  const result = new Map<Item, number>();
  for (const item of itemsBought(coinmaster)) {
    result.set(item, buyPrice(coinmaster, item));
  }
  return result;
}

/**
 * Calculate the meat earned per token for an item.
 *
 * Only considers items sold for a single token.
 *
 * @category Coinmaster
 * @param item The item to query
 * @returns Meat earned if sold per token when buying an item
 */
export function sellMeatPerToken(item: Item): number {
  if (item.seller === $coinmaster`none`) return NaN;
  if (!item.tradeable) return Infinity;

  const tokens = sellPrice(item.seller, item);
  if (tokens <= 0) return NaN;

  const meat = mallPrice(item);
  if (meat <= 0) return Infinity;

  return meat / tokens;
}

/**
 * Calculate the meat cost per token for an item.
 *
 * @category Coinmaster
 * @param item The item to query
 * @returns Meat cost per token if selling an item
 */
export function buyMeatPerToken(item: Item): number {
  if (item.buyer === $coinmaster`none`) return NaN;
  if (!item.tradeable) return Infinity;

  const tokens = buyPrice(item.buyer, item);
  if (tokens <= 0) return NaN;

  const meat = mallPrice(item);
  if (meat <= 0) return Infinity;

  return meat / tokens;
}

/**
 * Coinmaster-sell items to the same coinmaster in bulk.
 *
 * @category Coinmaster
 * @param coinmaster The coinmaster to sell to
 * @param items Map of items to sell, mapped to their quantities
 * @returns Whether all sales succeeded
 */
export function bulkSell(
  coinmaster: Coinmaster,
  items: Map<Item, number>,
): boolean {
  batchOpen();
  items
    .entries()
    .forEach(([item, quantity]) => sell(coinmaster, quantity, item));
  return batchClose();
}
