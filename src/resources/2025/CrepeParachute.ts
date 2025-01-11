import {
  handlingChoice,
  lastChoice,
  Monster,
  runChoice,
  runCombat,
  toMonster,
  visitUrl,
  xpath,
} from "kolmafia";
import { CombatParams, have as have_ } from "../../lib.js";
import { $effect, $item } from "../../template-string.js";
import { Delayed, undelay } from "../../utils.js";

/**
 * @returns Whether or not you have the crepe paper parachute cape
 */
export function have(): boolean {
  return have_($item`crepe paper parachute cape`);
}

const visitParachute = () => visitUrl("inventory.php?action=parachute&pwd");

function checkMonsters(html: string): Monster[] {
  return xpath(
    html,
    "//select[@name='monid']//option[position()>1]/@value",
  ).map((id) => toMonster(Number(id)));
}

/**
 * @returns An array of monsters currently available in the Parachute.
 */
export function availableMonsters(): Monster[] {
  if (!have() || have_($effect`Everything looks Beige`)) return [];
  return checkMonsters(visitParachute());
}

/**
 * @param target Either the monster we want to fight or a function for choosing said monster
 * @param combatParams Any parameters you'd like to pass to `runCombat`
 * @returns whether we successfully parachuted into the target monster
 */
export function fight(
  target: Delayed<Monster, [Monster[]]>,
  ...combatParams: CombatParams
): boolean {
  if (!have()) return false;
  if (have_($effect`Everything looks Beige`)) return false;
  const monsters = checkMonsters(visitParachute());
  const monster = undelay(target, monsters);
  if (!monsters.includes(monster)) return false;
  if (!handlingChoice() || lastChoice() !== 1543) visitParachute();
  runChoice(1, `monid=${monster.id}`);
  runCombat(...combatParams);
  return true;
}
