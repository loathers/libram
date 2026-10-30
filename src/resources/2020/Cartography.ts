import {
  adv1,
  canAdventure,
  choiceFollowsFight,
  currentRound,
  handlingChoice,
  Location,
  Monster,
  myTurncount,
  runChoice,
  useSkill,
} from "kolmafia";
import { have as _have } from "../../lib.js";
import { get, withChoice } from "../../property.js";
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
 * Map a particular monster in a particular location, terminating after one `adv1` independent of success.
 * You'll need to set your autoattack or CCS in advance of using this. Additionally, it will loop to try to avoid time-spinner pranks or zone intro adventures
 *
 *
 * @param location The location to target
 * @param monster The monster to target
 * @returns One of three states: `mapped` for a complete success, `failed` if we couldn’t begin mapping or finish the attempted adventure, `interrupted` otherwise.
 */
export function tryMapMonster(
  location: Location,
  monster: Monster,
): "mapped" | "interrupted" | "failed" {
  if (!have() || !canAdventure(location) || currentRound() > 0) return "failed";

  if (!currentlyMapping()) {
    if (get("_monstersMapped") >= 3) return "failed";
    useSkill($skill`Map the Monsters`);
    if (!currentlyMapping()) return "failed";
  }

  return withChoice(1435, `1&heyscriptswhatsupwinkwink=${monster.id}`, () => {
    const adventured = adv1(location, -1, "");
    if (choiceFollowsFight() || handlingChoice()) runChoice(-1);
    if (!currentlyMapping()) return "mapped";
    if (!adventured || currentRound() > 0 || handlingChoice()) return "failed";
    return "interrupted";
  });
}
/**
 * Map a particular monster in a particular location, looping until we either waste a turn or succeed.
 * You'll need to set your autoattack or CCS in advance of using this. Additionally, it will loop to try to avoid time-spinner pranks or zone intro adventures
 *
 * @param location The location to target
 * @param monster The monster to target
 * @returns Whether we successfully mapped the monster
 */
export function mapMonster(location: Location, monster: Monster): boolean {
  const turns = myTurncount();
  while (true) {
    const result = tryMapMonster(location, monster);
    if (result !== "interrupted") return result === "mapped";
    if (myTurncount() > turns) {
      throw new Error("Map the Monsters unsuccessful?");
    }
  }
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
