import {
  Monster,
  runChoice,
  runCombat,
  toMonster,
  visitUrl,
  xpath,
} from "kolmafia";
import { directlyUse, have as have_ } from "../../lib";
import { get } from "../../property";
import { $familiar, $item } from "../../template-string";

const familiar = $familiar`Chest Mimic`;

/**
 * @returns Whether you `have` the Chest Mimic familiar.
 */
export function have(): boolean {
  return have_(familiar);
}

const visitBank = () =>
  visitUrl("place.php?whichplace=town_right&action=townright_dna", false);

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

  try {
    const page = visitBank();
    return getMonsters(selectNumber, page);
  } finally {
    visitUrl("main.php");
  }
}

/**
 * @returns List of monsters available to receive as an egg at this time
 */
export function getReceivableMonsters(): Monster[] {
  if (!canReceive()) return [];
  try {
    const page = visitBank();
    return getMonsters(1, page);
  } finally {
    visitUrl("main.php");
  }
}

/**
 * Donate an egg to the DNA bank
 *
 * @param monster The monster whose egg you want to donate
 * @returns Whether we succeeded in our endeavor
 */
export function donate(monster: Monster): boolean {
  if (!canDonate()) return false;

  try {
    const selectNumber = canReceive() ? 2 : 1;
    const page = visitBank();
    const available = getMonsters(selectNumber, page);
    if (!available.includes(monster)) return false;
    return runChoice(1, `mid=${monster.id}`).includes(
      "You donate your egg to science."
    );
  } finally {
    visitUrl("main.php");
  }
}

/**
 * Receive an egg from the DNA bank
 *
 * @param monster The monster whose egg you want to receive
 * @returns Whether we succeeded in our endeavor
 */
export function receive(monster: Monster): boolean {
  if (!canReceive()) return false;

  try {
    const page = visitBank();
    const available = getMonsters(1, page);

    if (!available.includes(monster)) return false;
    return runChoice(2, `mid=${monster.id}`).includes(
      "Your mimic pops into a backroom and returns a few moments later with a fresh mimic egg!"
    );
  } finally {
    visitUrl("main.php");
  }
}

/**
 * Differentiate a Mimic egg into a monster, and fight it!
 *
 * @param monster The monster to differentiate your egg into
 * @param combat Any parameters you'd like to pass to `runCombat`
 * @returns Whether we successfully differentiated our egg
 */
export function differentiate(
  monster: Monster,
  ...combat: Parameters<typeof runCombat>
): boolean {
  const page = directlyUse($item`mimic egg`);
  const monsters = getMonsters(1, page);
  if (!monsters.includes(monster)) {
    visitUrl("main.php");
    return false;
  }
  runChoice(1, `mid=${monster.id}`);
  runCombat(...combat);
  return true;
}

/**
 * Differentiate a Mimic egg into a monster, and fight it!
 *
 * @param monster The monster to differentiate your egg into
 * @returns How many of a Monster we can differentiate
 */
export function canDifferentiateMonster(monster: Monster): number {
  if (!have_($item`mimic egg`)) return 0;
  const page = directlyUse($item`mimic egg`);
  const monsters = getMonsters(1, page);
  if (!monsters.includes(monster)) {
    visitUrl("main.php");
    return 0;
  }
  const numMonsterXPath = makeXpath(2, false); // Assuming numMonster is in the second select element
  const numMonsterValues = xpath(page, numMonsterXPath);
  const numMonster = numMonsterValues.length; // Assuming numMonster is a count of options in the second select element

  visitUrl("main.php");
  return numMonster;
}
