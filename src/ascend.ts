import {
  containsText,
  eudoraItem,
  getCampground,
  getWorkshed,
  print,
  toInt,
  use,
  visitUrl,
  xpath,
} from "kolmafia";
import { $item, $items, $stat } from "./template-string";
import { get } from "./property";
import { Path } from "./Path";
import { ChateauMantegna } from "./resources";
import { have } from "./lib";

export enum Lifestyle {
  casual = 1,
  softcore = 2,
  normal = 2,
  hardcore = 3,
}

function toMoonId(moon: string | number, playerClass: Class): number {
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
        throw `unknown prime stat for ${playerClass}`;
    }
  };

  switch ((moon as string).toLowerCase()) {
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
  moon: string | number,
  consumable: Item | undefined = $item`astral six-pack`,
  pet: Item | undefined = undefined
): void {
  if (!containsText(visitUrl("charpane.php"), "Astral Spirit")) {
    print(
      "It'd really be better if you were already through the gash. Oh well!",
      "blue"
    );
    visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
  }
  if (!containsText(visitUrl("charpane.php"), "Astral Spirit"))
    throw "Failed to ascend.";
  if (!path.classes.includes(playerClass))
    throw `Invalid class ${playerClass} for this path`;
  if (path.id < 0) throw `Invalid path ID ${path.id}`;
  const moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw `Invalid moon ${moon}`;
  if (
    consumable &&
    !$items`astral six-pack, astral hot dog dinner`.includes(consumable)
  )
    throw `Invalid consumable ${consumable}`;
  if (
    pet &&
    !$items`astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt`.includes(
      pet
    )
  )
    throw `Invalid astral item ${pet}`;

  visitUrl("afterlife.php?action=pearlygates");

  if (consumable)
    visitUrl(`afterlife.php?action=buydeli&whichitem=${toInt(consumable)}`);
  if (pet) visitUrl(`afterlife.php?action=buyarmory&whichitem=${toInt(pet)}`);

  visitUrl(
    `afterlife.php?action=ascend&confirmascend=1&whichsign=${moonId}&gender=2&whichclass=${toInt(
      playerClass
    )}&whichpath=${
      path.id
    }&asctype=${lifestyle}&nopetok=1&noskillsok=1&lamepathok=1&pwd`,
    true
  );
}

const worksheds = $items`warbear LP-ROM burner, warbear jackhammer drill press, warbear induction oven, warbear high-efficiency still, warbear chemistry lab, warbear auto-anvil, spinning wheel, snow machine, Little Geneticist DNA-Splicing Lab, portable Mayo Clinic, Asdon Martin keyfob, diabolic pizza cube`;
const gardens = $items`packet of pumpkin seeds, Peppermint Pip Packet, packet of dragon's teeth, packet of beer seeds, packet of winter seeds, packet of thanksgarden seeds, packet of tall grass seeds, packet of mushroom spores`;
// eslint-disable-next-line libram/verify-constants
const eudorae = $items`My Own Pen Pal kit, GameInformPowerDailyPro subscription card, Xi Receiver Unit, New-You Club Membership Form, Our Daily Candles™ order form`;

const desks = $items`fancy stationery set, Swiss piggy bank, continental juice bar`;
const ceilings = $items`antler chandelier, ceiling fan, artificial skylight`;
const nightstands = $items`foreign language tapes, bowl of potpourri, electric muscle stimulator`;

/**
 * Sets up various iotms you may want to use in the coming ascension
 * @param ascensionItems An object potentially containing your workshed, garden, and eudora, all as items
 * @param chateauItems An object potentially containing your chateau desk, ceiling, and nightstand, all as items
 * @param throwOnFail If true, this will throw an error when it fails to switch something
 */
