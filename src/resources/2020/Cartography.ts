import {
  canAdventure,
  currentRound,
  handlingChoice,
  lastChoice,
  Location,
  Monster,
  myTurncount,
  runChoice,
  toUrl,
  useSkill,
  visitUrl,
} from "kolmafia";
import { have as _have } from "../../lib.js";
import { get } from "../../property.js";
import { $skill } from "../../template-string.js";

const passive = $skill`Comprehensive Cartography`;

/**
 * Determines whether you `have` the skill Comprehensive Cartography
 *
 * @returns Whether you currently `have` the skill
 */
export function have(): boolean {
  return _have(passive);
}

/**
 * Map a particular monster in a particular location
 * You'll need to set your autoattack or CCS in advance of using this. Additionally, it will loop to try to avoid time-spinner pranks or zone intro adventures
 *
 * @param location The location to target
 * @param monster The monster to target
 * @returns Whether we successfully mapped the monster
 */
export function mapMonster(location: Location, monster: Monster): boolean {
  if (!have()) return false;
  if (get("_monstersMapped") >= 3) return false;
  if (!canAdventure(location)) return false;

  useSkill($skill`Map the Monsters`);
  if (!get("mappingMonsters")) return false;

  const turns = myTurncount();
  while (currentRound() < 1) {
    // Not in combat
    if (myTurncount() > turns) {
      throw new Error("Map the Monsters unsuccessful?");
    }
    visitUrl(toUrl(location));
    if (handlingChoice() && lastChoice() === 1435) {
      runChoice(1, `heyscriptswhatsupwinkwink=${monster.id}`);
      return true;
    } else {
      runChoice(-1, false);
    }
  }
  return false;
}

/**
 * @returns The number of monsters you can map today
 */
export function availableMaps(): number {
  return have() ? $skill`Map the Monsters`.dailylimit : 0;
}

/**
 * @returns Whether or not `Map the Monsters` is currently active
 */
export function currentlyMapping(): boolean {
  return get("mappingMonsters");
}
