import {
  Skill,
  Class,
  eudoraItem,
  getCampground,
  Item,
  Path,
  toInt,
  use,
  visitUrl,
  xpath,
  haveSkill,
  MafiaClass,
  getPermedSkills,
  toSkill,
} from "kolmafia";
import { get } from "./property";
import { ChateauMantegna } from "./resources";
import { $item, $items, $stat } from "./template-string";
import { arrayContains } from "./utils";

export enum Lifestyle {
  casual = 1,
  softcore = 2,
  normal = 2,
  hardcore = 3,
}

/**
 *
 */
export function permedSkills(): Map<Skill, Lifestyle> {
  return new Map(
    Array.from(Object.entries(getPermedSkills())).map(
      ([skillName, isHardcore]) => [
        toSkill(skillName),
        isHardcore ? Lifestyle.hardcore : Lifestyle.softcore,
      ]
    )
  );
}

export class AscendError extends Error {
  cause?: Skill | Item | Class | Path | string;
  constructor(cause?: Skill | Item | Class | Path | string) {
    if (!cause) {
      super("Failed to ascend--do you have a pending trade offer?");
    } else if (cause instanceof Skill) {
      const reason = cause.permable
        ? haveSkill(cause)
          ? "too karmaically expensive"
          : "not a skill you currently know"
        : "unpermable";
      super(`Skill ${cause} is ${reason}!`);
    } else if (cause instanceof Item) {
      super(`Invalid astral item: ${cause}!`);
    } else if (cause instanceof Class) {
      super(`Invalid class ${cause} for this path!`);
    } else if (cause instanceof Path) {
      super(`Invalid path ${cause}!`);
    } else super(cause);
    this.cause = cause;
  }
}

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

const isGarden = (x: string) => arrayContains(x, gardens);
const isEudora = (x: string) => arrayContains(x, eudorae);
const isDesk = (x: string) => arrayContains(x, ChateauMantegna.desks);
const isNightstand = (x: string) =>
  arrayContains(x, ChateauMantegna.nightstands);
const isCeiling = (x: string) => arrayContains(x, ChateauMantegna.ceilings);

export class AscensionPrepError extends Error {
  cause: string;
  constructor(cause: string, original?: MafiaClass | string) {
    if (isGarden(cause)) {
      super(
        `Unable to swap garden to ${cause}; garden is currently ${original}.`
      );
    } else if (isEudora(cause)) {
      super(
        `Unable to swap eudora to ${cause}; eudora is currently ${original}.`
      );
    } else if (isDesk(cause)) {
      super(
        `Unable to swap chateau desk to ${cause}; desk is currently ${original}.`
      );
    } else if (isNightstand(cause)) {
      super(
        `Unable to swap chateau nightstand to ${cause}; nightstand is currently ${original}.`
      );
    } else if (isCeiling(cause)) {
      super(
        `Unable to swap chateau ceiling to ${cause}; ceiling is currently ${original}.`
      );
    } else super(cause);
    this.cause = cause;
  }
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

/**
 *
 * @param moon
 * @param playerClass
 */
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
        throw new AscendError(`unknown prime stat for ${playerClass}`);
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
      throw new AscendError("Invalid moon sign!");
  }
}

/**
 *
 */
function isInValhalla(): boolean {
  const charPaneText = visitUrl("charpane.php");
  // Match the infinity images (inf_small.gif, inf_large.gif)
  // At time of writing, the full img tag used is:
  // <img src="https://d2uyhvukfffg5a.cloudfront.net/otherimages/inf_small.gif">
  const matches = charPaneText.match(
    /<img src="[^"]*\/otherimages\/inf_\w+\.gif">/
  );
  return matches !== null;
}

/**
 * Hops the gash, perming no skills
 *
 * @param path path of choice, as a Path object--these exist as properties of Paths
 * @param playerClass Your class of choice for this ascension
 * @param lifestyle 1 for casual, 2 for softcore, 3 for hardcore. Alternately, use the Lifestyle enum
 * @param moon Your moon sign as a string, or the zone you're looking for as a string
 * @param consumable From the astral deli. Pick the container item, not the product.
 * @param pet From the astral pet store.
 * @param permSkills A Map<Skill, Lifestyle> of skills you'd like to perm, ordered by priority.
 */

/**
 *
 * @param path
 * @param playerClass
 * @param lifestyle
 * @param moon
 * @param consumable
 * @param pet
 * @param permOptions
 * @param permOptions.permSkills
 * @param permOptions.neverAbort
 */
