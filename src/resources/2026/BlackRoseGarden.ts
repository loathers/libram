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

/**
 * @returns whether you successfully retrieved all free rose garden items
 */
export function obtainItems(): boolean {
  if (!have() && !installed()) return false;

  return withRoseGarden(({ items }) => {
    for (const { option, choiceExtras, item } of items) {
      runChoice(option, choiceExtras);
    }

    return true;
  });
}

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

function getChoices(): RoseChoices {
  return Object.values(availableChoiceExtras()).reduce(
    (accumulator, { decision, extras_joined, label }) => {
      const base = { option: decision, choiceExtras: extras_joined } as const;

      const monsterText = label.match(MONSTER_PATTERN);
      if (monsterText) {
        return {
          ...accumulator,
          monsters: [
            ...accumulator.monsters,
            { ...base, kind: "monster", monster: toMonster(monsterText[1]) },
          ],
        };
      }
      const itemText = label.match(ITEM_PATTERN);
      if (itemText) {
        const item = ITEM_MAP[itemText[1]] ?? $item.none;
        return {
          ...accumulator,
          items: [...accumulator.items, { ...base, kind: "item", item }],
        };
      }

      for (const { name, pattern } of MISC_PATTERNS) {
        if (label.match(pattern)) {
          return {
            ...accumulator,
            misc: [
              ...accumulator.misc,
              { ...base, kind: "other", other: name },
            ],
          };
        }
      }

      return {
        ...accumulator,
        misc: [
          ...accumulator.misc,
          { ...base, kind: "other", other: "unknown" },
        ],
      };
    },
    {
      monsters: [],
      items: [],
      misc: [],
    } as RoseChoices,
  );
}

function withRoseGarden<T>(action: (choices: RoseChoices) => T): T {
  visitUrl("campground.php?action=rosegarden&pwd");
  try {
    return action(getChoices());
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

  return withRoseGarden(({ misc }) => {
    const fountain = misc.find(({ other }) => other === "fountain");

    if (!fountain) return false;

    runChoice(fountain.option, fountain.choiceExtras);
    runChoice(buff.option);

    return have_(fountainEffect);
  });
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

/**
 * @returns the Monsters currently available to fight in the Rose Garden
 */
export function availableMonsters(): Monster[] {
  if (!have() || !installed()) return [];

  return withRoseGarden(({ monsters }) =>
    monsters.map(({ monster }) => monster),
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

  return withRoseGarden(({ monsters }) => {
    const choice = monsters.find((choice) => choice.monster === monster);

    if (!choice) return false;

    runChoice(choice.option, choice.choiceExtras);
    runCombat(...combatParams);

    return true;
  });
}
