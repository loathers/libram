import { containsText, print, toInt, visitUrl } from "kolmafia";
import { $item, $items, $stat } from ".";

export enum lifestyle {
  casual = 1,
  softcore = 2,
  normal = 2,
  hardcore = 3,
}

export const Path = {
  unrestricted: 0,
  boozetafarian: 1,
  booze: 1,
  teetotaler: 2,
  teet: 2,
  oxygenarian: 3,
  oxy: 3,
  beesHateYou: 4,
  bhy: 4,
  wayOfTheSurprisingFist: 6,
  wotsf: 6,
  trendy: 7,
  avatarOfBoris: 8,
  aob: 8,
  boris: 8,
  bugbearInvasion: 9,
  bugbear: 9,
  zombieSlayer: 10,
  zombie: 10,
  zs: 10,
  classAct: 11,
  classAct1: 11,
  classActI: 11,
  avatarOfJarlsberg: 12,
  aoj: 12,
  jarlsberg: 12,
  big: 14,
  kolhs: 15,
  hs: 15,
  classAct2: 16,
  classActII: 16,
  avatarOfSneakyPete: 17,
  aosp: 17,
  sneakyPete: 17,
  pete: 17,
  slowAndSteady: 18,
  heavyRains: 19,
  hr: 19,
  picky: 21,
  standard: 22,
  actuallyEdTheUndying: 23,
  aetu: 23,
  ed: 23,
  edTheUndying: 23,
  avatarOfEdTheUndying: 23,
  aoetu: 23,
  oneCrazyRandomSummer: 24,
  ocrs: 24,
  communityService: 25,
  cs: 25,
  avatarOfWestOfLoathing: 26,
  aowol: 26,
  wol: 26,
  theSource: 27,
  source: 27,
  nuclearAutumn: 28,
  na: 28,
  gelatinousNoob: 29,
  gn: 29,
  licenseToAdventure: 30,
  lta: 30,
  liveAscendRepeat: 31,
  lar: 31,
  liveDotAscendDotRepeatDot: 31,
  pocketFamiliars: 32,
  pokeFam: 32,
  gLover: 33,
  disguisesDelimit: 34,
  darkGyffte: 35,
  dg: 35,
  vampyre: 35,
  vampire: 35,
  twoCrazyRandomSummer: 36,
  tcrs: 36,
  kingdomOfExploathing: 37,
  koe: 37,
  exploathing: 37,
  pathOfThePlumber: 38,
  plumber: 38,
  potp: 38,
  avatarOfThePlumber: 38,
  aotp: 38,
  lowKeySummer: 39,
  lks: 39,
  greyGoo: 40,
  youRobot: 41,
  yr: 41,
  quantumTerrarium: 42,
  qt: 42,
};

export function ascend(
  pathId: number,
  playerClass: Class,
  lifestyle: lifestyle,
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
  const avatarPathIds = [8, 10, 12, 17, 23, 26, 29, 35, 38];
  const toMoonId = (moon: string | number): number => {
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
  };
  const classid = avatarPathIds.includes(pathId) ? 0 : toInt(playerClass);
  if (pathId < 0) throw `Invalid path ID ${pathId}`;
  if (toMoonId(moon) < 1) throw `Invalid moon ${moon}`;
  if (
    consumable &&
    !$items`astral six-pack, astral hot dog dinner`.includes(consumable)
  )
    throw `Invalid consumable ${consumable}`;
  if (
    pet &&
    !$items`astral bludgeon,
    astral shield, astral chapeau,
    astral bracer, astral longbow,
    astral shorts, astral mace,
    astral ring, astral statuette,
    astral pistol, astral mask,
    astral pet sweater, astral shirt,
    astral belt`.includes(pet)
  )
    throw `Invalid astral item ${pet}`;

  visitUrl("afterlife.php?action=pearlygates");

  if (consumable)
    visitUrl(`afterlife.php?action=buydeli&whichitem=${toInt(consumable)}`);
  if (pet) visitUrl(`afterlife.php?action=buyarmory&whichitem=${toInt(pet)}`);

  visitUrl(
    `afterlife.php?action=ascend&confirmascend=1&whichsign=${toMoonId(
      moon
    )}&gender=2&whichclass=${classid}&whichpath=${pathId}&asctype=${lifestyle}&nopetok=1&noskillsok=1&lamepathok=1&pwd`,
    true
  );
}
