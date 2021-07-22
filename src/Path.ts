import { isTrendy } from "kolmafia";

export class Path {
  name: string;
  id: number;
  isAvatar: boolean; //here, we define avatar-ness around being its own class
  constructor(name: string, id: number, isAvatar = false) {
    this.name = name;
    this.id = id;
    this.isAvatar = isAvatar;
  }
}

export const Paths = {
  Unrestricted: new Path("Unrestricted", 0),
  Boozetafarian: new Path("Boozetafarian", 1),
  Teetotaler: new Path("Teetotaler", 2),
  Oxygenarian: new Path("Oxygenarian", 3),
  BeesHateYou: new Path("Bees Hate You", 4),
  WayOfTheSurprisingFist: new Path("Way of the Surprising Fist", 6),
  Trendy: new Path("Trendy", 6),
  AvatarOfBoris: new Path("Avatar of Boris", 8, true),
  BugbearInvasion: new Path("Bugbear Invasion", 9),
  ZombieSlayer: new Path("Zombie Slayer", 10, true),
  ClassAct: new Path("Class Act", 11),
  AvatarofJarlsberg: new Path("Avatar of Jarlsberg", 12, true),
  Big: new Path("BIG!", 14),
  KolHs: new Path("KOLHS", 15),
  ClassAct2: new Path("Class Act II: A Class For Pigs", 16),
  AvatarofSneakyPete: new Path("Avatar of Sneaky Pete", 17, true),
  SlowAndSteady: new Path("Slow and Steady", 18),
  HeavyRains: new Path("Heavy Rains", 19),
  Picky: new Path("Picky", 21),
  Standard: new Path("Standard", 22),
  ActuallyEdTheUndying: new Path("Actually Ed the Undying", 23, true),
  OneCrazyRandomSummer: new Path("One Crazy Random Summer", 24),
  CommunityService: new Path("Community Service", 25),
  AvatarOfWestOfLoathing: new Path("Avatar of West of Loathing", 26, true),
  TheSource: new Path("The Source", 27),
  NuclearAutumn: new Path("Nuclear Autumn", 28),
  GelatinousNoob: new Path("Gelatinous Noob", 29, true),
  LicenseToAdventure: new Path("License to Adventure", 30),
  LiveAscendRepeat: new Path("Live. Ascend. Repeat.", 31),
  PocketFamiliars: new Path("Pocket Familiars", 32),
  GLover: new Path("G-Lover", 33),
  DisguisesDelimit: new Path("Disguises Delimit", 34),
  DarkGyffte: new Path("Dark Gyffte", 35, true),
  TwoCrazyRandomSummer: new Path("Two Crazy Random Summer", 36),
  KingdomOfExploathing: new Path("Kingdom of Exploathing", 37),
  PathOfThePlumber: new Path("Path of the Plumber", 38, true),
  LowKeySummer: new Path("Low Key Summer", 40),
  GreyGoo: new Path("Grey Goo", 40),
  YouRobot: new Path("You, Robot", 41),
  QuantumTerrarium: new Path("Quantum Terrarium", 42),
};
