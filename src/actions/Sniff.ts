import {
  canEquip,
  cliExecute,
  myTurncount,
  restoreMp,
  retrieveItem,
  useSkill,
  visitUrl,
} from "kolmafia";

import { Macro } from "../combat.js";
import { getFoldGroup, have } from "../lib.js";
import { Requirement } from "../maximize.js";
import { get } from "../property.js";
import { $familiar, $item, $items, $skill } from "../template-string.js";
import {
  ActionSource,
  findActionSource,
  FindActionSourceConstraints,
} from "./ActionSource.js";
import { AugustScepter } from "../index.js";

const sniffSources: ActionSource[] = [
  new ActionSource(
    $skill`Transcendant Olfaction`,
    () =>
      have($skill`Transcendant Olfaction`) ? 3 - get("_olfactionsUsed") : 0,
    Macro.skill($skill`Transcendant Olfaction`),
    {
      preparation: () => restoreMp(50),
    },
  ),

  new ActionSource(
    $skill`Gallapagosian Mating Call`,
    () => (have($skill`Gallapagosian Mating Call`) ? 1 : 0),
    Macro.skill($skill`Gallapagosian Mating Call`),
    {
      preparation: () => restoreMp(30),
    },
  ),

  new ActionSource(
    $item`latte lovers member's mug`,
    () =>
      have($item`latte lovers member's mug`) && !get("_latteCopyUsed") ? 1 : 0,
    Macro.skill($skill`Offer Latte to Opponent`),
    {
      equipmentRequirements: () =>
        new Requirement([], {
          forceEquip: $items`latte lovers member's mug`,
        }),
    },
  ),

  new ActionSource(
    $familiar`Nosy Nose`,
    () => (have($familiar`Nosy Nose`) ? 1 : 0),
    Macro.skill($skill`Get a Good Whiff of This Guy`),
    {
      familiar: () => $familiar`Nosy Nose`,
    },
  ),

  new ActionSource(
    $item`August Scepter`,
    () => (AugustScepter.have() && AugustScepter.canCast(9) ? 1 : 0),
    Macro.skill($skill`Hold Hands`),
    {
      preparation: () => {
        useSkill($skill`Aug. 9th: Hand Holding Day!`);
        return true;
      },
    },
  ),

  new ActionSource(
    $item`Daily Affirmation: Be Superficially interested`,
    () => (have($item`Daily Affirmation: Be Superficially interested`) ? 1 : 0),
    Macro.tryItem($item`Daily Affirmation: Be Superficially interested`),
  ),

  new ActionSource(
    $item`cursed monkey's paw`,
    () =>
      have($item`cursedy monkey's paw`) && get("_monkeyPawWishesUsed") === 4
        ? 1
        : 0,
    Macro.skill($skill`Monkey Point`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`cursed monkey's paw` }),
    },
  ),

  new ActionSource(
    $item`McHugeLarge left pole`,
    () =>
      have($item`McHugeLarge left pole`) || have($item`McHugeLarge duffel bag`)
        ? 1
        : 0,

    Macro.skill($skill`McHugeLarge Slash`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`McHugeLarge left pole` }),
      preparation: () => {
        if (
          !have($item`McHugeLarge left pole`) &&
          have($item`McHugeLarge duffel bag`)
        ) {
          visitUrl("inventory.php?action=skiduffel&pwd");
        }
        return have($item`McHugeLarge left pole`);
      },
    },
  ),
];

/**
 * Find an available banish source subject to constraints.
 *
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Banish source satisfying constraints, or null.
 */
export function tryFindSniff(
  constraints?: FindActionSourceConstraints,
): ActionSource | null {
  let source = findActionSource(sniffSources, constraints);

  return source;
}

/**
 * Ensure an available banish source subject to constraints.
 * Throws an error if no source can be found.
 *
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Banish source satisfying constraints.
 */
export function ensureBanish(
  constraints?: FindActionSourceConstraints,
): ActionSource {
  const source = tryFindSniff(constraints);

  if (!source) {
    throw new Error("Failed to ensure Sniff source");
  }

  return source;
}
