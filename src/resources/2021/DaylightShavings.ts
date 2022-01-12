import { myClass, toEffect, toInt } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $effects, $item } from "../../template-string";

export const helmet = $item`Daylight Shavings Helmet`;

/**
 * Returns whether the player owns an unpackaged Daylight Shavings Helmet, and it's available in either the inventory or other zones as determined by autoSatisfy settings.
 * @returns whether we have the Daylight Shavings Helmet.
 */
export function have(): boolean {
  return haveItem(helmet);
}

export const buffs = $effects`Spectacle Moustache, Toiletbrush Moustache, Barbell Moustache, Grizzly Beard, Surrealist's Moustache, Musician's Musician's Moustache, Gull-Wing Moustache, Space Warlord's Beard, Pointy Wizard Beard, Cowboy Stache, Friendly Chops`;

export function hasBuff(): boolean {
  return buffs.some((buff) => haveItem(buff));
}
/**
 * Calculates and returns the cycle of buffs that the hat should cycle through.
 * @param playerclass The class to generate a cycle for
 * @returns An ordered array consisting of the cycle for this class. The first element of the array will be the first buff a player should expect to get in a given ascension.
 */
export function buffCycle(playerclass = myClass()): Effect[] {
  if (toInt(playerclass) <= 0) return [];
  const returnValue: Effect[] = [];
  const id = toInt(playerclass);
  const seed = id > 6 ? (id % 6) + 1 : id;
  for (let i = 1; i < 12; i++) {
    const index = (i * seed) % 11;
    returnValue.push(buffs[index]);
  }
  return returnValue;
}

/**
 * Returns the next buff we expect to get from the shaving hat.
 * @returns The next buff we expect to get from the shaving hat.
 */
export function nextBuff(): Effect {
  const currentBuff = toEffect(get("lastBeardBuff").toFixed(0));

  const cycle = buffCycle();

  const index = cycle.indexOf(currentBuff);

  const newIndex = (1 + index) % 11;
  return cycle[newIndex];
}

/**
 * Returns the number of buffs we expect it'll take to get to a given buff. Returns 1 for the next buff, 2 for the one after that, and so on. Returns 11 for the most recent buff.
 * @param buff The shaving buff in question
 * @returns The number of buffs we expect it'll take to get to the inputted buff; null if said buff is not granted by the shaving hat.
 */
export function buffsUntil(buff: Effect): number | null {
  if (!buffs.includes(buff)) return null;

  const currentIndex = buffs.indexOf(nextBuff()) - 1;
  const newIndex = buffs.indexOf(buff);

  const diff = (newIndex - currentIndex) % 11;
  return diff === 0 ? 11 : diff;
}
