import {
  cliExecute,
  mallPrice,
  myTurncount,
  restoreMp,
  retrieveItem,
  visitUrl,
} from "kolmafia";
import { AsdonMartin } from "..";

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
import { Bandersnatch } from "../resources";
import { $effect, $familiar, $item, $items, $skill } from "../template-string";
import {
  ActionSource,
  findActionSource,
  FindActionSourceOptions,
} from "./action";

export type AdventureOptions = {
  equipmentRequirements?: () => Requirement;
  preparation?: () => boolean;
  location?: () => Location;
  macro?: () => Macro;
  familiar?: () => Familiar;
  available?: () => boolean;
};

// Free unlimited source every 30 turns
// Does not work on special monsters so needs a backup, see tryFindFreeRun
const asdonMartinSource: ActionSource = new ActionSource(
  $skill`Asdon Martin: Spring-Loaded Front Bumper`,
  () => {
    if (!AsdonMartin.have()) return 0;
    const banishes = get("banishedMonsters").split(":");
    const bumperIndex = banishes
      .map((string) => string.toLowerCase())
      .indexOf("spring-loaded front bumper");
    if (bumperIndex === -1) return 1;
    return myTurncount() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
  },
  Macro.skill($skill`Asdon Martin: Spring-Loaded Front Bumper`),
  {
    preparation: () => AsdonMartin.fillTo(50),
  }
);

const freeRunSources: ActionSource[] = [
  // Free limited sources
  new ActionSource(
    $familiar`Frumious Bandersnatch`,
    () =>
      have($familiar`Frumious Bandersnatch`) &&
      (have($effect`Ode to Booze`) || getSongCount() < getSongLimit()) &&
      Bandersnatch.getRemainingRunaways() > 0
        ? 0
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
      have($familiar`Pair of Stomping Boots`) &&
      Bandersnatch.getRemainingRunaways() > 0
        ? 0
        : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      familiar: () => $familiar`Pair of Stomping Boots`,
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
    $item`stinky cheese diaper`,
    () =>
      getFoldGroup($item`stinky cheese diaper`).some((item) => have(item)) &&
      !get("_stinkyCheeseBanisherUsed")
        ? 1
        : 0,

    Macro.skill($skill`Give Your Opponent the Stinkeye`),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`stinky cheese eye` }),
      preparation: () => {
        if (!have($item`stinky cheese eye`))
          cliExecute(`fold stinky cheese eye`);
        return have($item`stinky cheese eye`);
      },
    }
  ),

  new ActionSource(
    $item`navel ring of navel gazing`,
    () =>
      have($item`navel ring of navel gazing`) ? 3 - get("_navelRunaways") : 0,
    Macro.step("runaway"),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`navel ring of navel gazing` }),
    }
  ),

  new ActionSource(
    $item`Greatest American Pants`,
    () =>
      have($item`Greatest American Pants`) ? 3 - get("_navelRunaways") : 0,
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
        visitUrl("desc_item.php?whichitem=463063785");
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
    () => 3 - get("_navelRunaways"),
    Macro.item($item`peppermint parasol`),
    {
      preparation: () => retrieveItem($item`peppermint parasol`),
      cost: () => (mallPrice($item`peppermint sprout`) * 5) / 10, // Breaks after 10 uses
    }
  ),

  // Expensive unlimited sources
  ...$items`Louder Than Bomb, divine champagne popper, tennis ball`.map(
    (item) =>
      new ActionSource(item, () => -1, Macro.item(item), {
        preparation: () => retrieveItem(item),
        cost: () => mallPrice(item),
      })
  ),
];

export function tryFindFreeRun(
  options?: FindActionSourceOptions
): ActionSource | null {
  let source = findActionSource(freeRunSources, options);

  // Always try to use Asdon Martin: Spring-Loaded Front Bumper first
  // but only if another source has been found
  if (source && asdonMartinSource.available()) {
    source = asdonMartinSource.merge(source);
  }

  return source;
}

export function ensureFreeRun(options?: FindActionSourceOptions): ActionSource {
  // Try to respect the options first, then fallback to no options
  const source = tryFindFreeRun(options) ?? tryFindFreeRun();

  if (!source) {
    throw new Error("Failed to ensure Free Run source");
  }

  return source;
}
