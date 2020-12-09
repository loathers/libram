import { appearanceRates, availableAmount, booleanModifier, fullnessLimit, haveEffect, haveFamiliar, haveServant, haveSkill, inebrietyLimit, itemAmount, myEffects, myFullness, myInebriety, mySpleenUse, myThrall, numericModifier, spleenLimit, toEffect, toInt, toSkill } from "kolmafia";

import { $class } from "./template-string";

/**
 * Returns the current maximum Accordion Thief songs you can have in your head
 */
export function songLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}

/**
 * Tells you if the Skill or Effect provided is an Accordion Thief song
 * @param skillOrEffect The Skill or Effect
 */
export function isSong(skillOrEffect: Skill | Effect) {
  const skill = (skillOrEffect instanceof Effect) ? toSkill(skillOrEffect) : skillOrEffect;

  return toInt(skill.class) === toInt($class`Accordion Thief`) && skill.buff;
}

/**
 * Lists all active Effects
 */
export function activeEffects() {
  return Object.keys(myEffects()).map(e => toEffect(e));
}

/**
 * Lists currently active Accordion Thief songs
 */
export function activeSongs() {
  return activeEffects().filter(isSong);
}

/**
 * Lists number of active Accordion Thief songs
 */
export function songCount() {
  return activeSongs().length;
}

/**
 * Returns the locations in which the given monster can be encountered naturally
 * @param monster Monster to find
 */
export function getMonsterLocations(monster: Monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}

/**
 * Returns your remaining liver space
 */
export function remainingLiver() {
  return inebrietyLimit() - myInebriety();
}

/**
 * Returns your remaining stomach space
 */
export function remainingStomach() {
  return fullnessLimit() - myFullness();
}

/**
 * Returns your remaining spleen space
 */
export function remainingSpleen() {
  return spleenLimit() - mySpleenUse();
}

/**
 * Polymorphic function that will tell you if you "have" any entity which one could feasibly "have".
 */
export function have(thing: Effect | Familiar | Item | Servant | Skill | Thrall, quantity = 1) {
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