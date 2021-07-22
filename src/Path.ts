export class Path {
  name: string;
  id: number;
  isAvatar: boolean; //here, we define avatar-ness around being its own class
  constructor(name: string, id: number, isAvatar = false) {
    this.name = name;
    this.id = id;
    this.isAvatar = isAvatar;
  }

  static Unrestricted: Path = new Path("Unrestricted", 0);
  static Boozetafarian: Path = new Path("Boozetafarian", 1);
  static Teetotaler: Path = new Path("Teetotaler", 2);
  static Oxygenarian: Path = new Path("Oxygenarian", 3);
  static BeesHateYou: Path = new Path("Bees Hate You", 4);
  static WayOfTheSurprisingFist: Path = new Path(
    "Way of the Surprising Fist",
    6
  );
  static Trendy: Path = new Path("Trendy", 6);
  static AvatarOfBoris: Path = new Path("Avatar of Boris", 8, true);
  static BugbearInvasion: Path = new Path("Bugbear Invasion", 9);
  static ZombieSlayer: Path = new Path("Zombie Slayer", 10, true);
  static ClassAct: Path = new Path("Class Act", 11);
  static AvatarofJarlsberg: Path = new Path("Avatar of Jarlsberg", 12, true);
  static Big: Path = new Path("BIG!", 14);
  static KolHs: Path = new Path("KOLHS", 15);
  static ClassAct2: Path = new Path("Class Act II: A Class For Pigs", 16);
  static AvatarofSneakyPete: Path = new Path("Avatar of Sneaky Pete", 17, true);
  static AlowAndSteady: Path = new Path("Slow and Steady", 18);
  static HeavyRains: Path = new Path("Heavy Rains", 19);
  static Picky: Path = new Path("Picky", 21);
  static Standard: Path = new Path("Standard", 22);
  static ActuallyEdTheUndying: Path = new Path(
    "Actually Ed the Undying",
    23,
    true
  );
  static OneCrazyRandomSummer: Path = new Path("One Crazy Random Summer", 24);
  static CommunityService: Path = new Path("Community Service", 25);
  static AvatarOfWestOfLoathing: Path = new Path(
    "Avatar of West of Loathing",
    26,
    true
  );
  static TheSource: Path = new Path("The Source", 27);
  static NuclearAutumn: Path = new Path("Nuclear Autumn", 28);
  static GelatinousNoob: Path = new Path("Gelatinous Noob", 29, true);
  static LicenseToAdventure: Path = new Path("License to Adventure", 30);
  static LiveAscendRepeat: Path = new Path("Live. Ascend. Repeat.", 31);
  static PocketFamiliars: Path = new Path("Pocket Familiars", 32);
  static GLover: Path = new Path("G-Lover", 33);
  static DisguisesDelimit: Path = new Path("Disguises Delimit", 34);
  static DarkGyffte: Path = new Path("Dark Gyffte", 35, true);
  static TwoCrazyRandomSummer: Path = new Path("Two Crazy Random Summer", 36);
  static KingdomOfExploathing: Path = new Path("Kingdom of Exploathing", 37);
  static PathOfThePlumber: Path = new Path("Path of the Plumber", 38, true);
  static LowKeySummer: Path = new Path("Low Key Summer", 40);
  static GreyGoo: Path = new Path("Grey Goo", 40);
  static YouRobot: Path = new Path("You, Robot", 41);
  static QuantumTerrarium: Path = new Path("Quantum Terrarium", 42);
}
