import {
  Class,
  containsText,
  eudoraItem,
  getCampground,
  getWorkshed,
  Item,
  toInt,
  use,
  visitUrl,
  xpath,
} from "kolmafia";
import { Path } from "./Path";
import { ChateauMantegna } from "./resources";
import { Ceiling, Desk, Nightstand } from "./resources/2015/ChateauMantegna";
import { $item, $items, $stat } from "./template-string";

export enum Lifestyle {
  casual = 1,
  softcore = 2,
  normal = 2,
  hardcore = 3,
}

type MoonSign =
  | number
  | "mongoose"
  | "wallaby"
  | "vole"
  | "platypus"
  | "opossum"
  | "marmot"
  | "wombat"
  | "blender"
  | "packrat"
  | "degrassi"
  | "degrassi knoll"
  | "friendly degrassi knoll"
  | "knoll"
  | "canada"
  | "canadia"
  | "little canadia"
  | "gnomads"
  | "gnomish"
  | "gnomish gnomads camp";

function toMoonId(moon: MoonSign, playerClass: Class): number {
  if (typeof moon === "number") return moon;

  const offset = (): number => {
    switch (playerClass.primestat) {
      case $stat`Muscle`:
        return 0;
      case $stat`Mysticality`:
        return 1;
      case $stat`Moxie`:
        return 2;
      default:
        throw new Error(`unknown prime stat for ${playerClass}`);
    }
  };

  switch (moon.toLowerCase()) {
    case "mongoose":
      return 1;
    case "wallaby":
      return 2;
    case "vole":
      return 3;
    case "platypus":
      return 4;
    case "opossum":
      return 5;
    case "marmot":
      return 6;
    case "wombat":
      return 7;
    case "blender":
      return 8;
    case "packrat":
      return 9;
    case "degrassi":
    case "degrassi knoll":
    case "friendly degrassi knoll":
    case "knoll":
      return 1 + offset();
    case "canada":
    case "canadia":
    case "little canadia":
      return 4 + offset();
    case "gnomads":
    case "gnomish":
    case "gnomish gnomads camp":
      return 7 + offset();
    default:
      return -1;
  }
}

/**
 * Hops the gash, perming no skills
 * @param path path of choice, as a Path object--these exist as properties of Paths
 * @param playerClass Your class of choice for this ascension
 * @param lifestyle 1 for casual, 2 for softcore, 3 for hardcore. Alternately, use the Lifestyle enum
 * @param moon Your moon sign as a string, or the zone you're looking for as a string
 * @param consumable From the astral deli. Pick the container item, not the product.
 * @param pet From the astral pet store.
 */

export function ascend(
  path: Path,
  playerClass: Class,
  lifestyle: Lifestyle,
  moon: MoonSign,
  consumable: Item | undefined = $item`astral six-pack`,
  pet: Item | undefined = undefined
): void {
  if (!containsText(visitUrl("charpane.php"), "Astral Spirit")) {
    visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
  }
  if (!containsText(visitUrl("charpane.php"), "Astral Spirit")) {
    throw new Error("Failed to ascend.");
  }
  if (!path.classes.includes(playerClass)) {
    throw new Error(`Invalid class ${playerClass} for this path`);
  }
  if (path.id < 0) throw new Error(`Invalid path ID ${path.id}`);

  const moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error(`Invalid moon ${moon}`);
  if (
    consumable &&
    !$items`astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks`.includes(
      consumable
    )
  ) {
    throw new Error(`Invalid consumable ${consumable}`);
  }

  if (
    pet &&
    !$items`astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt`.includes(
      pet
    )
  ) {
    throw new Error(`Invalid astral item ${pet}`);
  }

  visitUrl("afterlife.php?action=pearlygates");

  if (consumable) {
    visitUrl(`afterlife.php?action=buydeli&whichitem=${toInt(consumable)}`);
  }
  if (pet) visitUrl(`afterlife.php?action=buyarmory&whichitem=${toInt(pet)}`);

  visitUrl(
    `afterlife.php?action=ascend&confirmascend=1&whichsign=${moonId}&gender=2&whichclass=${toInt(
      playerClass
    )}&whichpath=${
      path.id
    }&asctype=${lifestyle}&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd`,
    true
  );
}

