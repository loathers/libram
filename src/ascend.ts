import {
  Skill,
  Class,
  eudoraItem,
  getCampground,
  Item,
  Path,
  use,
  visitUrl,
  xpath,
  haveSkill,
  MafiaClass,
  getPermedSkills,
  toSkill,
} from "kolmafia";
import { MoonSign, signNameToId } from "./moonSign";
import { get } from "./property";
import { ChateauMantegna } from "./resources";
import { $item, $items, $stat } from "./template-string";
import { arrayContains, tc } from "./utils";

export enum Lifestyle {
  casual = 1,
  softcore = 2,
  normal = 2,
  hardcore = 3,
}

export enum KolGender {
  male = 1,
  female = 2,
}

/**
 * Get a mapping of permed skills to the extent to which they're permed.
 *
 * If a skill is not permed at all, it will not appear in the mapping.
 *
 * @returns Permed skills mapping
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

export class AscendError extends Error {}

const gardens = [
  "packet of pumpkin seeds",
  "Peppermint Pip Packet",
  "packet of dragon's teeth",
  "packet of beer seeds",
  "packet of winter seeds",
  "packet of thanksgarden seeds",
  "packet of tall grass seeds",
  "packet of mushroom spores",
  "packet of rock seeds",
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

type InputMoonSign =
  | number
  | Lowercase<MoonSign>
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
 * Determine the id of the appropriate moon sign.
 *
 * @param moon Either a moon sign or the desired unlocked zone name
 * @param playerClass Class, required for working out a moon sign based on the desired zone
 * @returns Moon sign id
 */
function inputToMoonId(moon: InputMoonSign, playerClass: Class): number {
  if (typeof moon === "number") return moon;

  const offset = () => {
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

  const fromNormalInput = signNameToId(tc(moon) as MoonSign);
  if (fromNormalInput > 0) return fromNormalInput;

  switch (moon.toLowerCase()) {
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
 * Determine if player is currently in Valhalla
 *
 * @returns Whether player is in Valhalla
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
 * Hops the gash, perming no skills by default
 *
 * @param options Configuration for the ascension
 * @param options.path Your path of choice for this ascension
 * @param options.playerClass Your class of choice for this ascension
 * @param options.lifestyle 1 for casual, 2 for softcore, 3 for hardcore. Alternately, use the Lifestyle enum
 * @param options.kolGender An entry from the KolGender enum: 1 for male, 2 for female (sorry that it's limited to those). Defaults to 2 or the corresponding value for defaultGenderOverride pref (which should be 'male' or 'female')
 * @param options.moon Your moon sign as a string, or the zone you're looking for as a string
 * @param options.consumable From the astral deli. Pick the container item, not the product. Defaults to astral six-pack, provide $item`none` for nothing.
 * @param options.pet From the astral pet store.
 * @param options.permOptions Options for perming during a player's stay in Valhalla
 * @param options.permOptions.permSkills A Map<Skill, Lifestyle> of skills you'd like to perm, ordered by priority.
 * @param options.permOptions.neverAbort Whether the ascension should abort on failure
 */
export function ascend(options: {
  path: Path;
  playerClass: Class;
  lifestyle: Lifestyle;
  kolGender?: KolGender;
  moon: InputMoonSign;
  consumable?: Item;
  pet?: Item;
  permOptions?: { permSkills: Map<Skill, Lifestyle>; neverAbort: boolean };
}): void {
  const DEFAULT_OPTIONS = {
    kolGender:
      get("defaultGenderOverride", "female") === "male"
        ? KolGender.male
        : KolGender.female,
    consumable: $item`astral six-pack`,
    pet: $item`none`,
  };
  const prunedOptions = Object.fromEntries(
    Object.entries(options).filter(([, value]) => value)
  ) as typeof options;
  const {
    path,
    playerClass,
    lifestyle,
    kolGender,
    moon,
    consumable,
    pet,
    permOptions,
  } = { ...DEFAULT_OPTIONS, ...prunedOptions };

  if (playerClass.path !== (path.avatar ? path : Path.none)) {
    throw new AscendError(`Invalid class ${playerClass} for this path!`);
  }
  if (path.id < 0) throw new AscendError(`Invalid path: ${path}!`);

  const moonId = inputToMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error(`Invalid moon ${moon}`);

  if (
    !$items`none, astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks`.includes(
      consumable
    )
  ) {
    throw new AscendError(`Invalid astral consumable: ${consumable}`);
  }

  if (
    !$items`none, astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt`.includes(
      pet
    )
  ) {
    throw new AscendError(`Invalid astral pet: ${pet}`);
  }

  const unownedSkills = [...(permOptions?.permSkills.keys() ?? [])].filter(
    (skill) => !haveSkill(skill)
  );
  if (unownedSkills.length) {
    throw new AscendError(
      `You're trying to perm the following skills, but don't actually have them: ${unownedSkills.join(
        ", "
      )}`
    );
  }

  const unpermableSkills = [...(permOptions?.permSkills.keys() ?? [])].filter(
    (skill) => !skill.permable
  );
  if (unpermableSkills.length) {
    throw new AscendError(
      `You're trying to perm the following skills, but they're unpermable: ${unownedSkills.join(
        ", "
      )}`
    );
  }

  if (!isInValhalla()) {
    visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
  }
  if (!isInValhalla()) {
    throw new AscendError(
      "Failed to ascend--do you have a pending trade offer?"
    );
  }

  visitUrl("afterlife.php?action=pearlygates");

  if (consumable !== $item`none`) {
    visitUrl(`afterlife.php?action=buydeli&whichitem=${consumable.id}`);
  }

  if (pet !== $item`none`) {
    visitUrl(`afterlife.php?action=buyarmory&whichitem=${pet.id}`);
  }

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
          if (!permOptions.neverAbort)
            throw new AscendError(
              `Skill ${skill} is too karmaically expensive!`
            );
          continue;
        }
        karma -= expectedKarma;
        const permText =
          prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
        visitUrl(`afterlife.php?action=${permText}&whichskill=${skill.id}`);
      }
    }
  }

  visitUrl(
    `afterlife.php?action=ascend&confirmascend=1&whichsign=${moonId}&gender=${kolGender}&whichclass=${playerClass.id}&whichpath=${path.id}&asctype=${lifestyle}&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd`,
    true
  );
}

/**
 * Sets up various iotms you may want to use in the coming ascension
 *
 * @param ascensionPrep Configuration for various ascension prep settings. Any ommitted key will be kept as-is
 * @param ascensionPrep.garden Garden to which to switch
 * @param ascensionPrep.eudora Eudora to which to switch
 * @param ascensionPrep.chateau Chateau configuration
 * @param ascensionPrep.chateau.desk Chateau desk configuration
 * @param ascensionPrep.chateau.ceiling Chateau ceiling configuration
 * @param ascensionPrep.chateau.nightstand Chateau nightstand configuration
 * @param ascensionPrep.throwOnFail If true, this will throw an error when it fails to switch something
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
