import { mallPrice, myLightning, restoreMp, retrieveItem, use } from "kolmafia";

import { Macro } from "../combat";
import { have } from "../lib";
import { Requirement } from "../maximize";
import { get } from "../property";
import * as AsdonMartin from "../resources/2017/AsdonMartin";
import { $familiar, $item, $items, $skill } from "../template-string";
import {
  ActionSource,
  findActionSource,
  FindActionSourceConstraints,
} from "./ActionSource";

const freeKillSources: ActionSource[] = [
  // Free limited sources
  new ActionSource(
    $skill`Gingerbread Mob Hit`,
    () =>
      !get("_gingerbreadMobHitUsed") && have($skill`Gingerbread Mob Hit`)
        ? 1
        : 0,
    Macro.skill($skill`Gingerbread Mob Hit`),
    {
      preparation: () => restoreMp(30),
    }
  ),

  new ActionSource(
    $skill`Shattering Punch`,
    () =>
      have($skill`Shattering Punch`) ? 3 - get("_shatteringPunchUsed") : 0,
    Macro.skill($skill`Shattering Punch`),
    {
      preparation: () => restoreMp(30),
    }
  ),

  new ActionSource(
    $item`replica bat-oomerang`,
    () =>
      have($item`replica bat-oomerang`)
        ? 3 - get("_usedReplicaBatoomerang")
        : 0,
    Macro.item($item`replica bat-oomerang`)
  ),

  new ActionSource(
    $item`The Jokester's gun`,
    () =>
      !get("_firedJokestersGun") && have($item`The Jokester's gun`) ? 1 : 0,
    Macro.skill($skill`Fire the Jokester's Gun`),
    {
      equipmentRequirements: () =>
        new Requirement([], {
          forceEquip: $items`The Jokester's gun`,
        }),
    }
  ),

  new ActionSource(
    $item`Lil' Doctor™ bag`,
    () => (have($item`Lil' Doctor™ bag`) ? 3 - get("_chestXRayUsed") : 0),
    Macro.skill($skill`Chest X-Ray`),
    {
      equipmentRequirements: () =>
        new Requirement([], {
          forceEquip: $items`Lil' Doctor™ bag`,
        }),
    }
  ),

  new ActionSource(
    $skill`Asdon Martin: Missile Launcher`,
    () => (!get("_missileLauncherUsed") && AsdonMartin.installed() ? 1 : 0),
    Macro.skill($skill`Asdon Martin: Missile Launcher`),
    {
      preparation: () => AsdonMartin.fillTo(100),
    }
  ),

  // Heavy Rains
  new ActionSource(
    $skill`Lightning Strike`,
    () => (have($skill`Lightning Strike`) ? Math.floor(myLightning() / 20) : 0),
    Macro.skill($skill`Lightning Strike`)
  ),

  // Expensive limited sources
  new ActionSource(
    $item`powdered madness`,
    () => 5 - get("_powderedMadnessUses"),
    Macro.item($item`powdered madness`),
    {
      preparation: () => retrieveItem($item`powdered madness`),
      cost: () => mallPrice($item`powdered madness`),
    }
  ),

  new ActionSource(
    $familiar`Puck Man`,
    () => (have($familiar`Puck Man`) ? 20 - get("_powerPillUses") : 0),
    Macro.item($item`power pill`),
    {
      familiar: () => $familiar`Puck Man`,
      preparation: () => retrieveItem($item`power pill`),
      cost: () => mallPrice($item`power pill`),
    }
  ),

  new ActionSource(
    $familiar`Ms. Puck Man`,
    () => (have($familiar`Ms. Puck Man`) ? 20 - get("_powerPillUses") : 0),
    Macro.item($item`power pill`),
    {
      familiar: () => $familiar`Ms. Puck Man`,
      preparation: () => retrieveItem($item`power pill`),
      cost: () => mallPrice($item`power pill`),
    }
  ),

  // Expensive unlimited sources
  new ActionSource(
    $skill`Shocking Lick`,
    () => Infinity,
    Macro.skill($skill`Shocking Lick`),
    {
      preparation: () => {
        if (
          get("shockingLickCharges") === 0 &&
          retrieveItem($item`battery (9-Volt)`)
        ) {
          use($item`battery (9-Volt)`);
        }
        return get("shockingLickCharges") > 0;
      },
      cost: () => mallPrice($item`battery (AAA)`) * 4,
    }
  ),

  ...$items`Daily Affirmation: Think Win-Lose, superduperheated metal`.map(
    (item) =>
      new ActionSource(item, () => Infinity, Macro.item(item), {
        preparation: () => retrieveItem(item),
        cost: () => mallPrice(item),
      })
  ),
];

/**
 * Find an available free kill source subject to constraints.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free kill source satisfying constraints, or null.
 */
export function tryFindFreeKill(
  constraints?: FindActionSourceConstraints
): ActionSource | null {
  return findActionSource(freeKillSources, constraints);
}

/**
 * Ensure an available free kill source subject to constraints.
 * Throws an error if no source can be found.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free kill source satisfying constraints.
 */
export function ensureFreeKill(
  constraints?: FindActionSourceConstraints
): ActionSource {
  const source = tryFindFreeKill(constraints);

  if (!source) {
    throw new Error("Failed to ensure Free Kill source");
  }

  return source;
}