const worksheds = [
  "warbear LP-ROM burner",
  "warbear jackhammer drill press",
  "warbear induction oven",
  "warbear high-efficiency still",
  "warbear chemistry lab",
  "warbear auto-anvil",
  "spinning wheel",
  "snow machine",
  "Little Geneticist DNA-Splicing Lab",
  "portable Mayo Clinic",
  "Asdon Martin keyfob",
  "diabolic pizza cube",
  "cold medicine cabinet",
] as const;
type Workshed = typeof worksheds[number];

const gardens = [
  "packet of pumpkin seeds",
  "Peppermint Pip Packet",
  "packet of dragon's teeth",
  "packet of beer seeds",
  "packet of winter seeds",
  "packet of thanksgarden seeds",
  "packet of tall grass seeds",
  "packet of mushroom spores",
] as const;
type Garden = typeof gardens[number];

const eudorae = [
  "My Own Pen Pal kit",
  "GameInformPowerDailyPro subscription card",
  "Xi Receiver Unit",
  "New-You Club Membership Form",
  "Our Daily Candles™ order form",
] as const;
type Eudora = typeof eudorae[number];

/**
 * Sets up various iotms you may want to use in the coming ascension
 * @param ascensionItems.workshed Workshed to switch to.
 * @param ascensionItems.garden Garden to switch to.
 * @param ascensionItems An object potentially containing your workshed, garden, chateau, and eudora, all as strings
 * @param throwOnFail If true, this will throw an error when it fails to switch something
 */
export function prepareAscension({
  workshed,
  garden,
  eudora,
  chateau,
  throwOnFail,
}: {
  workshed?: Workshed;
  garden?: Garden;
  eudora?: Eudora;
  chateau?: {
    desk?: Desk;
    ceiling?: Ceiling;
    nightstand?: Nightstand;
  };
  throwOnFail?: boolean;
} = {}): void {
  throwOnFail = throwOnFail ?? true;
  if (workshed && getWorkshed() !== Item.get(workshed)) {
    use(Item.get(workshed));
    if (getWorkshed().name !== workshed && throwOnFail) {
      throw new Error(
        `Failed to switch workshed to ${workshed}; it is currently still ${getWorkshed()}.`
      );
    }
  }

  if (garden && !Object.getOwnPropertyNames(getCampground()).includes(garden)) {
    use(Item.get(garden));

    if (
      !Object.getOwnPropertyNames(getCampground()).includes(garden) &&
      throwOnFail
    ) {
      throw new Error(
        `We really thought we changed your garden to a ${garden}, but Mafia is saying otherwise.`
      );
    }
  }

  if (eudora && eudoraItem().name !== eudora) {
    const eudoraNumber = 1 + eudorae.indexOf(eudora);
    if (
      !xpath(
        visitUrl("account.php?tab=correspondence"),
        `//select[@name="whichpenpal"]/option/@value`
      ).includes(eudoraNumber.toString()) &&
      throwOnFail
    ) {
      throw new Error(
        `I'm sorry buddy, but you don't seem to be subscribed to ${eudora}. Which makes it REALLY hard to correspond with them.`
      );
    } else {
      visitUrl(
        `account.php?actions[]=whichpenpal&whichpenpal=${eudoraNumber}&action=Update`,
        true
      );
    }

    if (eudoraItem() !== Item.get(eudora) && throwOnFail) {
      throw new Error(
        `We really thought we changed your eudora to a ${eudora}, but Mafia is saying otherwise.`
      );
    }
  }

  if (chateau && ChateauMantegna.have()) {
    const { desk, ceiling, nightstand } = chateau;
    if (ceiling && ChateauMantegna.getCeiling() !== ceiling) {
      if (!ChateauMantegna.changeCeiling(ceiling) && throwOnFail) {
        throw new Error(
          `We tried, but were unable to change your chateau ceiling to ${ceiling}. Probably.`
        );
      }
    }

    if (desk && ChateauMantegna.getDesk() !== desk) {
      if (!ChateauMantegna.changeDesk(desk) && throwOnFail) {
        throw new Error(
          `We tried, but were unable to change your chateau desk to ${desk}. Probably.`
        );
      }
    }

    if (nightstand && ChateauMantegna.getNightstand() !== nightstand) {
      if (!ChateauMantegna.changeNightstand(nightstand) && throwOnFail) {
        throw new Error(
          `We tried, but were unable to change your chateau nightstand to ${nightstand}. Probably.`
        );
      }
    }
  }
}
