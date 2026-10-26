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
  toEffect,
} from "kolmafia";
import { CombatParams, have as have_, haveInCampground } from "../../lib.js";
import { $effect, $item } from "../../template-string";
import { get } from "../../property.js";
import { clamp } from "../../utils.js";

export const FOUNTAIN_OPTIONS = [
  "Black Rosacea",
  "Black Rose Guardin'",
  "Lucky!",
] as const;

export type FountainEffect = (typeof FOUNTAIN_OPTIONS)[number] | Effect;

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
 * @returns how many partial tombstone free kills you have remaining
 */
export function freeKillsRemaining(): number {
  return clamp(11 - get("_partialTombstonesUsed"), 0, 11);
}

/**
 * @returns whether you successfully retrieved all free rose garden items
 */
export function obtainItems(): boolean {
  if (!have() && !installed()) return false;

  return withRoseGarden(() => {
    for (const { decision, extras, text } of getChoices()) {
      if (!text.startsWith("Take the ")) continue;

      runChoice(decision, extras);
    }

    return true;
  });
}

function withRoseGarden<T>(action: () => T): T {
  visitUrl("campground.php?action=rosegarden&pwd");
  try {
    return action();
  } finally {
    visitUrl("main.php");
  }
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
export function useBloodFountain(effect: FountainEffect): boolean {
  if (!have() || !installed()) return false;

  const fountainEffect = typeof effect === "string" ? toEffect(effect) : effect;

  const buff = fountainBuffs.get(fountainEffect);
  if (!buff || !buff.canAcquire()) return false;

  return withRoseGarden(() => {
    const fountain = getChoices().find((choice) =>
      choice.text.startsWith("Drink from the blood fountain"),
    );

    if (!fountain) return false;

    runChoice(fountain.decision, fountain.extras);
    runChoice(buff.option);

    return have_(fountainEffect);
  });
}

type RoseChoice = {
  decision: number;
  extras: string;
  text: string;
  monster?: Monster;
};

function getChoices(): RoseChoice[] {
  return Object.values(availableChoiceExtras()).map(
    ({ decision, extras_joined, label }) => {
      const monsterText = label.match(/^Fight (.+) at position \d+,\d+$/);

      return {
        decision,
        extras: extras_joined,
        text: label,
        ...(monsterText ? { monster: toMonster(monsterText[1]) } : {}),
      };
    },
  );
}

/**
 * @returns the Monsters currently available to fight in the Rose Garden
 */
export function availableMonsters(): Monster[] {
  if (!have() || !installed()) return [];

  return withRoseGarden(() =>
    getChoices().flatMap((choice) => (choice.monster ? [choice.monster] : [])),
  );
}

/**
 * Fight a Monster in the Rose Garden.
 *
 * @param monster The Monster to fight
 * @param combatParams Any parameters to pass to runCombat
 * @returns Whether the monster was available and the fight was initiated
 */
export function fightMonster(
  monster: Monster,
  ...combatParams: CombatParams
): boolean {
  if (!have() || !installed()) return false;

  return withRoseGarden(() => {
    const choice = getChoices().find((choice) => choice.monster === monster);

    if (!choice) return false;

    runChoice(choice.decision, choice.extras);
    runCombat(...combatParams);

    return true;
  });
}