export function ascend(
  path: Path,
  playerClass: Class,
  lifestyle: Lifestyle,
  moon: MoonSign,
  consumable: Item | undefined = $item`astral six-pack`,
  pet: Item | undefined = undefined,
  permOptions?: { permSkills: Map<Skill, Lifestyle>; neverAbort: boolean }
): void {
  if (playerClass.path !== (path.avatar ? path : Path.none)) {
    throw new AscendError(playerClass);
  }
  if (path.id < 0) throw new AscendError(path);

  const moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error(`Invalid moon ${moon}`);
  if (
    consumable &&
    !$items`astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks`.includes(
      consumable
    )
  ) {
    throw new AscendError(consumable);
  }

  if (
    pet &&
    !$items`astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt`.includes(
      pet
    )
  ) {
    throw new AscendError(pet);
  }

  const illegalSkill = permOptions
    ? Array.from(permOptions.permSkills.keys()).find(
        (skill) => !skill.permable || !haveSkill(skill)
      )
    : undefined;
  if (illegalSkill) {
    throw new AscendError(illegalSkill);
  }

  if (!isInValhalla()) {
    visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
  }
  if (!isInValhalla()) {
    throw new AscendError();
  }

  visitUrl("afterlife.php?action=pearlygates");

  if (consumable) {
    visitUrl(`afterlife.php?action=buydeli&whichitem=${toInt(consumable)}`);
  }

  if (pet) visitUrl(`afterlife.php?action=buyarmory&whichitem=${toInt(pet)}`);

  if (permOptions) {
    const currentPerms = permedSkills();
    let karma = get("bankedKarma");
    for (const [
      skill,
      prospectivePermLevel,
    ] of permOptions.permSkills.entries()) {
      const currentPermLevel = currentPerms.get(skill) ?? Lifestyle.casual;
      if (prospectivePermLevel > currentPermLevel) {
        const expectedKarma = 100 * (prospectivePermLevel - currentPermLevel);
        if (karma < expectedKarma) {
          if (!permOptions.neverAbort) throw new AscendError(skill);
          continue;
        }
        karma -= expectedKarma;
        const permText =
          prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
        visitUrl(`afterlife.php?action=${permText}&whichskill=${toInt(skill)}`);
      }
    }
  }

  visitUrl(
    `afterlife.php?action=ascend&confirmascend=1&whichsign=${moonId}&gender=2&whichclass=${toInt(
      playerClass
    )}&whichpath=${
      path.id
    }&asctype=${lifestyle}&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd`,
    true
  );
}

/**
 * Sets up various iotms you may want to use in the coming ascension
 *
 * @param ascensionItems.garden Garden to switch to.
 * @param ascensionItems An object potentially containing your workshed, garden, chateau, and eudora, all as strings
 * @param throwOnFail If true, this will throw an error when it fails to switch something
 * @param ascensionItems.eudora
 * @param ascensionItems.chateau
 * @param ascensionItems.chateau.desk
 * @param ascensionItems.chateau.ceiling
 * @param ascensionItems.chateau.nightstand
 * @param ascensionItems.throwOnFail
 */
export function prepareAscension({
  garden,
  eudora,
  chateau,
  throwOnFail,
}: {
  garden?: Garden;
  eudora?: Eudora;
  chateau?: {
    desk?: ChateauMantegna.Desk;
    ceiling?: ChateauMantegna.Ceiling;
    nightstand?: ChateauMantegna.Nightstand;
  };
  throwOnFail?: boolean;
} = {}): void {
  throwOnFail = throwOnFail ?? true;
  if (garden && !Object.getOwnPropertyNames(getCampground()).includes(garden)) {
    use(Item.get(garden));
    const gardenName = Object.getOwnPropertyNames(getCampground()).find(
      isGarden
    );
    if (gardenName !== garden && throwOnFail) {
      throw new AscensionPrepError(garden, gardenName);
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
      throw new AscensionPrepError(
        `Unable to swap eudora to ${eudora} because you are not subscribed to it.`
      );
    } else {
      visitUrl(
        `account.php?actions[]=whichpenpal&whichpenpal=${eudoraNumber}&action=Update`,
        true
      );
    }

    if (eudoraItem() !== Item.get(eudora) && throwOnFail) {
      throw new AscensionPrepError(eudora, eudoraItem());
    }
  }

  if (chateau && ChateauMantegna.have()) {
    const { desk, ceiling, nightstand } = chateau;
    if (ceiling && ChateauMantegna.getCeiling() !== ceiling) {
      if (!ChateauMantegna.changeCeiling(ceiling) && throwOnFail) {
        throw new AscensionPrepError(
          ceiling,
          ChateauMantegna.getCeiling() ?? "unknown"
        );
      }
    }

    if (desk && ChateauMantegna.getDesk() !== desk) {
      if (!ChateauMantegna.changeDesk(desk) && throwOnFail) {
        throw new AscensionPrepError(
          desk,
          ChateauMantegna.getDesk() ?? "unknown"
        );
      }
    }

    if (nightstand && ChateauMantegna.getNightstand() !== nightstand) {
      if (!ChateauMantegna.changeNightstand(nightstand) && throwOnFail) {
        throw new AscensionPrepError(
          nightstand,
          ChateauMantegna.getNightstand() ?? "unknown"
        );
      }
    }
  }
}
