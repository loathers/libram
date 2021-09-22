/** @module GeneralLibrary */
import {
  appearanceRates,
  availableAmount,
  booleanModifier,
  cliExecute,
  fullnessLimit,
  getCampground,
  getCounters,
  getPlayerId,
  getPlayerName,
  getRelated,
  haveEffect,
  haveFamiliar,
  haveServant,
  haveSkill,
  inebrietyLimit,
  myEffects,
  myFamiliar,
  myFullness,
  myInebriety,
  myPath,
  mySpleenUse,
  myThrall,
  myTurncount,
  numericModifier,
  spleenLimit,
  toItem,
  toSkill,
  totalTurnsPlayed,
} from "kolmafia";

import { $class, $items } from "./template-string";
import { get } from "./property";
import { chunk } from "./utils";
import * as property from "./property";

/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */
export function getSongLimit(): number {
  return (
    3 +
    (booleanModifier("Four Songs") ? 1 : 0) +
    numericModifier("Additional Song")
  );
}

/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */
export function isSong(skillOrEffect: Skill | Effect): boolean {
  const skill =
    skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;

  return skill.class === $class`Accordion Thief` && skill.buff;
}

/**
 * List all active Effects
 *
 * @category General
 */
export function getActiveEffects(): Effect[] {
  return Object.keys(myEffects()).map((e) => Effect.get(e));
}

/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */
export function getActiveSongs(): Effect[] {
  return getActiveEffects().filter(isSong);
}

/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */
export function getSongCount(): number {
  return getActiveSongs().length;
}

/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */
export function canRememberSong(quantity = 1): boolean {
  return getSongLimit() - getSongCount() >= quantity;
}

/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */
export function getMonsterLocations(monster: Monster): Location[] {
  return Location.all().filter(
    (location) => monster.name in appearanceRates(location)
  );
}

/**
 * Return the player's remaining liver space
 *
 * @category General
 */
export function getRemainingLiver(): number {
  return inebrietyLimit() - myInebriety();
}

/**
 * Return the player's remaining stomach space
 *
 * @category General
 */
export function getRemainingStomach(): number {
  return fullnessLimit() - myFullness();
}

/**
 * Return the player's remaining spleen space
 *
 * @category General
 */
export function getRemainingSpleen(): number {
  return spleenLimit() - mySpleenUse();
}

/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */
export function have(
  thing: Effect | Familiar | Item | Servant | Skill | Thrall,
  quantity = 1
): boolean {
  if (thing instanceof Effect) {
    return haveEffect(thing) >= quantity;
  }

  if (thing instanceof Familiar) {
    return haveFamiliar(thing);
  }

  if (thing instanceof Item) {
    return availableAmount(thing) >= quantity;
  }

  if (thing instanceof Servant) {
    return haveServant(thing);
  }

  if (thing instanceof Skill) {
    return haveSkill(thing);
  }

  if (thing instanceof Thrall) {
    const thrall = myThrall();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}

/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */
export function haveInCampground(item: Item): boolean {
  return Object.keys(getCampground())
    .map((i) => Item.get(i))
    .includes(item);
}

export enum Wanderer {
  Digitize = "Digitize Monster",
  Enamorang = "Enamorang Monster",
  Familiar = "Familiar",
  Holiday = "Holiday Monster",
  Kramco = "Kramco",
  Nemesis = "Nemesis Assassin",
  Portscan = "portscan.edu",
  Romantic = "Romantic Monster",
  Vote = "Vote Monster",
}

const deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];

/**
 * Return whether the player has the queried counter
 *
 * @category General
 */
export function haveCounter(
  counterName: string,
  minTurns = 0,
  maxTurns = 500
): boolean {
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}

/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */
export function haveWandererCounter(wanderer: Wanderer): boolean {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }
  const begin = wanderer + " window begin";
  const end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}

/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */
export function isVoteWandererNow(): boolean {
  return totalTurnsPlayed() % 11 == 1;
}

