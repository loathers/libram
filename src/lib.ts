import {
  appearanceRates,
  availableAmount,
  booleanModifier,
  fullnessLimit,
  getCampground,
  getCounters,
  haveEffect,
  haveFamiliar,
  haveServant,
  haveSkill,
  inebrietyLimit,
  myEffects,
  myFullness,
  myInebriety,
  mySpleenUse,
  myThrall,
  numericModifier,
  spleenLimit,
  toEffect,
  toInt,
  toItem,
  toSkill,
} from "kolmafia";

import { $class } from "./template-string";

/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 */
export function getSongLimit() {
  return (
    3 +
    (booleanModifier("Four Songs") ? 1 : 0) +
    numericModifier("Additional Song")
  );
}

/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 * @param skillOrEffect The Skill or Effect
 */
export function isSong(skillOrEffect: Skill | Effect) {
  const skill =
    skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;

  return toInt(skill.class) === toInt($class`Accordion Thief`) && skill.buff;
}

/**
 * List all active Effects
 */
export function getActiveEffects() {
  return Object.keys(myEffects()).map((e) => toEffect(e));
}

/**
 * List currently active Accordion Thief songs
 */
export function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}

/**
 * List number of active Accordion Thief songs
 */
export function getSongCount() {
  return getActiveSongs().length;
}

/**
 * Return the locations in which the given monster can be encountered naturally
 * @param monster Monster to find
 */
export function getMonsterLocations(monster: Monster) {
  return Location.all().filter(
    (location) => monster.name in appearanceRates(location)
  );
}

/**
 * Return the player's remaining liver space
 */
export function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}

/**
 * Return the player's remaining stomach space
 */
export function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}

/**
 * Return the player's remaining spleen space
 */
export function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}

/**
 * Return whether the player "has" any entity which one could feasibly "have".
 */
export function have(
  thing: Effect | Familiar | Item | Servant | Skill | Thrall,
  quantity = 1
) {
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
 */
export function haveInCampground(item: Item) {
  return (
    Object.keys(getCampground())
      .map((i) => toItem(i))
      .find((i) => toInt(i) === toInt(item)) !== undefined
  );
}

export enum Wanderer {
  Digitize = 'Digitize Monster',
  Enamorang = 'Enamoranged Monster',
  Holiday = 'Holiday Monster',
  Portscan = 'portscan.edu',
  Romantic = 'Romantic Monster',
  Vote = 'Vote Monster',
};

const deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan, Wanderer.Vote];

/**
 * Return whether the player has the queried counter
 */
export function haveCounter(counterName: string, minTurns = 0, maxTurns = 500) {
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}

/**
 * Return whether the player has the queried wandering counter
 */
export function haveWandererCounter(wanderer: Wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }
  const begin = wanderer + ' window begin';
  const end = wanderer + ' window end';
  return haveCounter(begin) || haveCounter(end);
}

/**
 * For deterministic wanderers:
 * Return whether the player will encounter the queried wanderer on the next turn
 *
 * For variable wanderers:
 * Return whether the player is within an encounter window for the queried wanderer
 */
export function isWandererNow(wanderer: Wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }
  const begin = wanderer + ' window begin';
  const end = wanderer + ' window end';
  return !haveCounter(begin, 1) && haveCounter(end);
}
