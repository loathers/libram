import { retrieveItem } from "kolmafia";

import { Macro } from "../combat";
import { ensureEffect, getSongCount, getSongLimit, have } from "../lib";
import { Requirement } from "../maximize";
import { get } from "../property";
import * as Bandersnatch from "../resources/2009/Bandersnatch";
import * as StompingBoots from "../resources/2011/StompingBoots";
import { $effect, $familiar, $item, $items } from "../template-string";
import {
  ActionSource,
  findActionSource,
  FindActionSourceConstraints,
} from "./ActionSource";

const freeRunSources: ActionSource[] = [
  // Free limited sources
  new ActionSource(
    $familiar`Frumious Bandersnatch`,
    () =>
      (have($effect`Ode to Booze`) || getSongCount() < getSongLimit()) &&
      Bandersnatch.couldRunaway()
        ? Bandersnatch.getRemainingRunaways()
        : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      preparation: () => {
        ensureEffect($effect`Ode to Booze`);
        return have($effect`Ode to Booze`);
      },
      familiar: () => $familiar`Frumious Bandersnatch`,
    }
  ),

  new ActionSource(
    $familiar`Pair of Stomping Boots`,
    () =>
      StompingBoots.couldRunaway() ? StompingBoots.getRemainingRunaways() : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      familiar: () => $familiar`Pair of Stomping Boots`,
    }
  ),

  new ActionSource(
    $item`navel ring of navel gazing`,
    () =>
      have($item`navel ring of navel gazing`)
        ? Math.max(0, 3 - get("_navelRunaways"))
        : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`navel ring of navel gazing` }),
    }
  ),

  new ActionSource(
    $item`Greatest American Pants`,
    () =>
      have($item`Greatest American Pants`)
        ? Math.max(0, 3 - get("_navelRunaways"))
        : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`Greatest American Pants` }),
    }
  ),

  new ActionSource(
    $item`peppermint parasol`,
    () => Math.max(0, 3 - get("_navelRunaways")),
    Macro.item($item`peppermint parasol`),
    {
      preparation: () => retrieveItem($item`peppermint parasol`),
      cost: () =>
        Math.min(
          ActionSource.defaultPriceFunction($item`peppermint sprout`) * 5,
          ActionSource.defaultPriceFunction($item`peppermint parasol`)
        ) / 10, // Breaks after 10 successful runaways.
    }
  ),

  // 90% chance, retrieve 2 to be safe
  // (need to check for Everything Looks Green)
  /*
  new ActionSource(
    $item`green smoke bomb`,
    () => Infinity,
    Macro.item($item`green smoke bomb`).repeat(),
    {
      preparation: () => retrieveItem($item`green smoke bomb`, 2),
      cost: () => ActionSource.defaultPriceFunction($item`green smoke bomb`) * 2,
    }
  ),
  */

  // 50% chance, get 5 to be safe
  new ActionSource(
    $item`tattered scrap of paper`,
    () => Infinity,
    Macro.item($item`tattered scrap of paper`).repeat(),
    {
      preparation: () => retrieveItem($item`tattered scrap of paper`, 5),
      cost: () =>
        ActionSource.defaultPriceFunction($item`tattered scrap of paper`) * 5,
    }
  ),

  // 30% chance, get 10 to be safe
  new ActionSource(
    $item`GOTO`,
    () => Infinity,
    Macro.item($item`GOTO`).repeat(),
    {
      preparation: () => retrieveItem($item`GOTO`, 10),
      cost: () => ActionSource.defaultPriceFunction($item`GOTO`) * 10,
    }
  ),

  // limited quest items
  // need better check for these
  /*
  ...$items`fish-oil smoke bomb, giant eraser`.map(
    (item) =>
      new ActionSource(item, () => Infinity, Macro.item(item), {
        preparation: () => have(item),
        cost: () => 0,
      })
  ),
  */
];

/**
 * Find an available free run source subject to constraints.
 *
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints, or null.
 */
export function tryFindFreeRun(
  constraints?: FindActionSourceConstraints
): ActionSource | null {
  const source = findActionSource(freeRunSources, constraints);
  return source;
}

/**
 * Ensure an available free run source subject to constraints.
 * Throws an error if no source can be found.
 *
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints.
 */
export function ensureFreeRun(
  constraints?: FindActionSourceConstraints
): ActionSource {
  const source = tryFindFreeRun(constraints);

  if (!source) {
    throw new Error("Failed to ensure Free Run source");
  }

  return source;
}
