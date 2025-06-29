import {
  Monster,
  myFamiliar,
  runChoice,
  runCombat,
  toMonster,
  useFamiliar,
  visitUrl,
  xpath,
} from "kolmafia";
import {
  CombatParams,
  directlyUse,
  have as have_,
  multiSplit,
} from "../../lib.js";
import { get } from "../../property.js";
import { $familiar, $item } from "../../template-string.js";

const familiar = $familiar`Chest Mimic`;

/**
 * @returns Whether you `have` the Chest Mimic familiar.
 */
export function have(): boolean {
  return have_(familiar);
}

const withBank = <T>(action: (page: string) => T): T => {
  const initial = myFamiliar();
  useFamiliar(familiar);
  try {
    const page = visitUrl(
      "place.php?whichplace=town_right&action=townright_dna",
      false,
    );
    return action(page);
  } finally {
    visitUrl("main.php");
    useFamiliar(initial);
  }
};

const canDonate = () => have_($item`mimic egg`) && get("_mimicEggsDonated") < 3;
const canReceive = () =>
  familiar.experience >= 100 && get("_mimicEggsObtained") < 11;

const makeXpath = (selectNumber: number, disabled: boolean): string =>
  `//select[@name="mid"][${selectNumber}]/option[position()>0]${
    disabled ? "[@disabled]" : ""
  }/@value`;

function getMonsters(selectNumber: number, page: string): Monster[] {
  const total = xpath(page, makeXpath(selectNumber, false));
  const disabled = new Set(xpath(page, makeXpath(selectNumber, true)));
  return total.filter((m) => !disabled.has(m)).map((id) => toMonster(id));
}

/**
 * @returns List of monsters available for donation at this time
 */
export function getDonableMonsters(): Monster[] {
  if (!canDonate()) return [];
  const selectNumber = canReceive() ? 2 : 1;
  return withBank((page) => getMonsters(selectNumber, page));
}

/**
 * @returns List of monsters available to receive as an egg at this time
 */
export function getReceivableMonsters(): Monster[] {
  if (!canReceive()) return [];
  return withBank((page) => getMonsters(1, page));
}

/**
 * Donate an egg to the DNA bank
 *
 * @param monster The monster whose egg you want to donate
 * @returns Whether we succeeded in our endeavor
 */
export function donate(monster: Monster): boolean {
  if (!canDonate()) return false;
  const selectNumber = canReceive() ? 2 : 1;
  return withBank((page) => {
    const available = getMonsters(selectNumber, page);
    if (!available.includes(monster)) return false;
    return runChoice(1, `mid=${monster.id}`).includes(
      "You donate your egg to science.",
    );
  });
}

/**
 * Receive an egg from the DNA bank
 *
 * @param monster The monster whose egg you want to receive
 * @returns Whether we succeeded in our endeavor
 */
export function receive(monster: Monster): boolean {
  if (!canReceive()) return false;
  return withBank((page) => {
    const available = getMonsters(1, page);

    if (!available.includes(monster)) return false;
    return runChoice(2, `mid=${monster.id}`).includes(
      "Your mimic pops into a backroom and returns a few moments later with a fresh mimic egg!",
    );
  });
}

/**
 * Differentiate a Mimic egg into a monster, and fight it!
 *
 * @param monster The monster to differentiate your egg into
 * @param combatParams Any parameters you'd like to pass to `runCombat`
 * @returns Whether we successfully differentiated our egg
 */
export function differentiate(
  monster: Monster,
  ...combatParams: CombatParams
): boolean {
  const page = directlyUse($item`mimic egg`);
  const monsters = getMonsters(1, page);
  if (!monsters.includes(monster)) {
    visitUrl("main.php");
    return false;
  }
  runChoice(1, `mid=${monster.id}`);
  runCombat(...combatParams);
  return true;
}

/**
 * @returns A Map containing all monsters available in your mimic eggs and their associated quantities
 */
export function eggMonsters(): Map<Monster, number> {
  return new Map(multiSplit("mimicEggMonsters", ",", ":", [toMonster, Number]));
}

/**
 * Check how many of a monster is available to differentiate into
 *
 * @param monster The monster to differentiate your egg into
 * @returns How many of a Monster we can differentiate
 */
export function differentiableQuantity(monster: Monster): number {
  if (!have_($item`mimic egg`)) return 0;
  return eggMonsters().get(monster) ?? 0;
}
