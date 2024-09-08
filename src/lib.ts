/** @module GeneralLibrary */
import {
  appearanceRates,
  autosellPrice,
  availableAmount,
  booleanModifier,
  choiceFollowsFight,
  cliExecute,
  currentRound,
  Effect,
  Element,
  elementalResistance,
  equip,
  equippedItem,
  extractItems as kolmafiaExtractItems,
  Familiar,
  fullnessLimit,
  getCampground,
  getCounters,
  getPlayerId,
  getPlayerName,
  getRelated,
  handlingChoice,
  haveEffect,
  haveFamiliar,
  haveServant,
  haveSkill,
  holiday,
  inebrietyLimit,
  inMultiFight,
  Item,
  Location,
  mallPrice,
  Monster,
  myClass,
  myEffects,
  myFamiliar,
  myFullness,
  myInebriety,
  myPath,
  myPrimestat,
  mySpleenUse,
  myThrall,
  myTurncount,
  numericModifier,
  Path,
  runCombat,
  Servant,
  Skill,
  Slot,
  spleenLimit,
  Stat,
  Thrall,
  todayToString,
  toItem,
  toSkill,
  totalTurnsPlayed,
  visitUrl,
  xpath,
  monsterEval,
  batchOpen,
  batchClose,
  autosell,
  putCloset,
  putDisplay,
  putShop,
  putStash,
  sell,
  takeCloset,
  takeDisplay,
  takeShop,
  takeStash,
  takeStorage,
  Coinmaster,
  repriceShop,
  familiarWeight,
  weightAdjustment,
} from "kolmafia";

import logger from "./logger.js";
import { get } from "./property.js";
import {
  $class,
  $effect,
  $element,
  $familiar,
  $item,
  $items,
  $monsters,
  $skill,
  $stat,
} from "./template-string.js";
import { makeByXFunction, chunk, notNull, clamp } from "./utils.js";

/**
 * Determines the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 * @returns Maximum number of songs for player
 */
export function getSongLimit(): number {
  return (
    3 +
    (booleanModifier("Four Songs") ? 1 : 0) +
    numericModifier("Additional Song")
  );
}

/**
 * Determine whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 * @returns Whether it's a song
 */
export function isSong(skillOrEffect: Skill | Effect): boolean {
  if (
    skillOrEffect instanceof Effect &&
    skillOrEffect.attributes.includes("song")
  ) {
    return true;
  } else {
    const skill =
      skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;

    return skill.class === $class`Accordion Thief` && skill.buff;
  }
}

/**
 * List all active Effects
 *
 * @category General
 * @returns List of Effects
 */
export function getActiveEffects(): Effect[] {
  return Object.keys(myEffects()).map((e) => Effect.get(e));
}

/**
 * List currently active Accordion Thief songs
 *
 * @category General
 * @returns List of song Effects
 */
export function getActiveSongs(): Effect[] {
  return getActiveEffects().filter(isSong);
}

/**
 * List number of active Accordion Thief songs
 *
 * @category General
 * @returns Number of songs
 */
export function getSongCount(): number {
  return getActiveSongs().length;
}

/**
 * Determine whether player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 * @returns Whether player can remember another song
 */
export function canRememberSong(quantity = 1): boolean {
  return getSongLimit() - getSongCount() >= quantity;
}

/**
 * Determine the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 * @returns Locations for monster
 */
export function getMonsterLocations(monster: Monster): Location[] {
  return Location.all().filter(
    (location) => monster.name in appearanceRates(location),
  );
}

/**
 * Determine the player's remaining liver space
 *
 * @category General
 * @returns Remaining liver space
 */
export function getRemainingLiver(): number {
  return inebrietyLimit() - myInebriety();
}

/**
 * Determine the player's remaining stomach space
 *
 * @category General
 * @returns Remaining stomach space
 */
export function getRemainingStomach(): number {
  return fullnessLimit() - myFullness();
}

/**
 * Determine the player's remaining spleen space
 *
 * @category General
 * @returns Remaining spleen space
 */
export function getRemainingSpleen(): number {
  return spleenLimit() - mySpleenUse();
}

/**
 * Determine whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Minimum quantity the player must have to pass
 * @returns Whether the player meets the requirements of owning the supplied thing
 */