/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */
export function isWandererNow(wanderer: Wanderer): boolean {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }
  if (wanderer == Wanderer.Kramco) {
    return true;
  }
  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }
  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }
  const begin = wanderer + " window begin";
  const end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}

/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */
export function getKramcoWandererChance(): number {
  const fights = get("_sausageFights");
  const lastFight = get("_lastSausageMonsterTurn");
  const totalTurns = totalTurnsPlayed();
  if (fights < 1) {
    return lastFight === totalTurns && myTurncount() < 1 ? 0.5 : 1.0;
  }
  const turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(
    1.0,
    (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.max(0, fights - 5) ** 3)
  );
}

/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */
export function getFamiliarWandererChance(): number {
  const totalFights = get("_hipsterAdv");
  const probability = [0.5, 0.4, 0.3, 0.2];
  if (totalFights < 4) {
    return probability[totalFights];
  }
  return totalFights > 7 ? 0.0 : 0.1;
}

/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */
export function getWandererChance(wanderer: Wanderer): number {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }
  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }
  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }
  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }
  const begin = wanderer + " window begin";
  const end = wanderer + " window end";
  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }
  const counters = get("relayCounters");
  const re = new RegExp("(\\d+):" + end);
  const matches = counters.match(re);
  if (matches && matches.length === 2) {
    const window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }
  return 0.0;
}

/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */
export function isCurrentFamiliar(familiar: Familiar): boolean {
  return myFamiliar() === familiar;
}

/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */
export function getFoldGroup(item: Item): Item[] {
  return Object.entries(getRelated(item, "fold"))
    .sort(([, a], [, b]) => a - b)
    .map(([i]) => Item.get(i));
}

/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */
export function getZapGroup(item: Item): Item[] {
  return Object.keys(getRelated(item, "zap")).map((i) => Item.get(i));
}

/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */
export function getBanishedMonsters(): Map<Item | Skill, Monster> {
  const banishes = chunk(get("banishedMonsters").split(":"), 3);

  const result = new Map<Item | Skill, Monster>();

  for (const [foe, banisher] of banishes) {
    if (foe === undefined || banisher === undefined) break;
    // toItem doesn"t error if the item doesn"t exist, so we have to use that.
    const banisherItem = toItem(banisher);
    const banisherObject = [Item.get("none"), null].includes(banisherItem)
      ? Skill.get(banisher)
      : banisherItem;
    result.set(banisherObject, Monster.get(foe));
  }
  return result;
}

/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */
export function canUse(item: Item): boolean {
  const path = myPath();

  if (path !== "Nuclear Autumn") {
    if (
      $items`Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record`.includes(
        item
      )
    ) {
      return false;
    }
  }

  if (path === "G-Lover") {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === "Bees Hate You") {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}

/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */
export function noneToNull<T>(thing: T): T | null {
  if (thing instanceof Effect) {
    return thing === Effect.get("none") ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.get("none") ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.get("none") ? null : thing;
  }

  return thing;
}

/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */
export function getAverage(range: string): number {
  if (range.indexOf("-") < 0) return Number(range);

  const [, lower, upper] = range.match(/(-?[0-9]+)-(-?[0-9]+)/) ?? [
    "0",
    "0",
    "0",
  ];

  return (Number(lower) + Number(upper)) / 2;
}

/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */
export function getAverageAdventures(item: Item): number {
  return getAverage(item.adventures);
}

/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */
export function uneffect(effect: Effect): boolean {
  return cliExecute(`uneffect ${effect.name}`);
}

export type Player = {
  name: string;
  id: number;
};

/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */
export function getPlayerFromIdOrName(idOrName: number | string): Player {
  return typeof idOrName === "string"
    ? { name: idOrName, id: parseInt(getPlayerId(idOrName)) }
    : { name: getPlayerName(idOrName), id: idOrName };
}

/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */
export function questStep(questName: string): number {
  const stringStep = property.getString(questName);
  if (stringStep === "unstarted") return -1;
  else if (stringStep === "started") return 0;
  else if (stringStep === "finished" || stringStep === "") return 999;
  else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }
    return parseInt(stringStep.substring(4), 10);
  }
}
