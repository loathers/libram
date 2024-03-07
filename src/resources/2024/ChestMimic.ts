import { Familiar, Monster, cliExecute, urlDecode, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { clamp } from "../../utils";

// eslint-disable-next-line libram/verify-constants
const familiar = Familiar.get(`Chest Mimic`);

/**
 * @returns Whether or not we currently `have` the cursed monkey's paw
 */
export function have(): boolean {
  return have_(familiar);
}

/**
 * @returns The number of eggs we can still acquire today
 */
export function eggs(): number {
  return clamp(11 - get("_mimicEggsObtained"), 0, 11);
}

/**
 * @param mons Which monster to check egg count
 * @returns Whether or not the monster is in the egg network, with 100 eggs
 */
export function inEggNetwork(mons: Monster): boolean {
  const eggListResponse = JSON.parse(
    visitUrl("https://semenar.am/kol/eggnet_monitor/status.php")
  );
  const monsterList: any[] = JSON.parse(eggListResponse);
  const monster = monsterList.find(
    (monster) => monster.monster_number === mons
  );
  return monster && monster.egg_count === 100;
}

/**
 * @returns The current mimic XP
 */
export function mimicXp(): number {
  if (!have()) return 0;
  const regex = RegExp(familiar + " \\((\\d+) exp, \\d+ kills\\)");
  const famXp = visitUrl("familiar.php").match(regex);

  if (famXp) return parseInt(famXp[1], 10);
  else return 0;
}

/**
 * @returns The number of eggs we can make from monsters
 */
export function makeEggCopy(): number {
  return clamp(Math.min(mimicXp() / 50), 0, eggs());
}

/**
 * @returns The number of eggs we can make from monsters
 */
export function makeEggBank(): number {
  return clamp(Math.min(mimicXp() / 100), 0, eggs());
}