export function have(
  thing: Effect | Familiar | Item | Servant | Skill | Thrall,
  quantity = 1,
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
 * Determine whether a given item is in the player's campground
 *
 * @category General
 * @param item The Item KoLmafia uses to represent the campground item
 * @returns Whether the item is in the campground
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
 * Determine whether the player has the specified counter
 *
 * @param counterName Name of the counter
 * @param minTurns Minimum turns the counter is set to
 * @param maxTurns Maximum turns the counter is set to
 * @category General
 * @returns Whether player has the counter
 */
export function haveCounter(
  counterName: string,
  minTurns = 0,
  maxTurns = 500,
): boolean {
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}

/**
 * Determine whether the player has the specified wanderer's counter
 *
 * @param wanderer Wanderer to check
 * @category Wanderers
 * @returns Whether player has the wanderer counter
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
 * Determine whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 * @returns Whether the vote wanderer is due
 */
export function isVoteWandererNow(): boolean {
  return (
    totalTurnsPlayed() % 11 === 1 &&
    get("lastVoteMonsterTurn") < totalTurnsPlayed()
  );
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
 * @returns Whether the wanderer is due
 */
export function isWandererNow(wanderer: Wanderer): boolean {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }
  if (wanderer === Wanderer.Kramco) {
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
 * Determines the chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 * @returns Chance that the sausage goblin is due (as a number between 0 and 1)
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
    (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.max(0, fights - 5) ** 3),
  );
}

/**
 * Determines the chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 * @returns Chance that the familiar wanderer is due (as a number between 0 and 1)
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
 * Determines the chance the player will encounter the specified wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 * @returns Chance that the specified wanderer is due (as a number between 0 and 1)
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
 * Determines whether the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 * @returns Whether it is the player's current familiar
 */
export function isCurrentFamiliar(familiar: Familiar): boolean {
  return myFamiliar() === familiar;
}

/**
 * Determines the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 * @returns List of items in the fold group
 */
export function getFoldGroup(item: Item): Item[] {
  return Object.entries(getRelated(item, "fold"))
    .sort(([, a], [, b]) => a - b)
    .map(([i]) => Item.get(i));
}

/**
 * Determines the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 * @returns List of items in the zap group
 */
export function getZapGroup(item: Item): Item[] {
  return Object.keys(getRelated(item, "zap")).map((i) => Item.get(i));
}

/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 * @returns Map of banished monsters
 */
export function getBanishedMonsters(): Map<Item | Skill, Monster> {
  const banishes = chunk(get("banishedMonsters").split(":"), 3);

  const result = new Map<Item | Skill, Monster>();

  for (const [foe, banisher] of banishes) {
    if (foe === undefined || banisher === undefined) break;
    // toItem doesn"t error if the item doesn"t exist, so we have to use that.
    const banisherItem = toItem(banisher);
    if (banisher.toLowerCase() === "saber force") {
      result.set($skill`Use the Force`, Monster.get(foe));
    } else if (banisher.toLowerCase() === "nanorhino") {
      result.set($skill`Unleash Nanites`, Monster.get(foe));
    } else if (
      [
        Item.none,
        Item.get(`training scroll:  Snokebomb`),
        Item.get(`tomayohawk-style reflex hammer`),
        null,
      ].includes(banisherItem)
    ) {
      if (Skill.get(banisher) === $skill.none) {
        break;
      } else {
        result.set(Skill.get(banisher), Monster.get(foe));
      }
    } else {
      result.set(banisherItem, Monster.get(foe));
    }
  }
  return result;
}

/**
 * Determines whether the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 * @returns Whether item is usable
 */
export function canUse(item: Item): boolean {
  const path = myPath();

  if (path !== Path.get("Nuclear Autumn")) {
    if (
      $items`Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record`.includes(
        item,
      )
    ) {
      return false;
    }
  }

  if (path === Path.get("G-Lover")) {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === Path.get("Bees Hate You")) {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}

/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 * @returns The thing specified or `null`
 */
export function noneToNull<T>(thing: T): T | null {
  if (thing instanceof Effect) {
    return thing === Effect.none ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.none ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.none ? null : thing;
  }

  return thing;
}

/**
 * Determine the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 * @returns Average value fo range
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
 * Deternube tge average adventures expected from consuming an Item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 * @returns Average aventures from consumable
 */
export function getAverageAdventures(item: Item): number {
  return getAverage(item.adventures);
}

/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 * @returns Success
 */
export function uneffect(effect: Effect): boolean {
  return cliExecute(`uneffect ${effect.name}`);
}

/**
 * Get the player id from a player name
 * @param name the name of the player
 * @param onMissing Pass "throw" or omit to throw an error if the player is not found
 * @returns the player id, or throws if no such player exists
 */
export function getPlayerIdFromName(name: string, onMissing?: "throw"): number;
/**
 * Get the player id from a player name (if it exists)
 * @param name the name of the player
 * @param onMissing Pass "throw" to throw an error if the player is not found, or "return-null" to return null
 * @returns the player id if the player exists, or handles according to onMissing
 */
export function getPlayerIdFromName(
  name: string,
  onMissing: "throw" | "return-null",
): number | null;
/**
 * Get the player id from a player name (if it exists)
 * @param name the name of the player
 * @param onMissing Pass "throw" to throw an error if the player is not found, or "return-null" to return null
 * @returns the player id if the player exists, or handles according to onMissing
 */
export function getPlayerIdFromName(
  name: string,
  onMissing: "throw" | "return-null" = "throw",
): number | null {
  const playerId = getPlayerId(name);
  // KoLmafia returns the input when not found
  if (playerId === name) {
    if (onMissing === "throw") {
      throw new Error(`Player not found: ${name}`);
    }
    return null;
  }
  return parseInt(playerId);
}

/**
 * Get the player id from a player name
 * @param id the id of the player
 * @param onMissing Pass "throw" or omit to throw an error if the player is not found
 * @returns the player id, or throws if no such player exists
 */
export function getPlayerNameFromId(id: number, onMissing?: "throw"): string;
/**
 * Get the player id from a player name (if it exists)
 * @param id the id of the player
 * @param onMissing Pass "throw" to throw an error if the player is not found, or "return-null" to return null * @returns the player id, or null if no such player exists
 * @returns the player id if the player exists, or handles according to onMissing
 */
export function getPlayerNameFromId(
  id: number,
  onMissing: "throw" | "return-null",
): string | null;
/**
 * Get the player id from a player name (if it exists)
 * @param id the id of the player
 * @param onMissing Pass "throw" to throw an error if the player is not found, or "return-null" to return null
 * @returns the player id if the player exists, or handles according to onMissing
 */
export function getPlayerNameFromId(
  id: number,
  onMissing: "throw" | "return-null" = "throw",
): string | null {
  const playerName = getPlayerName(id);
  // KoLmafia returns the input when not found
  if (playerName === id.toString()) {
    if (onMissing === "throw") {
      throw new Error(`Player not found: ${playerName}`);
    }
    return null;
  }
  return playerName;
}

export type Player = {
  name: string;
  id: number;
};

/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @param onMissing Pass "throw" or omit to throw an error if the player is not found
 * @returns Object containing id and name of player
 * @throws {Error} Throws an error if the player is not found
 */
export function getPlayerFromIdOrName(
  idOrName: number | string,
  onMissing?: "throw",
): Player;
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @param onMissing Pass "return-null" to return null if the player is not found
 * @returns Object containing id and name of player if it exists, or handles according to onMissing
 */
export function getPlayerFromIdOrName(
  idOrName: number | string,
  onMissing: "throw" | "return-null",
): Player | null;
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @param onMissing Pass "throw" to throw an error if the player is not found, or "return-null" to return null
 * @returns Object containing id and name of player if it exists, or handles according to onMissing
 */
export function getPlayerFromIdOrName(
  idOrName: number | string,
  onMissing: "throw" | "return-null" = "throw",
): Player | null {
  if (typeof idOrName === "number") {
    const name = getPlayerNameFromId(idOrName, onMissing);
    if (name === null) return null;
    return { name, id: idOrName };
  } else {
    const id = getPlayerIdFromName(idOrName, onMissing);
    if (id === null) return null;
    // load from KoLmafia to get the right capitalization
    const name = getPlayerName(id);
    return { name, id };
  }
}

/**
 * Determine the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 * @returns Quest step
 */
export function questStep(questName: string): number {
  const stringStep = get(questName);
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

export class EnsureError extends Error {
  constructor(cause: Item | Familiar | Effect, reason?: string) {
    super(`Failed to ensure ${cause.name}!${reason ? ` ${reason}` : ""}`);
    this.name = "Ensure Error";
  }
}

/**
 * Tries to get an effect using the default method
 *
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */
export function ensureEffect(ef: Effect, turns = 1): void {
  if (haveEffect(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}

const valueMap: Map<Item, number> = new Map();

const MALL_VALUE_MODIFIER = 0.9;

/**
 * Determiens the average value (based on mallprice and autosell) of a collection of items
 *
 * @param items items whose value you care about
 * @returns Average value of items
 */
export function getSaleValue(...items: Item[]): number {
  return (
    items
      .map((item) => {
        if (valueMap.has(item)) return valueMap.get(item) || 0;
        if (item.discardable) {
          valueMap.set(
            item,
            mallPrice(item) > Math.max(2 * autosellPrice(item), 100)
              ? MALL_VALUE_MODIFIER * mallPrice(item)
              : autosellPrice(item),
          );
        } else {
          valueMap.set(
            item,
            mallPrice(item) > 100 ? MALL_VALUE_MODIFIER * mallPrice(item) : 0,
          );
        }
        return valueMap.get(item) || 0;
      })
      .reduce((s, price) => s + price, 0) / items.length
  );
}

export const Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater",
} as const;

export type EnvironmentType = (typeof Environment)[keyof typeof Environment];

/**
 * Determines the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 *
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 * @returns Weight-coefficient
 */
export function findLeprechaunMultiplier(familiar: Familiar): number {
  if (familiar === $familiar`Mutant Cactus Bud`) {
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }
  if (familiar === $familiar`Reanimated Reanimator`) return 0;
  const meatBonus = numericModifier(familiar, "Meat Drop", 1, $item.none);
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}

/**
 * Determines the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 *
 * @param familiar The familiar whose fairy multiplier you're interested in
 * @returns Weight-coefficient
 */
export function findFairyMultiplier(familiar: Familiar): number {
  if (familiar === $familiar`Mutant Fire Ant`) {
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item.none);
  }
  if (familiar === $familiar`Reanimated Reanimator`) return 0;
  const itemBonus = numericModifier(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
  // Assumes you're using LED candle; returns effective weight multiplier
  if (familiar === $familiar`Jill-of-All-Trades`) return 1.5;
  // Working out the multiplier based on the Item Drop at 1lb
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}

export const holidayWanderers = new Map<string, Monster[]>([
  [
    "El Dia De Los Muertos Borrachos",
    $monsters`Novia Cadáver, Novio Cadáver, Padre Cadáver, Persona Inocente Cadáver`,
  ],
  [
    "Feast of Boris",
    $monsters`Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem`,
  ],
  [
    "Talk Like a Pirate Day",
    $monsters`ambulatory pirate, migratory pirate, peripatetic pirate`,
  ],
]);

/**
 * Get today's holiday wanderers
 *
 * @returns List of holiday wanderer Monsters
 */
export function getTodaysHolidayWanderers(): Monster[] {
  return holiday()
    .split("/")
    .flatMap((holiday) => holidayWanderers.get(holiday) ?? []);
}

/**
 * Determines whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 *
 * @returns Whether urls can be safely visited
 */
export function canVisitUrl(): boolean {
  if (currentRound()) {
    logger.debug(`Current round is ${currentRound()}; you're in combat.`);
    return false;
  }
  if (inMultiFight()) {
    logger.debug("You're in a multifight.");
    return false;
  }
  if (choiceFollowsFight()) {
    logger.debug("A choice follows this fight.");
    return false;
  }
  if (handlingChoice()) {
    logger.debug("You're currently in a choice adventure");
    return false;
  }

  return true;
}

/**
 * Calculate damage taken from a specific element after factoring in resistance
 *
 * @param baseDamage Base damage
 * @param element Element
 * @returns damage after factoring in resistances
 */
export function damageTakenByElement(
  baseDamage: number,
  element: Element,
): number {
  if (baseDamage < 0) return 1;
  const res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - (baseDamage * res) / 100));
}

const telescopeStats = new Map([
  [
    "standing around flexing their muscles and using grip exercisers",
    $stat`Muscle`,
  ],
  [
    "sitting around playing chess and solving complicated-looking logic puzzles",
    $stat`Mysticality`,
  ],
  ["all wearing sunglasses and dancing", $stat`Moxie`],
]);

const telescopeElements = new Map([
  ["people, all of whom appear to be on fire", $element`hot`],
  ["people, surrounded by a cloud of eldritch mist", $element`spooky`],
  ["greasy-looking people furtively skulking around", $element`sleaze`],
  ["people, surrounded by garbage and clouds of flies", $element`stench`],
  ["people, clustered around a group of igloos", $element`cold`],
]);

const hedgeTrap1 = new Map([
  ["smoldering bushes on the outskirts of a hedge maze", $element`hot`],
  [
    "creepy-looking black bushes on the outskirts of a hedge maze",
    $element`spooky`,
  ],
  ["purplish, greasy-looking hedges", $element`sleaze`],
  [
    "nasty-looking, dripping green bushes on the outskirts of a hedge maze",
    $element`stench`,
  ],
  ["frost-rimed bushes on the outskirts of a hedge maze", $element`cold`],
]);

const hedgeTrap2 = new Map([
  ["smoke rising from deeper within the maze", $element`hot`],
  [
    "a miasma of eldritch vapors rising from deeper within the maze",
    $element`spooky`,
  ],
  [
    "a greasy purple cloud hanging over the center of the maze",
    $element`sleaze`,
  ],
  ["a cloud of green gas hovering over the maze", $element`stench`],
  ["wintry mists rising from deeper within the maze", $element`cold`],
]);

const hedgeTrap3 = new Map([
  ["with lava slowly oozing out of it", $element`hot`],
  ["surrounded by creepy black mist", $element`spooky`],
  ["that occasionally vomits out a greasy ball of hair", $element`sleaze`],
  ["disgorging a really surprising amount of sewage", $element`stench`],
  ["occasionally disgorging a bunch of ice cubes", $element`cold`],
]);

/**
 * Get information from telescope
 *
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */
export function telescope(): {
  statContest?: Stat;
  elementContest?: Element;
  hedge1?: Element;
  hedge2?: Element;
  hedge3?: Element;
} {
  return Object.fromEntries(
    Object.entries({
      statContest: telescopeStats.get(get("telescope1")),
      elementContest: telescopeElements.get(get("telescope2")),
      hedge1: hedgeTrap1.get(get("telescope3")),
      hedge2: hedgeTrap2.get(get("telescope4")),
      hedge3: hedgeTrap3.get(get("telescope5")),
    } as const).filter(([, value]) => value),
  );
}

/**
 * Visit the desc_x.php page for a given thing
 *
 * @param thing Thing to examine
 * @returns Contents of desc_x.php page
 */
export function examine(thing: Item | Familiar | Effect | Skill): string {
  const url =
    thing instanceof Item
      ? `desc_item.php?whichitem=${thing.descid}`
      : thing instanceof Familiar
        ? `desc_familiar.php?which=${thing.id}`
        : thing instanceof Effect
          ? `desc_effect.php?whicheffect=${thing.descid}`
          : `desc_skill.php?whichskill=${thing.id}`;
  return visitUrl(url);
}

/**
 * Picks an option based on your primestat
 *
 * @param options An object keyed by stat; it must either contain all stats, or have a `default` parameter.
 * @param alternateSource An optional alternate way of determining which Stat to choose by.
 * @returns The option corresponding to your primestat.
 */
export const byStat = makeByXFunction(() => myPrimestat().toString());
/**
 * Picks an option based on your player class
 *
 * @param options An object keyed by player class; it must either contain all classes, or have a `default` parameter.
 * @param alternateSource An optional anternate way of determining which Class to choose by.
 * @returns The option corresponding to your player class.
 */
export const byClass = makeByXFunction(() => myClass().toString());

/**
 * Use an item with visitUrl instead of `use`; this is sometimes useful
 *
 * @param item The item you want to use
 * @returns The html of the resulting page
 */
export function directlyUse(item: Item): string {
  return visitUrl(`inv_use.php?which=3&whichitem=${item.id}&pwd`);
}

/**
 * Unequip all instances of a given equipped item
 *
 * @param item The item in question
 * @returns Whether we succeeded completely--`false` if we unequip some but not all instances of the item.
 */
export function unequip(item: Item): boolean;
/**
 * Empty a given slot.
 *
 * @param slot The slot in question
 * @returns Whether we successfully emptied the slot
 */
export function unequip(slot: Slot): boolean;
/**
 * Empty a slot, or unequip all instances of a given equipped item
 *
 * @param thing The slot or item in question
 * @returns Whether we succeeded completely--`false` if we unequip some but not all instances of the item.
 */
export function unequip(thing: Item | Slot): boolean {
  if (thing instanceof Slot) return equip(thing, $item.none);
  const failedSlots = Slot.all().filter((s) => {
    // Filter the slot out if it doesn't contain the relevant item
    if (equippedItem(s) !== thing) return false;
    // Filter the slot out if we succeed at unequipping it
    return !unequip(thing);
    // This leaves only slots that do contain the item but that we failed to unequip
  });
  if (failedSlots.length)
    logger.debug(
      `Failed to unequip ${thing} from slots ${failedSlots.join(", ")}`,
    );
  return failedSlots.length === 0;
}

/**
 * @returns a Date object corresponding to the current in-game day, at midnight
 */
export function gameDay(): Date {
  const [, year, month, day] = (
    todayToString().match(/(\d{4})(\d{2})(\d{2})/) ?? []
  ).map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);
}

/**
 * @param [type="all"] the type of crafting to check for free crafts
 * @returns the number of free crafts available of that type
 */
export function freeCrafts(
  type: "food" | "smith" | "booze" | "all" = "all",
): number {
  const effectCrafts = (effect: Effect) => Math.floor(haveEffect(effect) / 5);

  const all =
    (have($skill`Rapid Prototyping`) ? 5 - get("_rapidPrototypingUsed") : 0) +
    (have($skill`Expert Corner-Cutter`)
      ? 5 - get("_expertCornerCutterUsed")
      : 0) +
    effectCrafts($effect`Inigo's Incantation of Inspiration`) +
    effectCrafts($effect`Craft Tea`) +
    // eslint-disable-next-line libram/verify-constants
    effectCrafts($effect`Cooking Concentrate`);
  const food = type === "food" ? 5 - get("_cookbookbatCrafting") : 0;
  const smith = type === "smith" ? 5 - get("_thorsPliersCrafting") : 0;
  const booze = 0; // currently there is no booze specific free crafting skill
  return all + food + smith + booze;
}

export const realmTypes = [
  "spooky",
  "stench",
  "hot",
  "cold",
  "sleaze",
  "fantasy",
  "pirate",
] as const;
export type RealmType = (typeof realmTypes)[number];
/**
 * @param identifier which realm to check for
 * @returns if that realm is available
 */
export function realmAvailable(identifier: RealmType): boolean {
  if (identifier === "fantasy") {
    return get(`_frToday`) || get(`frAlways`);
  } else if (identifier === "pirate") {
    return get(`_prToday`) || get(`prAlways`);
  }
  return get(`_${identifier}AirportToday`) || get(`${identifier}AirportAlways`);
}

/**
 * Compute the currently available Lucky Gold Ring Currencies
 * @param realm the realm type to consider
 * @returns The currency for the given zone
 */
export function realmCurrency(realm: RealmType): Item | null {
  switch (realm) {
    case "sleaze":
      return $item`Beach Buck`;
    case "spooky":
      return $item`Coinspiracy`;
    case "stench":
      return $item`FunFunds™`;
    case "cold":
      return $item`Wal-Mart gift certificate`;
    case "hot":
      return $item`Volcoino`;
    case "fantasy":
      return $item`Rubee™`;
    default:
      return null;
  }
}

/**
 * Compute which Lucky Gold Ring currencies are currently available
 * @returns a list of currently available currencies
 */
export function lgrCurrencies(): Item[] {
  return realmTypes
    .filter(
      (realm) =>
        realmAvailable(realm) &&
        !(realm === "hot" && get("_luckyGoldRingVolcoino")),
    )
    .map(realmCurrency)
    .filter(notNull);
}

const ACCOUNT_COMBAT_FLAGS = [
  "aabosses",
  "wowbar",
  "bothcombatinterf",
  "compactmanuel",
  "eternalmrj",
  "disablelovebugs",
  "boringdarts",
] as const;
/**
 * Different flags you can set on your account for how to handle combat:
 * aabosses refers to the flag that lets autoattack trigger against special monsters
 * wowbar refers to the flag to use the Combat Action Bar
 * bothcombatinterf refers to the flag to use both the CAB
 * compactmanuel refers to the flag to display monster manuel data horizontally
 * eternalmrg refers to the flag to enable endless factoid delight
 * disablelovebugs disables love bugs
 * boringdarts avoid rendering the dartboard in combat
 */
export type AccountCombatFlag = (typeof ACCOUNT_COMBAT_FLAGS)[number];

/**
 * Get the current value of all of your account's combat setting flags
 * @param flags An array of the flags you want to get, defaults to all of them
 * @returns An array of objects that contain the flags and their values as booleans
 */
export function getCombatFlags(
  flags: AccountCombatFlag[] = [...ACCOUNT_COMBAT_FLAGS],
): {
  flag: AccountCombatFlag;
  value: boolean;
}[] {
  const accountPage = visitUrl("account.php?tab=combat");
  return flags.map((flag) => ({
    flag,
    value:
      xpath(
        accountPage,
        `//*[@id="opt_flag_${flag}"]/label/input[@type='checkbox']@checked`,
      )[0] === "checked",
  }));
}

/**
 * Sets the given combat setting flags on your account
 *
 * @param flags A spread array of objects that contain a flag and its desired value; these look like the return value of `getCombatFlags`
 * @returns the result of the associated `visitUrl` call
 */
export function setCombatFlags(
  ...flags: { flag: AccountCombatFlag; value: boolean }[]
): string {
  return visitUrl(
    `account.php?${
      ([
        ...flags.flatMap(({ flag, value }) => [
          `actions[]=flag_${flag}`,
          `flag_${flag}=${Number(value)}`,
        ]),
        "action=Update",
        "am=1",
        "ajax=1",
      ].join("&"),
      true)
    }`,
  );
}

/**
 * Perform a given action with certain combat setting flags set, returning them to their initial values if possible
 *
 * @param action The action you want to do with the given combat setting flags
 * @param flags A spread array of objects that contain a combat setting flag and its desired value; these look like the return value of `getCombatFlags`
 * @returns The result of the action
 */
export function withCombatFlags<T>(
  action: () => T,
  ...flags: { flag: AccountCombatFlag; value: boolean }[]
) {
  const initialValues = getCombatFlags(flags.map(({ flag }) => flag));
  try {
    return action();
  } finally {
    setCombatFlags(...initialValues);
  }
}

/**
 * Determines whether you currently have an effect intrinsically
 * @param effect The effect in question
 * @returns Whether you have that effect as an intrinsic. Alternately you could just have over 2147483647 turns of that effect, but that seems unlikely.
 */
export function haveIntrinsic(effect: Effect): boolean {
  return haveEffect(effect) >= 2147483647;
}

/**
 * Extracts a map of gained items from a string, for example from the result
 * of a combat.
 *
 * NOTE: Make sure you trust the source of that text.
 *
 * @param text The text to extract items from
 * @returns A map of items and their quantities
 */
export function extractItems(text: string): Map<Item, number> {
  return new Map(
    Object.entries(kolmafiaExtractItems(text)).map(
      ([itemName, quantity]) => [Item.get(itemName), quantity] as const,
    ),
  );
}

export type CombatParams = Parameters<typeof runCombat>;

function makeScalerCalcFunction(
  cache: Map<Monster, string>,
  pattern: RegExp,
): (monster: Monster) => number {
  return function (monster: Monster) {
    const current = cache.get(monster);
    if (current !== undefined) return monsterEval(current);

    const result = pattern.exec(monster.attributes)?.[1] ?? "0";
    cache.set(monster, result);
    return monsterEval(result);
  };
}

const scalerRates = new Map<Monster, string>();
const scalerCaps = new Map<Monster, string>();
const SCALE_RATE_PATTERN = /Scale: (?:\[([^\]]*)\]|(\d*))/;
const SCALE_CAP_PATTERN = /Cap: (?:\[([^\]]*)\]|(\d*))/;

