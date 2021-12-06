import {
  cliExecute,
  mallPrice,
  restoreMp,
  retrieveItem,
  visitUrl,
} from "kolmafia";

import { Macro } from "./combat";
import {
  ensureEffect,
  getFoldGroup,
  getSongCount,
  getSongLimit,
  have,
} from "./lib";
import { Requirement } from "./maximize";
import { get } from "./property";
import { Bandersnatch } from "./resources";
import { $effect, $familiar, $item, $items, $skill } from "./template-string";

export type AdventureOptions = {
  equipmentRequirements?: () => Requirement;
  preparation?: () => boolean;
  location?: () => Location;
  macro?: () => Macro;
  familiar?: () => Familiar;
  available?: () => boolean;
};

export type FreeRunOptions = {
  equipmentRequirements?: () => Requirement;
  preparation?: () => boolean;
  familiar?: () => Familiar;
};

export class FreeRun {
  name: string;
  available: () => boolean;
  macro: Macro;
  options?: FreeRunOptions;

  constructor(
    name: string,
    available: () => boolean,
    macro: Macro,
    options?: FreeRunOptions
  ) {
    this.name = name;
    this.available = available;
    this.macro = macro;
    this.options = options;
  }
}

const freeRuns: FreeRun[] = [
  new FreeRun(
    "Bander",
    () =>
      have($familiar`Frumious Bandersnatch`) &&
      (have($effect`Ode to Booze`) || getSongCount() < getSongLimit()) &&
      Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      preparation: () => {
        ensureEffect($effect`Ode to Booze`);
        return true;
      },
      familiar: () => $familiar`Frumious Bandersnatch`,
    }
  ),

  new FreeRun(
    "Boots",
    () =>
      have($familiar`Pair of Stomping Boots`) &&
      Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    {
      equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
      familiar: () => $familiar`Pair of Stomping Boots`,
    }
  ),

  new FreeRun(
    "Snokebomb",
    () => get("_snokebombUsed") < 3 && have($skill`Snokebomb`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Snokebomb`
    ),
    {
      preparation: () => restoreMp(50),
    }
  ),

  new FreeRun(
    "Hatred",
    () => get("_feelHatredUsed") < 3 && have($skill`Emotionally Chipped`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Feel Hatred`
    )
  ),

  new FreeRun(
    "KGB",
    () =>
      have($item`Kremlin's Greatest Briefcase`) &&
      get("_kgbTranquilizerDartUses") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`KGB tranquilizer dart`
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], {
          forceEquip: $items`Kremlin's Greatest Briefcase`,
        }),
    }
  ),

  new FreeRun(
    "Latte",
    () => have($item`latte lovers member's mug`) && !get("_latteBanishUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Throw Latte on Opponent"
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`latte lovers member's mug` }),
    }
  ),

  new FreeRun(
    "Docbag",
    () => have($item`Lil' Doctor™ bag`) && get("_reflexHammerUsed") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Reflex Hammer`
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`Lil' Doctor™ bag` }),
    }
  ),

  new FreeRun(
    "Middle Finger",
    () =>
      have($item`mafia middle finger ring`) &&
      !get("_mafiaMiddleFingerRingUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Show them your ring`
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`mafia middle finger ring` }),
    }
  ),

  new FreeRun(
    "VMask",
    () => have($item`V for Vivala mask`) && !get("_vmaskBanisherUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Creepy Grin`
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`V for Vivala mask` }),
      preparation: () => restoreMp(30),
    }
  ),

  new FreeRun(
    "Stinkeye",
    () =>
      getFoldGroup($item`stinky cheese diaper`).some((item) => have(item)) &&
      !get("_stinkyCheeseBanisherUsed"),

    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Give Your Opponent the Stinkeye"
    ),
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

  new FreeRun(
    "Navel Ring",
    () => have($item`navel ring of navel gazing`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`navel ring of navel gazing` }),
    }
  ),

  new FreeRun(
    "GAP",
    () => have($item`Greatest American Pants`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step(
      "runaway"
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`Greatest American Pants` }),
    }
  ),

  new FreeRun(
    "Scrapbook",
    () => {
      visitUrl("desc_item.php?whichitem=463063785");
      return have($item`familiar scrapbook`) && get("scrapbookCharges") >= 100;
    },
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Show Your Boring Familiar Pictures"
    ),
    {
      equipmentRequirements: () =>
        new Requirement([], { forceEquip: $items`familiar scrapbook` }),
    }
  ),

  new FreeRun(
    "Parasol",
    () =>
      have($item`peppermint parasol`) &&
      get("parasolUsed") < 9 &&
      get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(
      $item`peppermint parasol`
    )
  ),
];

function cheapestRunSource() {
  return $items`Louder Than Bomb, divine champagne popper, tennis ball`.sort(
    (a, b) => mallPrice(a) - mallPrice(b)
  )[0];
}

function cheapestItemRun() {
  const cheapestRun = cheapestRunSource();
  return new FreeRun(
    "Cheap Combat Item",
    () => retrieveItem(cheapestRun),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(
      cheapestRun
    ),
    {
      preparation: () => retrieveItem(cheapestRun),
    }
  );
}

export function tryFindFreeRun(useFamiliar = true): FreeRun | null {
  return (
    freeRuns.find(
      (run) => run.available() && (useFamiliar || run?.options?.familiar)
    ) ?? null
  );
}

export function ensureFreeRun(useFamiliar = true): FreeRun {
  return tryFindFreeRun(useFamiliar) ?? cheapestItemRun();
}
