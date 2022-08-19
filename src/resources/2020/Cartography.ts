import {
  Location,
  Monster,
  myTurncount,
  runChoice,
  runCombat,
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

export function mapMonster(location: Location, monster: Monster): void {
  useSkill($skill`Map the Monsters`);
  if (!get("mappingMonsters")) {
    throw new Error("Failed to setup Map the Monsters.");
  }
  const turns = myTurncount();
  while (get("mappingMonsters")) {
    if (myTurncount() > turns) {
      throw new Error("Map the Monsters unsuccessful?");
    }
    visitUrl(toUrl(location));
    runChoice(1, `heyscriptswhatsupwinkwink=${monster.id}`);
    runCombat();
  }
}
