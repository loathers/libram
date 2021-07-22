export class Path {
  name: string;
  id: number;
  isAvatar: boolean; //here, we define avatar-ness around being its own class
  constructor(name: string, id: number, isAvatar = false) {
    this.name = name;
    this.id = id;
    this.isAvatar = isAvatar;
  }

  static unrestricted: Path = new Path("Unrestricted", 0);
  static boozetafarian: Path = new Path("Boozetafarian", 1);
  static teetotaler: Path = new Path("Teetotaler", 2);
  static oxygenarian: Path = new Path("Oxygenarian", 3);
  static beesHateYou: Path = new Path("Bees Hate You", 4);
  static wayOfTheSurprisingFist: Path = new Path(
    "Way of the Surprising Fist",
    6
  );
  static trendy: Path = new Path("Trendy", 6);
  static avatarOfBoris: Path = new Path("Avatar of Boris", 8, true);
  static bugbearInvasion: Path = new Path("Bugbear Invasion", 9);
  static zombieSlayer: Path = new Path("Zombie Slayer", 10, true);
  static classAct: Path = new Path("Class Act", 11);
  static avatarofJarlsberg: Path = new Path("Avatar of Jarlsberg", 12, true);
  static big: Path = new Path("BIG!", 14);
  static kolHs: Path = new Path("KOLHS", 15);
  static classAct2: Path = new Path("Class Act II: A Class For Pigs", 16);
  static avatarofSneakyPete: Path = new Path("Avatar of Sneaky Pete", 17, true);
  static slowAndSteady: Path = new Path("Slow and Steady", 18);
  static heavyRains: Path = new Path("Heavy Rains", 19);
  static picky: Path = new Path("Picky", 21);
  static standard: Path = new Path("Standard", 22);
  static actuallyEdTheUndying: Path = new Path(
    "Actually Ed the Undying",
    23,
    true
  );
  static oneCrazyRandomSummer: Path = new Path("One Crazy Random Summer", 24);
  static communityService: Path = new Path("Community Service", 25);
  static avatarOfWestOfLoathing: Path = new Path(
    "Avatar of West of Loathing",
    26,
    true
  );
  static theSource: Path = new Path("The Source", 27);
  static nuclearAutumn: Path = new Path("Nuclear Autumn", 28);
  static gelatinousNoob: Path = new Path("Gelatinous Noob", 29, true);
  static licenseToAdventure: Path = new Path("License to Adventure", 30);
  static liveAscendRepeat: Path = new Path("Live. Ascend. Repeat.", 31);
  static pocketFamiliars: Path = new Path("Pocket Familiars", 32);
  static gLover: Path = new Path("G-Lover", 33);
  static disguisesDelimit: Path = new Path("Disguises Delimit", 34);
  static darkGyffte: Path = new Path("Dark Gyffte", 35, true);
  static twoCrazyRandomSummer: Path = new Path("Two Crazy Random Summer", 36);
  static kingdomOfExploathing: Path = new Path("Kingdom of Exploathing", 37);
  static pathOfThePlumber: Path = new Path("Path of the Plumber", 38, true);
  static lowKeySummer: Path = new Path("Low Key Summer", 40);
  static greyGoo: Path = new Path("Grey Goo", 40);
  static youRobot: Path = new Path("You, Robot", 41);
  static quantumTerrarium: Path = new Path("Quantum Terrarium", 42);
}