/**
 * Calculate & return the scaling rate of a monster--`0` for non-scalers.
 * @param monster The monster to check
 * @returns The current scaling rate of the monster, based on your current in-game state
 */
export const getScalingRate = makeScalerCalcFunction(
  scalerRates,
  SCALE_RATE_PATTERN,
);

/**
 * Calculate & return the scaling cap of a monster--`0` for non-scalers.
 * @param monster The monster to check
 * @returns The current scaling cap of the monster, based on your current in-game state
 */
export const getScalingCap = makeScalerCalcFunction(
  scalerCaps,
  SCALE_CAP_PATTERN,
);

/**
 * Wrap a specified action in mafia's `batchOpen` and `batchClose`
 *
 * @param action Action to perform while using mafia's batching feature
 * @returns The return value of the action
 */
export function withBatch<T>(action: () => T): T {
  batchOpen();
  try {
    return action();
  } finally {
    batchClose();
  }
}

const makeBulkFunction =
  (action: (quantity: number, item: Item) => boolean) =>
  (items: Map<Item, number>) => {
    batchOpen();
    for (const [item, quantity] of items.entries()) action(quantity, item);
    return batchClose();
  };

/*
 * Autosell items in bulk
 */
export const bulkAutosell = makeBulkFunction(autosell);
/*
 * Closet items in bulk
 * Note: each item transfer will still consume one request
 */
