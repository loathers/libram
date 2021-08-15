import { $classes } from "./template-string";

export class Path {
  name: string;
  id: number;
  hasAllPerms: boolean; //here, we define avatar-ness around being its own class
  hasCampground: boolean;
  hasTerrarium: boolean;
  stomachSize: number;
  liverSize: number; //Defined as the lowest inebriety that makes you unable to drink more, just to make it fifteens across the board
  spleenSize: number;
  classes: Class[];
  constructor(
    name: string,
    id: number,
    hasAllPerms = true,
    hasCampground = true,
    hasTerrarium = true,
    stomachSize = 15,
    liverSize = 15,
    spleenSize = 15,
    classes = $classes`Seal Clubber, Turtle Tamer, Sauceror, Pastamancer, Disco Bandit, Accordion Thief`
  ) {
    this.name = name;
    this.id = id;
    this.hasAllPerms = hasAllPerms;
    this.hasCampground = hasCampground;
    this.hasTerrarium = hasTerrarium;
    this.stomachSize = stomachSize;
    this.liverSize = liverSize;
    this.spleenSize = spleenSize;
    this.classes = classes;
  }
}

export const Paths = {
  Unrestricted: new Path("Unrestricted", 0),
  Boozetafarian: new Path("Boozetafarian", 1, false, true, true, 0),
  Teetotaler: new Path("Teetotaler", 2, false, true, true, 15, 0),
  Oxygenarian: new Path("Oxygenarian", 3, false, true, true, 0, 0),
  BeesHateYou: new Path("Bees Hate You", 4),
  WayOfTheSurprisingFist: new Path("Way of the Surprising Fist", 6),
  Trendy: new Path("Trendy", 6),
  AvatarOfBoris: new Path(
    "Avatar of Boris",
    8,
    false,
    true,
    false,
    20,
    5,
    15,
    $classes`Avatar of Boris`
  ),
  BugbearInvasion: new Path("Bugbear Invasion", 9),
  ZombieSlayer: new Path(
    "Zombie Slayer",
    10,
    false,
    true,
    true,
    15,
    5,
    15,
    $classes`Zombie Master`
  ),
  ClassAct: new Path("Class Act", 11, false),
  AvatarofJarlsberg: new Path(
    "Avatar of Jarlsberg",
    12,
    false,
    true,
    false,
    10,
    10,
    15,
    $classes`Avatar of Jarlsberg`
  ),
  Big: new Path("BIG!", 14),
  KolHs: new Path("KOLHS", 15),
  ClassAct2: new Path("Class Act II: A Class For Pigs", 16, false),
  AvatarofSneakyPete: new Path(
    "Avatar of Sneaky Pete",
    17,
    false,
    true,
    false,
    5,
    20,
    15,
    $classes`Avatar of Sneaky Pete`
  ),
  SlowAndSteady: new Path("Slow and Steady", 18),
  HeavyRains: new Path("Heavy Rains", 19),
  Picky: new Path("Picky", 21, false),
  Standard: new Path("Standard", 22),
  ActuallyEdTheUndying: new Path(
    "Actually Ed the Undying",
    23,
    false,
    false,
    false,
    0,
    0,
    5,
    $classes`Ed`
  ),
  OneCrazyRandomSummer: new Path("One Crazy Random Summer", 24),
  CommunityService: new Path("Community Service", 25),
  AvatarOfWestOfLoathing: new Path(
    "Avatar of West of Loathing",
    26,
    false,
    true,
    true,
    10,
    10,
    10,
    $classes`Cow Puncher, Snake Oiler, Beanslinger`
  ),
  TheSource: new Path("The Source", 27),
  NuclearAutumn: new Path("Nuclear Autumn", 28, false, false, true, 3, 3, 3),
  GelatinousNoob: new Path(
    "Gelatinous Noob",
    29,
    false,
    true,
    true,
    0,
    0,
    0,
    $classes`Gelatinous Noob`
  ),
  LicenseToAdventure: new Path(
    "License to Adventure",
    30,
    true,
    true,
    false,
    0,
    2,
    15
  ), //Unsure how to log liver size here
  LiveAscendRepeat: new Path("Live. Ascend. Repeat.", 31),
  PocketFamiliars: new Path("Pocket Familiars", 32, false, true, false), //This is my opinion on the matter
  GLover: new Path("G-Lover", 33),
  DisguisesDelimit: new Path("Disguises Delimit", 34),
  DarkGyffte: new Path(
    "Dark Gyffte",
    35,
    false,
    true,
    false,
    5,
    5,
    15,
    $classes`Vampyre`
  ),
  TwoCrazyRandomSummer: new Path("Two Crazy Random Summer", 36),
  KingdomOfExploathing: new Path("Kingdom of Exploathing", 37),
  PathOfThePlumber: new Path(
    "Path of the Plumber",
    38,
    false,
    true,
    true,
    20,
    0,
    5,
    $classes`Plumber`
  ),
  LowKeySummer: new Path("Low Key Summer", 40),
  GreyGoo: new Path("Grey Goo", 40),
  YouRobot: new Path("You, Robot", 41, false, false, true, 0, 0, 0),
  QuantumTerrarium: new Path("Quantum Terrarium", 42, true, true, false),
  Wildfire: new Path("Wildfire", 43),
} as const;