export function prepareAscension(
  ascensionItems?: {
    workshed?: Item;
    garden?: Item;
    eudora?: Item;
  },
  chateauItems?: {
    desk?: Item;
    ceiling?: Item;
    nightstand?: Item;
  },
  throwOnFail = true
): void {
  if (ascensionItems) {
    if (ascensionItems.workshed && getWorkshed() !== ascensionItems.workshed) {
      if (!worksheds.includes(ascensionItems.workshed) && throwOnFail)
        throw `Invalid workshed: ${ascensionItems.workshed}!`;
      else if (!have(ascensionItems.workshed) && throwOnFail)
        throw `I'm sorry buddy, but you don't seem to own a ${ascensionItems.workshed}. Which makes it REALLY hard for us to plop one into your workshed.`;
      else if (get("_workshedItemUsed") && throwOnFail)
        throw `Seems like you've already swapped your workshed, buddy.`;
      else use(ascensionItems.workshed);
      if (getWorkshed() !== ascensionItems.workshed && throwOnFail)
        throw `We really thought we changed your workshed to a ${ascensionItems.workshed}, but Mafia is saying otherwise.`;
    }

    if (
      ascensionItems.garden &&
      !Object.getOwnPropertyNames(getCampground()).includes(
        ascensionItems.garden.name
      )
    ) {
      if (!gardens.includes(ascensionItems.garden) && throwOnFail)
        throw `Invalid garden: ${ascensionItems.garden}!`;
      else if (!have(ascensionItems.garden) && throwOnFail)
        throw `I'm sorry buddy, but you don't seem to own a ${ascensionItems.garden}. Which makes it REALLY hard for us to plant one into your garden.`;
      else use(ascensionItems.garden);
      if (
        !Object.getOwnPropertyNames(getCampground()).includes(
          ascensionItems.garden.name
        ) &&
        throwOnFail
      )
        throw `We really thought we changed your garden to a ${ascensionItems.garden}, but Mafia is saying otherwise.`;
    }

    if (ascensionItems.eudora && eudoraItem() !== ascensionItems.eudora) {
      if (!eudorae.includes(ascensionItems.eudora) && throwOnFail)
        throw `Invalid eudora: ${ascensionItems.eudora}!`;
      const eudoraNumber = 1 + eudorae.indexOf(ascensionItems.eudora);
      if (
        !xpath(
          visitUrl("account.php?tab=correspondence"),
          `//select[@name="whichpenpal"]/option/@value`
        ).includes(eudoraNumber.toString()) &&
        throwOnFail
      )
        throw `I'm sorry buddy, but you don't seem to be subscribed to ${ascensionItems.eudora}. Which makes it REALLY hard to correspond with them.`;
      else
        visitUrl(
          `account.php?actions[]=whichpenpal&whichpenpal=${eudoraNumber}&action=Update`,
          true
        );
      if (eudoraItem() !== ascensionItems.eudora && throwOnFail)
        throw `We really thought we chaned your eudora to a ${ascensionItems.eudora}, but Mafia is saying otherwise.`;
    }
  }
  if (chateauItems && ChateauMantegna.have()) {
    if (
      chateauItems.ceiling &&
      ChateauMantegna.getCeiling() !== chateauItems.ceiling
    ) {
      if (!ceilings.includes(chateauItems.ceiling) && throwOnFail)
        throw `Invalid chateau ceiling: ${chateauItems.ceiling}!`;
      else if (
        !ChateauMantegna.changeCeiling(chateauItems.ceiling) &&
        throwOnFail
      )
        throw `We tried, but were unable to change your chateau ceiling to ${chateauItems.ceiling}. Probably.`;
    }

    if (chateauItems.desk && ChateauMantegna.getDesk() !== chateauItems.desk) {
      if (!desks.includes(chateauItems.desk) && throwOnFail)
        throw `Invalid chateau desk: ${chateauItems.desk}!`;
      else if (!ChateauMantegna.changeDesk(chateauItems.desk) && throwOnFail)
        throw `We tried, but were unable to change your chateau desk to ${chateauItems.desk}. Probably.`;
    }

    if (
      chateauItems.nightstand &&
      ChateauMantegna.getNightstand() !== chateauItems.nightstand
    ) {
      if (!nightstands.includes(chateauItems.nightstand) && throwOnFail)
        throw `Invalid chateau nightstand: ${chateauItems.nightstand}!`;
      else if (
        !ChateauMantegna.changeNightstand(chateauItems.nightstand) &&
        throwOnFail
      )
        throw `We tried, but were unable to change your chateau nightstand to ${chateauItems.nightstand}. Probably.`;
    }
  }
}
