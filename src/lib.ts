/** @module GeneralLibrary */
import "core-js/modules/es.object.entries";
import "core-js/features/array/flat";

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
  Servant,
  Skill,
  spleenLimit,
  Stat,
  Thrall,
  toInt,
  toItem,
  toSkill,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";

import logger from "./logger";
import { get } from "./property";
import {
  $class,
  $element,
  $familiar,
  $item,
  $items,
  $monsters,
  $skill,
  $stat,
} from "./template-string";
import { makeByXFunction, chunk } from "./utils";

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
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */
export function canUse(item: Item): boolean {
  const path = myPath();

  if (path !== Path.get("Nuclear Autumn")) {
    if (
      $items`Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record`.includes(
        item
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
  const id =
    typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id,
  };
}

/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
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
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
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
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
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
              : autosellPrice(item)
          );
        } else {
          valueMap.set(
            item,
            mallPrice(item) > 100 ? MALL_VALUE_MODIFIER * mallPrice(item) : 0
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

export type EnvironmentType = typeof Environment[keyof typeof Environment];

/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
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
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */
export function findFairyMultiplier(familiar: Familiar): number {
  if (familiar === $familiar`Mutant Fire Ant`) {
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item.none);
  }
  if (familiar === $familiar`Reanimated Reanimator`) return 0;
  const itemBonus = numericModifier(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
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

export function getTodaysHolidayWanderers(): Monster[] {
  return holiday()
    .split("/")
    .map((holiday) => holidayWanderers.get(holiday) ?? [])
    .flat();
}

/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
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
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */
export function damageTakenByElement(
  baseDamage: number,
  element: Element
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
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */
export function telescope(): {
  statContest?: Stat;
  elementContest?: Element;
  hedge1?: Element;
  hedge2?: Element;
  hedge3?: Element;
} {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5")),
  };
}

export function examine(thing: Item | Familiar | Effect | Skill): string {
  const url =
    thing instanceof Item
      ? `desc_item.php?whichitem=${thing.descid}`
      : thing instanceof Familiar
      ? `desc_familiar.php?which=${toInt(thing)}`
      : thing instanceof Effect
      ? `desc_effect.php?whicheffect=${thing.descid}`
      : `desc_skill.php?whichskill=${toInt(thing)}`;
  return visitUrl(url);
}

/**
 * Picks an option based on your primestat
 * @param options An object keyed by stat; it must either contain all stats, or have a `default` parameter.
 * @returns The option corresponding to your primestat.
 */
export const byStat = makeByXFunction(() => myPrimestat().toString());
/**
 * Picks an option based on your player class
 * @param options An object keyed by player class; it must either contain all classes, or have a `default` parameter.
 * @returns The option corresponding to your player class.
 */
export const byClass = makeByXFunction(() => myClass().toString());
