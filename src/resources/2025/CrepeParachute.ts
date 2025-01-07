import { Monster, runChoice, toMonster, visitUrl, xpath } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { $effect, $item } from "../../template-string.js";

/**
 * @returns Whether or not you have the crepe paper parachute cape
 */
export function have(): boolean {
  return have_($item`crepe paper parachute cape`);
}

/**
 * @param html the html for the page to return a monster array from
 * @returns Monsters available to parachute to
 */
function checkMonsters(html: string): Monster[] {
  return xpath(
    html,
    "//select[@name='monid']//option[position()>1]/@value",
  ).map((id) => toMonster(Number(id)));
}

/**
 * @param mon is the monster you want to fight
 * @returns whether we successfully parachuted into the target monster
 */
export function fight(target: Delayed<Monster, [Monster[]]>): boolean {
  if (!have()) return false;
  if (have_($effect`Everything Looks Beige`)) return false;
  const monsters = checkMonsters(
    visitUrl("inventory.php?action=parachute&pwd"),
  );
  const monster = undelay(target, monsters);
  if (!monsters.includes(monster)) return false;
  runChoice(1, `pwd&monid=${mon.id}`);
  return true;
}
