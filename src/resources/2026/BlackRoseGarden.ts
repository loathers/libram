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
  Item,
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

type BaseRoseChoice<T extends string, O> = {
  option: number;
  choiceExtras: string;
  kind: T;
} & { [k in T]: O };

type RoseChoices = {
  monsters: BaseRoseChoice<"monster", Monster>[];
  items: BaseRoseChoice<"item", Item>[];
  misc: BaseRoseChoice<"other", string>[];
};

const MONSTER_PATTERN = /^Fight (.+) at position \d+,\d+$/;
const ITEM_PATTERN = /^Take the (.+) at position \d+,\d+$/;

const MISC_PATTERNS = [
  {
    name: "fountain",
    pattern: /^Drink from the blood fountain at position \d+,\d+$/,
  },
  { name: "chest", pattern: /^Open the chest at position \d+,\d+$/ },
  { name: "leave", pattern: /^Leave the garden$/ },
];

const ITEM_MAP = {
  incense: $item`clove incense`,
  bowl: $item`black rose bowl`,
  wine: $item`black garden rosé`,
} as Record<string, Item>;

function appendChoice<K extends keyof RoseChoices>(
  choices: RoseChoices,
  key: K,
  choice: RoseChoices[K][number],
) {
  return { ...choices, [key]: [...choices[key], choice] };
}

function getChoices(): RoseChoices {
  return Object.values(availableChoiceExtras()).reduce(
    (choices, { decision, extras_joined, label }) => {
      const base = { option: decision, choiceExtras: extras_joined } as const;

      const monsterText = label.match(MONSTER_PATTERN);
      if (monsterText) {
        return appendChoice(choices, "monsters", {
          ...base,
          kind: "monster",
          monster: toMonster(monsterText[1]),
        });
      }
      const itemText = label.match(ITEM_PATTERN);
      if (itemText) {
        const item = ITEM_MAP[itemText[1]] ?? $item.none;
        return appendChoice(choices, "items", { ...base, kind: "item", item });
      }

      for (const { name, pattern } of MISC_PATTERNS) {
        if (label.match(pattern)) {
          return appendChoice(choices, "misc", {
            ...base,
            kind: "other",
            other: name,
          });
        }
      }

      return appendChoice(choices, "misc", {
        ...base,
        kind: "other",
        other: "unknown",
      });
    },
    {
      monsters: [],
      items: [],
      misc: [],
    } as RoseChoices,
  );
}

/**
 * Enters the rose garden, parses your available options, and does what you ask of it.
 * @param action What to do with your time in the garden.
 * @returns The return value of `action`.
 */
export function withGarden<T>(action: (choices: RoseChoices) => T): T {
  visitUrl("campground.php?action=rosegarden&pwd");
  try {
    return action(getChoices());
  } finally {
    visitUrl("main.php");
  }
}

/**
 * @returns The list of items you've successfully obtained
 */
export function obtainItems(): Item[] {
  const obtainedItems: Item[] = [];
  if (!installed()) return obtainedItems;

  return withGarden(({ items }) => {
    for (const { option, choiceExtras, item } of items) {
      try {
        runChoice(option, choiceExtras);
      } catch {
        continue;
      }
      obtainedItems.push(item);
    }

    return obtainedItems;
  });
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
  if (!installed()) return false;

  const fountainEffect = typeof effect === "string" ? toEffect(effect) : effect;

  const buff = fountainBuffs.get(fountainEffect);
  if (!buff || !buff.canAcquire()) return false;

  return withGarden(({ misc }) => {
    const fountain = misc.find(({ other }) => other === "fountain");

    if (!fountain) return false;

    runChoice(fountain.option, fountain.choiceExtras);
    runChoice(buff.option);

    return have_(fountainEffect);
  });
}

/**
 * @returns the Monsters currently available to fight in the Rose Garden
 */
export function availableMonsters(): Monster[] {
  if (!installed()) return [];

  return withGarden(({ monsters }) => monsters.map(({ monster }) => monster));
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
  if (!installed()) return false;

  return withGarden(({ monsters }) => {
    const choice = monsters.find((choice) => choice.monster === monster);

    if (!choice) return false;

    runChoice(choice.option, choice.choiceExtras);
    runCombat(...combatParams);

    return true;
  });
}