export const bulkPutCloset = makeBulkFunction(putCloset);
/*
 * Display items in bulk
 */
export const bulkPutDisplay = makeBulkFunction(putDisplay);
/*
 * Deposit items into your clan stash in bulk
 */
export const bulkPutStash = makeBulkFunction(putStash);
/*
 * Remove items from your closet in bulk
 * Note: each item transfer will still consume one request
 */
export const bulkTakeCloset = makeBulkFunction(takeCloset);
/*
 * Remove items from your display case in bulk
 */
export const bulkTakeDisplay = makeBulkFunction(takeDisplay);
/*
 * Remove items from your shop in bulk
 */
export const bulkTakeShop = makeBulkFunction(takeShop);
/*
 * Withdraw items from your clan stash in bulk
 * Note: each item transfer will still consume one request
 */
export const bulkTakeStash = makeBulkFunction(takeStash);
/*
 * Remove items from your Hagnk's in bulk
 */
export const bulkTakeStorage = makeBulkFunction(takeStorage);
/*
 * Mallsell items in bulk
 */
export const bulkPutShop = (
  items: Map<Item, { quantity?: number; limit?: number; price: number }>,
) => {
  batchOpen();
  for (const [item, { quantity, limit, price }] of items.entries()) {
    quantity
      ? putShop(price, limit ?? 0, quantity, item)
      : putShop(price, limit ?? 0, item);
  }
  return batchClose();
};
/*
 * Coinmaster-sell items to the same coinmaster in bulk
 */
export const bulkSell = (coinmaster: Coinmaster, items: Map<Item, number>) => {
  batchOpen();
  for (const [item, quantity] of items.entries())
    sell(coinmaster, quantity, item);
  return batchClose();
};
/*
 * Reprice items in your mallstore in bulk
 */
export const bulkRepriceShop = (
  items: Map<Item, { quantity?: number; limit?: number; price: number }>,
) => {
  batchOpen();
  for (const [item, { limit, price }] of items.entries()) {
    limit ? repriceShop(price, limit, item) : repriceShop(price, item);
  }
  return batchClose();
};

/*
 * Calculate the total weight of a given familiar, including soup & modifiers
 * @param familiar The familiar to use--defaults to your current one
 * @param considerAdjustment Whether to include your `weightAdjustment` in the calculation
 * @returns The total weight of the given familiar
 */
export function totalFamiliarWeight(
  familiar = myFamiliar(),
  considerAdjustment = true,
): number {
  return (
    clamp(
      familiarWeight(myFamiliar()),
      have($effect`Fidoxene`) ? 20 : 0,
      Infinity,
    ) +
    familiar.soupWeight +
    (considerAdjustment ? weightAdjustment() : 0) +
    (familiar.feasted ? 10 : 0)
  );
}
