import {
  Effect,
  itemAmount,
  lastChoice,
  Monster,
  myGardenType,
  myMeat,
  visitUrl,
  availableChoiceExtras,
  runCombat,
} from "kolmafia";
import { CombatParams, have as have_ } from "../../lib.js";
import { $effect, $item } from "../../template-string";
import { get } from "../../property.js";

let choicesAvailable: RoseChoice[] | undefined = undefined;

/**
 * @returns whether you have the rose garden
 */
export function have(): boolean {
  return roseGardenInstalled() || have_($item`black garden rose`);
}

/**
 * @returns whether you have the rose garden installed
 */
export function roseGardenInstalled(): boolean {
  return myGardenType() === "black_rose";
}

/**
 * @returns whether you successfull retrieved all free rose garden items
 */
export function getRoseItems(): boolean {
  if (!have()) {
    return false;
  }

  for (const choice of getRoseChoices()) {
    if (!choice.text.startsWith("Take the ")) continue;

    visitUrl(choice.url);
  }
  return true;
}

/**
 * @returns how many partial tombstone free kills you have remaining
 */
export function freeKillsRemaining(): number {
  return 11 - get("_partialTombstonesUsed");
}

type FountainOption = {
  choice: number;
  effect: Effect;
  canAcquire(): boolean;
};
const fountainBuffs: FountainOption[] = [
  {
    choice: 1,
    effect: $effect`Black Rosacea`,
    canAcquire: () => myMeat() >= 1,
  },
  {
    choice: 2,
    effect: $effect`Black Rose Guardin'`,
    canAcquire: () => myMeat() >= 1000,
  },
  {
    choice: 3,
    effect: $effect`Lucky!`,
    canAcquire: () =>
      !have_($effect`Lucky!`) && itemAmount($item`black rose pentacle`) > 0,
  },
];

/**
 * @param effect the fountain effect you want to gain
 * @returns whether you successfully gained the effect
 */
export function useBloodFountain(effect: Effect): boolean {
  if (!have() || !roseGardenInstalled()) return false;

  const buff = fountainBuffs.find((option) => option.effect === effect);

  if (!buff || !buff.canAcquire()) return false;

  choicesAvailable ??= getRoseChoices();

  const fountain = choicesAvailable.find((choice) =>
    choice.text.startsWith("Drink from the blood fountain"),
  );

  if (!fountain) return false;

  visitUrl("campground.php?action=rosegarden&pwd");
  visitUrl(fountain.url);
  visitUrl(`choice.php?pwd=&whichchoice=${lastChoice()}&option=${buff.choice}`);

  return have_(effect);
}

interface RoseChoice {
  text: string;
  url: string;
  monster?: Monster;
}

function getRoseChoices(): RoseChoice[] {
  // Always visit, we always have a reason to want the fresh data
  visitUrl("campground.php?action=rosegarden&pwd");
  const choices: RoseChoice[] = [];

  for (const { decision, extras_joined, label } of Object.values(
    availableChoiceExtras(),
  )) {
    const choice: RoseChoice = {
      text: label,
      url: `choice.php?pwd=&whichchoice=${lastChoice()}&${extras_joined}&option=${decision}`,
    };

    const monsterText = choice.text.match(/^Fight (.+) at position \d+,\d+$/);

    if (monsterText) {
      choice.monster = Monster.get(monsterText[1]);
    }

    choices.push(choice);
  }

  return choices.filter((c) => !c.monster);
}

/**
 * @returns an array of monsters available in your rose garden
 */
export function getAvailableRoseMonsters(): Monster[] {
  choicesAvailable ??= getRoseChoices();

  return choicesAvailable
    .map((choice) => choice.monster)
    .filter((monster) => monster !== undefined);
}

/**
 * Fight a Monster in the Rose Garden.
 *
 * @param monster The Monster to fight
 * @param combatParams Any parameters to pass to runCombat
 * @returns Whether the monster was available and the fight was initiated
 */
export function fightRoseMonster(
  monster: Monster,
  ...combatParams: CombatParams
): boolean {
  if (!have() || !roseGardenInstalled()) return false;

  const toFight = getRoseChoices().find((choice) => choice.monster === monster);

  if (!toFight) return false;

  choicesAvailable = undefined;

  visitUrl(toFight.url);
  runCombat(...combatParams);

  return true;
}
