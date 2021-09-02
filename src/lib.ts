/** @module GeneralLibrary */
import {
  appearanceRates,
  autosellPrice,
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
  mallPrice,
  myEffects,
  myFamiliar,
  myFullness,
  myInebriety,
  myPath,
  mySpleenUse,
  myThrall,
  myTurncount,
  numericModifier,
  print,
  restoreMp,
  retrieveItem,
  spleenLimit,
  toItem,
  toSkill,
  totalTurnsPlayed,
  useFamiliar,
  visitUrl,
} from "kolmafia";

import {
  $class,
  $effect,
  $familiar,
  $item,
  $items,
  $skill,
} from "./template-string";
import { get } from "./property";
import { chunk } from "./utils";
import { Requirement } from "./maximize";
import { Macro } from "./combat";
import { Bandersnatch } from "./resources";

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
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 */
export function ensureEffect(ef: Effect, turns = 1): void {
  if (haveEffect(ef) < turns) {
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}.`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

const valueMap: Map<Item, number> = new Map();

const MALL_VALUE_MODIFIER = 0.9;

/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */
export function saleValue(...items: Item[]): number {
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

export class FreeRun {
  name: string;
  available: () => boolean;
  macro: Macro;
  requirement?: Requirement;
  prepare?: () => void;

  constructor(
    name: string,
    available: () => boolean,
    macro: Macro,
    requirement?: Requirement,
    prepare?: () => void
  ) {
    this.name = name;
    this.available = available;
    this.macro = macro;
    this.requirement = requirement;
    this.prepare = prepare;
  }
}

const freeRuns: FreeRun[] = [
  /*
  new freeRun(
     () => {
      if (getWorkshed() !== $item`Asdon Martin keyfob`) return false;
      const banishes = get("banishedMonsters").split(":");
      const bumperIndex = banishes
        .map((string) => string.toLowerCase())
        .indexOf("spring-loaded front bumper");
      if (bumperIndex === -1) return true;
      return myTurncount() - parseInt(banishes[bumperIndex + 1]) > 30;
    },
    () => {
      fillAsdonMartinTo(50);
      retrieveItem(1, $item`louder than bomb`);
    },
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item($item`Louder Than Bomb`)
  ),
  code removed because of boss monsters
  */

  new FreeRun(
    "Bander",
    () =>
      have($familiar`Frumious Bandersnatch`) &&
      (have($effect`Ode to Booze`) || getSongCount() < getSongLimit()) &&
      Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    new Requirement(["Familiar Weight"], {}),
    () => {
      useFamiliar($familiar`Frumious Bandersnatch`);
      ensureEffect($effect`Ode to Booze`);
    }
  ),

  new FreeRun(
    "Boots",
    () =>
      have($familiar`Pair of Stomping Boots`) &&
      Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    new Requirement(["Familiar Weight"], {}),
    () => useFamiliar($familiar`Pair of Stomping Boots`)
  ),

  new FreeRun(
    "Snokebomb",
    () => get("_snokebombUsed") < 3 && have($skill`Snokebomb`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Snokebomb`
    ),
    undefined,
    () => restoreMp(50)
  ),

  new FreeRun(
    "Hatred",
    () => get("_feelHatredUsed") < 3 && have($skill`Emotionally Chipped`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Feel Hatred`
    )
  ),

  new FreeRun(
    "KGB",
    () =>
      have($item`Kremlin's Greatest Briefcase`) &&
      get("_kgbTranquilizerDartUses") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`KGB tranquilizer dart`
    ),
    new Requirement([], { forceEquip: $items`Kremlin's Greatest Briefcase` })
  ),

  new FreeRun(
    "Latte",
    () => have($item`latte lovers member's mug`) && !get("_latteBanishUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Throw Latte on Opponent"
    ),
    new Requirement([], { forceEquip: $items`latte lovers member's mug` })
  ),

  new FreeRun(
    "Docbag",
    () => have($item`Lil' Doctor™ bag`) && get("_reflexHammerUsed") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Reflex Hammer`
    ),
    new Requirement([], { forceEquip: $items`Lil' Doctor™ bag` })
  ),

  new FreeRun(
    "Middle Finger",
    () =>
      have($item`mafia middle finger ring`) &&
      !get("_mafiaMiddleFingerRingUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Show them your ring`
    ),
    new Requirement([], { forceEquip: $items`mafia middle finger ring` })
  ),

  new FreeRun(
    "VMask",
    () => have($item`V for Vivala mask`) && !get("_vmaskBanisherUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Creepy Grin`
    ),
    new Requirement([], { forceEquip: $items`V for Vivala mask` }),
    () => restoreMp(30)
  ),

  new FreeRun(
    "Stinkeye",
    () =>
      getFoldGroup($item`stinky cheese diaper`).some((item) => have(item)) &&
      !get("_stinkyCheeseBanisherUsed"),

    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Give Your Opponent the Stinkeye"
    ),
    new Requirement([], { forceEquip: $items`stinky cheese eye` }),
    () => {
      if (!have($item`stinky cheese eye`)) cliExecute(`fold stinky cheese eye`);
    }
  ),

  new FreeRun(
    "Navel Ring",
    () => have($item`navel ring of navel gazing`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    new Requirement([], { forceEquip: $items`navel ring of navel gazing` })
  ),

  new FreeRun(
    "GAP",
    () => have($item`Greatest American Pants`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    new Requirement([], { forceEquip: $items`Greatest American Pants` })
  ),

  new FreeRun(
    "Scrapbook",
    () => {
      visitUrl("desc_item.php?whichitem=463063785");
      return have($item`familiar scrapbook`) && get("scrapbookCharges") >= 100;
    },
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Show Your Boring Familiar Pictures"
    ),
    new Requirement([], { forceEquip: $items`familiar scrapbook` })
  ),

  new FreeRun(
    "Parasol",
    () =>
      have($item`peppermint parasol`) &&
      get("parasolUsed") < 9 &&
      get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(
      $item`peppermint parasol`
    )
  ),
];

const cheapestRunSource = $items`Louder Than Bomb, divine champagne popper, tennis ball`.sort(
  (a, b) => mallPrice(a) - mallPrice(b)
)[0];

const cheapestItemRun = new FreeRun(
  "Cheap Combat Item",
  () => retrieveItem(cheapestRunSource),
  Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(
    cheapestRunSource
  ),
  undefined,
  () => retrieveItem(cheapestRunSource)
);

export function findRun(
  useFamiliar = true,
  buyStuff = true
): FreeRun | undefined {
  return (
    freeRuns.find(
      (run) =>
        run.available() &&
        (useFamiliar || !["Bander", "Boots"].includes(run.name))
    ) ?? (buyStuff ? cheapestItemRun : undefined)
  );
}
