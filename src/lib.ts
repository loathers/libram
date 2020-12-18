import {
  appearanceRates,
  availableAmount,
  booleanModifier,
  fullnessLimit,
  getCampground,
  getCounters,
  getProperty,
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
  myTurncount,
  numericModifier,
  spleenLimit,
  toEffect,
  toItem,
  toSkill,
  totalTurnsPlayed,
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

  return skill.class === $class`Accordion Thief` && skill.buff;
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
      .includes(item)
  );
}

export enum Wanderer {
  Digitize = 'Digitize Monster',
  Enamorang = 'Enamorang Monster',
  Familiar = 'Familiar',
  Holiday = 'Holiday Monster',
  Kramco = 'Kramco',
  Nemesis = 'Nemesis Assassin',
  Portscan = 'portscan.edu',
  Romantic = 'Romantic Monster',
  Vote = 'Vote Monster',
};

const deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];

/**
 * Return whether the player has the queried counter
 */
export function haveCounter(counterName: string, minTurns = 0, maxTurns = 500) {
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}

/**
 * Returns the player's total number of Artistic Goth Kid and/or Mini-Hipster
 * wanderers encountered today
 */
export function getTotalFamiliarWanderers() {
  const hipsterFights = parseInt(getProperty("_hipsterAdv"));
  const gothFights = parseInt(getProperty("_gothKidFights"));
  return hipsterFights + gothFights;
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
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 */
export function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 == 1;
}

/**
 * For deterministic wanderers:
 * Return whether the player will encounter the queried wanderer on the next turn
 *
 * For variable wanderers (window):
 * Return whether the player is within an encounter window for the queried wanderer
 * 
 * For variable wanderers (chance per turn):
 * Returns true unless the player has exhausted the number of wanderers possible
 */
export function isWandererNow(wanderer: Wanderer) {
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
  const begin = wanderer + ' window begin';
  const end = wanderer + ' window end';
  return !haveCounter(begin, 1) && haveCounter(end);
}

/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 */
export function getKramcoWandererChance() {
  const fights = parseInt(getProperty("_sausageFights"));
  const lastFight = parseInt(getProperty("(_lastSausageMonsterTurn"));
  const totalTurns = totalTurnsPlayed();
  if (fights < 1) {
    return (lastFight === totalTurns && myTurncount() < 1) ? 0.5 : 1.0;
  }
  const turnsSinceLastFight =  totalTurns - lastFight;
  return (
    Math.min(1.0, (turnsSinceLastFight + 1)  /  (5 + fights * 3 + Math.max(0, fights - 5)**3))
  );
}

/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 * 
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently, the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 */
export function getFamiliarWandererChance() {
  const totalFights = getTotalFamiliarWanderers();
  const probability = [0.5, 0.4, 0.3, 0.2]
  if (totalFights < 4) {
    return probability[totalFights];
  }
  return totalFights > 7 ? 0.0 : 0.1;
}

/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 */
export function getWandererChance(wanderer: Wanderer) {
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
  const begin = wanderer + ' window begin';
  const end = wanderer + ' window end';
  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }
  const counters = getProperty("relayCounters");
  const re = new RegExp('(\\d+):' + end);
  const matches = counters.match(re);
  if (matches && matches.length === 2) {
    const window = parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }
  return 0.0
}
