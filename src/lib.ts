/** @module GeneralLibrary */

import {
  appearanceRates,
  availableAmount,
  booleanModifier,
  fullnessLimit,
  getCampground,
  getCounters,
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
  mySpleenUse,
  myThrall,
  myTurncount,
  numericModifier,
  spleenLimit,
  toSkill,
  totalTurnsPlayed,
} from "kolmafia";

import { $class } from "./template-string";
import { get } from "./property";

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
 * Returns the player's total number of Artistic Goth Kid and/or Mini-Hipster
 * wanderers encountered today
 * 
 * @category Wanderers
 */
export function getTotalFamiliarWanderers(): number {
  const hipsterFights = get("_hipsterAdv");
  const gothFights = get("_gothKidFights");
  return hipsterFights + gothFights;
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
    return getTotalFamiliarWanderers() < 7;
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
  const totalFights = getTotalFamiliarWanderers();
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
  const banishedstring = get("banishedMonsters");
  const banishedComponents = banishedstring.split(":");
  const result = new Map<Item | Skill, Monster>();
  if (banishedComponents.length < 3) return result;
  for (let idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    const foe = Monster.get(banishedComponents[idx * 3]);
    const banisher = banishedComponents[idx * 3 + 1];
    // toItem doesn"t error if the item doesn"t exist, so we have to use that.
    const banisherItem = Item.get(banisher);
    const banisherObject = [Item.get("none"), null].includes(banisherItem)
      ? Skill.get(banisher)
      : banisherItem;
    result.set(banisherObject, foe);
  }
  return result;
}