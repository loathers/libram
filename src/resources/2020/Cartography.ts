import {
  canAdventure,
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
import { have as _have } from "../../lib";
import { get } from "../../property";
import { $skill } from "../../template-string";

export const passive = $skill`Comprehensive Cartography`;
export const skill = $skill`Map the Monsters`;

export function have(): boolean {
  return _have(passive);
}

export function mapMonster(location: Location, monster: Monster): boolean {
  if (!have()) return false;
  if (get("_monstersMapped") >= 3) return false;
  if (!canAdventure(location)) return false;

  useSkill($skill`Map the Monsters`);
  if (!get("mappingMonsters")) return false;

  const turns = myTurncount();
  while (get("mappingMonsters")) {
    if (myTurncount() > turns) {
      throw new Error("Map the Monsters unsuccessful?");
    }
    visitUrl(toUrl(location));
    if (handlingChoice() && lastChoice() === 1435) {
      runChoice(1, `heyscriptswhatsupwinkwink=${monster.id}`);
      return true;
    } else {
      // Handle zone intro adventures
      runChoice(-1);
    }
  }
  return false;
}
