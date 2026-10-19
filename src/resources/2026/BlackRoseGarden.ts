import {
  Effect,
  itemAmount,
  Monster,
  myGardenType,
  myMeat,
  visitUrl,
  availableChoiceExtras,
  runCombat,
  runChoice,
  toMonster,
} from "kolmafia";
import { CombatParams, have as have_, haveInCampground } from "../../lib.js";
import { $effect, $item } from "../../template-string";
import { get } from "../../property.js";
import { clamp } from "../../utils.js";

/**
 * @returns whether you have the rose garden
 */
export function have(): boolean {
  return (
    haveInCampground($item`black garden rose`) ||
    have_($item`black garden rose`)
  );
}

/**
 * @returns whether you have the rose garden installed
 */
export function installed(): boolean {
  return myGardenType() === "black_rose";
}

/**
 * @returns whether you successfull retrieved all free rose garden items
 */
export function getItems(): boolean {
  if (!have() && !installed()) return false;

  for (const [decision, choice] of getRoseChoices()) {
    if (!choice.text.startsWith("Take the ")) continue;

    runChoice(decision, choice.extras);
  }

  return true;
}

/**
 * @returns how many partial tombstone free kills you have remaining
 */
export function freeKillsRemaining(): number {
  return clamp(11 - get("_partialTombstonesUsed"), 0, 11);
}

type FountainOption = {
  canAcquire(): boolean;
  option: number;
};

const fountainBuffs = new Map<Effect, FountainOption>([
  [
    $effect`Black Rosacea`,
    {
      canAcquire: () => myMeat() >= 1,
      option: 1,
    },
  ],
  [
    $effect`Black Rose Guardin'`,
    {
      canAcquire: () => myMeat() >= 1000,
      option: 2,
    },
  ],
  [
    $effect`Lucky!`,
    {
      canAcquire: () =>
        !have_($effect`Lucky!`) && itemAmount($item`black rose pentacle`) > 0,
      option: 3,
    },
  ],
]);

/**
 * @param effect the fountain effect you want to gain
 * @returns whether you successfully gained the effect
 */
export function useBloodFountain(effect: Effect): boolean {
  if (!have() || !installed()) return false;

  const buff = fountainBuffs.get(effect);
  if (!buff || !buff.canAcquire()) return false;

  const fountain = [...getRoseChoices()].find(([, choice]) =>
    choice.text.startsWith("Drink from the blood fountain"),
  );

  if (!fountain) return false;

  const [decision, choice] = fountain;
  runChoice(decision, `${choice.extras}&option=${buff.option}`);

  return have_(effect);
}

type RoseChoice = {
  extras: string;
  text: string;
  monster?: Monster;
};

function getRoseChoices(): Map<number, RoseChoice> {
  visitUrl("campground.php?action=rosegarden&pwd");

  const choices = new Map<number, RoseChoice>();

  for (const { decision, extras_joined, label } of Object.values(
    availableChoiceExtras(),
  )) {
    const monsterText = label.match(/^Fight (.+) at position \d+,\d+$/);

    choices.set(decision, {
      text: label,
      extras: extras_joined,
      ...(monsterText ? { monster: toMonster(monsterText[1]) } : {}),
    });
  }

  return choices;
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
  if (!have() || !installed()) return false;

  const toFight = [...getRoseChoices().entries()].find(
    ([, choice]) => choice.monster === monster,
  );

  if (!toFight) return false;

  const [decision, choice] = toFight;
  runChoice(decision, choice.extras);
  runCombat(...combatParams);

  return true;
}
