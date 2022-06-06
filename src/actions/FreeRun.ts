import {
  cliExecute,
  myTurncount,
  restoreMp,
  retrieveItem,
  visitUrl,
} from "kolmafia";

import { Macro } from "../combat";
import {
  ensureEffect,
  getFoldGroup,
  getSongCount,
  getSongLimit,
  have,
} from "../lib";
import { Requirement } from "../maximize";
import { get } from "../property";
import * as Bandersnatch from "../resources/2009/Bandersnatch";
import * as StompingBoots from "../resources/2011/StompingBoots";
import * as AsdonMartin from "../resources/2017/AsdonMartin";
import { $effect, $item, $items, $skill } from "../template-string";
import {
  ActionSource,
  findActionSource,
  FindActionSourceConstraints,
} from "./ActionSource";

// Value of _lastCombatStarted the last time we updated scrapbook charges.
let scrapbookChargesLastUpdated = get("_lastCombatStarted");

// Free unlimited source every 30 turns.
// Does not work on special monsters so needs a backup, see tryFindFreeRun.
// banishedMonsters isn't updated if the free run succeeds on an unbanishable monster
const asdonMartinSource: ActionSource = new ActionSource(
  $skill`Asdon Martin: Spring-Loaded Front Bumper`,
  () => {
    if (!AsdonMartin.installed()) return 0;
    const banishes = get("banishedMonsters").split(":");
    const bumperIndex = banishes
      .map((string) => string.toLowerCase())
      .indexOf("spring-loaded front bumper");
    if (bumperIndex === -1) return 1;
    return myTurncount() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
  },
  Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`),
  {
    preparation: () => AsdonMartin.fillTo(50),
  }
);

const freeRunSources: ActionSource[] = [
  // Free limited sources
  new ActionSource(
    Bandersnatch.familiar,
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
      familiar: () => Bandersnatch.familiar,
    }
  ),

  new ActionSource(
    StompingBoots.familiar,
    () =>
      StompingBoots.couldRunaway() ? StompingBoots.getRemainingRunaways() : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      familiar: () => StompingBoots.familiar,
    }
  ),

  new ActionSource(
    $skill`Snokebomb`,
    () => (have($skill`Snokebomb`) ? 3 - get("_snokebombUsed") : 0),
    Macro.skill($skill`Snokebomb`),
    {
      preparation: () => restoreMp(50),
    }
  ),

  new ActionSource(
    $skill`Emotionally Chipped`,
    () => (have($skill`Emotionally Chipped`) ? 3 - get("_feelHatredUsed") : 0),
    Macro.skill($skill`Feel Hatred`)
  ),

  new ActionSource(
    $item`Kremlin's Greatest Briefcase`,
    () =>
      have($item`Kremlin's Greatest Briefcase`)
        ? 3 - get("_kgbTranquilizerDartUses")
        : 0,
    Macro.skill($skill`KGB tranquilizer dart`),
    {
      equipmentRequirements: () =>
        new Requirement([], {
          forceEquip: $items`Kremlin's Greatest Briefcase`,
        }),
    }
  ),

  new ActionSource(
    $item`latte lovers member's mug`,
    () =>
      have($item`latte lovers member's mug`) && !get("_latteBanishUsed")
        ? 1
        : 0,
    Macro.skill($skill`Throw Latte on Opponent`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`latte lovers member's mug` }),
    }
  ),

  new ActionSource(
    $item`Lil' Doctor™ bag`,
    () => (have($item`Lil' Doctor™ bag`) ? 3 - get("_reflexHammerUsed") : 0),
    Macro.skill($skill`Reflex Hammer`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`Lil' Doctor™ bag` }),
    }
  ),

  new ActionSource(
    $item`mafia middle finger ring`,
    () =>
      have($item`mafia middle finger ring`) &&
      !get("_mafiaMiddleFingerRingUsed")
        ? 1
        : 0,
    Macro.skill($skill`Show them your ring`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`mafia middle finger ring` }),
    }
  ),

  new ActionSource(
    $item`V for Vivala mask`,
    () =>
      have($item`V for Vivala mask`) && !get("_vmaskBanisherUsed") ? 1 : 0,
    Macro.skill($skill`Creepy Grin`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`V for Vivala mask` }),
      preparation: () => restoreMp(30),
    }
  ),

  new ActionSource(
    $item`stinky cheese eye`,
    () =>
      getFoldGroup($item`stinky cheese eye`).some((item) => have(item)) &&
      !get("_stinkyCheeseBanisherUsed")
        ? 1
        : 0,

    Macro.skill($skill`Give Your Opponent the Stinkeye`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`stinky cheese eye` }),
      preparation: () => {
        if (!have($item`stinky cheese eye`)) {
          cliExecute(`fold stinky cheese eye`);
        }
        return have($item`stinky cheese eye`);
      },
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
    $skill`Show your boring familiar pictures`,
    () => {
      if (have($item`familiar scrapbook`)) {
        if (scrapbookChargesLastUpdated !== get("_lastCombatStarted")) {
          visitUrl("desc_item.php?whichitem=463063785");
          scrapbookChargesLastUpdated = get("_lastCombatStarted");
        }
        return Math.floor(get("scrapbookCharges") / 100);
      }
      return 0;
    },
    Macro.skill($skill`Show your boring familiar pictures`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`familiar scrapbook` }),
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

  new ActionSource(
    $item`human musk`,
    () => Math.max(0, 3 - get("_humanMuskUses")),
    Macro.item($item`human musk`),
    {
      preparation: () => retrieveItem($item`human musk`),
      cost: () => ActionSource.defaultPriceFunction($item`human musk`),
    }
  ),

  // Expensive unlimited sources
  ...$items`Louder Than Bomb, divine champagne popper, tennis ball`.map(
    (item) =>
      new ActionSource(item, () => Infinity, Macro.item(item), {
        preparation: () => retrieveItem(item),
        cost: () => ActionSource.defaultPriceFunction(item),
      })
  ),
];

/**
 * Find an available free run source subject to constraints.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints, or null.
 */
export function tryFindFreeRun(
  constraints?: FindActionSourceConstraints
): ActionSource | null {
  let source = findActionSource(freeRunSources, constraints);

  // Always try to use Asdon Martin: Spring-Loaded Front Bumper first,
  // but only if another source has been found.
  if (source && asdonMartinSource.available()) {
    source = asdonMartinSource.merge(source);
  }

  return source;
}

/**
 * Ensure an available free run source subject to constraints.
 * Throws an error if no source can be found.
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
