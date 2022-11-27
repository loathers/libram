import {
  haveFamiliar,
  Item,
  itemAmount,
  Monster,
  myFamiliar,
  Phylum,
  toInt,
  toItem,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { get } from "../../property";
import { $familiar, $item, $items, $phylum } from "../../template-string";

/**
 * The Robortender itself
 */
export const familiar = $familiar`Robortender`;

/**
 * @returns Whether you have the Robortender in your terrarium/available
 */
export function have(): boolean {
  return haveFamiliar(familiar);
}

const phylumDrops = new Map<Phylum, Item>([
  [$phylum`Bug`, $item`pickled grasshopper`],
  // bottle of anís
  [$phylum`Constellation`, Item.get(9348)],
  [$phylum`Demon`, $item`bottle of novelty hot sauce`],
  [$phylum`Elemental`, $item`elemental sugarcube`],
  [$phylum`Elf`, $item`peppermint sprig`],
  [$phylum`Fish`, $item`bottle of clam juice`],
  [$phylum`Goblin`, $item`cocktail mushroom`],
  [$phylum`Hippy`, $item`shot of granola liqueur`],
  [$phylum`Hobo`, $item`can of cherry-flavored sterno`],
  [$phylum`Horror`, $item`lump of black ichor`],
  [$phylum`Humanoid`, $item`bottle of gregnadigne`],
  // bottle of Crème de Fugu
  [$phylum`Mer-kin`, Item.get(9358)],
  [$phylum`Orc`, $item`baby oil shooter`],
  [$phylum`Penguin`, $item`fish head`],
  [$phylum`Pirate`, $item`limepatch`],
  [$phylum`Plant`, $item`pile of dirt`],
  [$phylum`Slime`, $item`slime shooter`],
  [$phylum`Weird`, $item`imaginary lemon`],
]);

/**
 *
 * @param target The phylum or monster you want to know the robortender drop of
 * @returns The robortender drop associated with that phylum or monster
 */
export function dropFrom(target: Monster | Phylum): Item {
  const phylum = target instanceof Monster ? target.phylum : target;
  return phylumDrops.get(phylum) ?? $item.none;
}

/**
 * Determines the probability of getting a robortender drop based on number of drops received
 * @param dropNumber The number of drops to assume you've already received; defaults to mafia's tracked amount
 * @returns The probability of getting a robort drop
 */
export function dropChance(dropNumber = get("_roboDrops")): number {
  return [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber] ?? 0.2;
}

export const minorDrinks = $items`literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini`;
export const majorDrinks = $items`eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins`;
export const drinks = [...minorDrinks, ...majorDrinks];

/**
 * @returns An array consisting of the drinks you've fed your robortender today.
 */
export function currentDrinks(): Item[] {
  const pref = get("_roboDrinks");
  if (!pref) return [];
  return pref
    .split(",")
    .filter((x) => x.trim())
    .map((name) => toItem(name))
    .filter((drink) => drinks.includes(drink));
}

/**
 * @param beverage A robortender-consumable drink of choice (i.e. Drive-By Shooting, Single Entendre, etc)
 * @returns A boolean; if true, the user's robortender has drunk that drink after execution. If false, it has not. This ALSO returns false if the user has not passed the function a robortender-consumable drink. If the user does not already have the beverage in their inventory, this function will not purchase the requested for you.
 */
export function feed(beverage: Item): boolean {
  if (currentDrinks().includes(beverage)) return true;
  if (currentDrinks().length >= 5) return false;
  if (!drinks.includes(beverage)) return false;
  if (!itemAmount(beverage)) return false;
  if (!have()) return false;
  const priorFamiliar = myFamiliar();
  useFamiliar(familiar); // must equip Robortender to feed it
  visitUrl(`inventory.php?action=robooze&which=1&whichitem=${toInt(beverage)}`);
  useFamiliar(priorFamiliar);
  return currentDrinks().includes(beverage);
}
