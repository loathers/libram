import { Item, visitUrl } from "kolmafia";

interface PricegunSale {
  date: string;
  unitPrice: number;
  quantity: number;
}

interface PricegunHistory {
  itemId: number;
  date: string;
  volume: number;
  price: string;
}

interface PricegunItem {
  itemId: number;
  name: string;
  image: string;
  value: number;
  volume: number;
  date: string;
  sales: PricegunSale[];
  history: PricegunHistory[];
}

function fetchPricegunItem(item: Item): PricegunItem | null {
  try {
    const text = visitUrl(`https://pricegun.loathers.net/api/${item.id}`);
    return JSON.parse(text) as PricegunItem;
  } catch {
    return null;
  }
}

export type PricegunPrice = [number, number];

const pricegunCache = new Map<Item, PricegunPrice | null>();

/**
 * Fetch the current Pricegun value and sale volume for an item.
 * @param item The item to query.
 * @returns A tuple containing the item's current Pricegun value and volume,
 * or `null` if no valid Pricegun data is available.
 */
export function pricegunPrice(item: Item): PricegunPrice | null {
  if (!pricegunCache.has(item)) {
    const data = fetchPricegunItem(item);

    pricegunCache.set(
      item,
      data && data.value > 0 ? [data.value, data.volume] : null,
    );
  }

  return pricegunCache.get(item) ?? null;
}
