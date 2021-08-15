import {
  floristAvailable,
  getFloristPlants,
  myLocation,
  visitUrl,
} from "kolmafia";
import { get } from "../../property";

type environment = "outdoor" | "indoor" | "underground" | "underwater";

class Flower {
  name: string;
  id: number;
  environment: environment;
  modifier: string;
  territorial: boolean;

  constructor(
    name: string,
    id: number,
    environment: environment,
    modifier: string,
    territorial = false
  ) {
    this.name = name;
    this.id = id;
    this.environment = environment;
    this.modifier = modifier;
    this.territorial = territorial;
  }

  isPlantedHere(location = myLocation()): boolean {
    return getFloristPlants()[location.toString()].includes(this.name);
  }

  available(location = myLocation()): boolean {
    return (
      this.environment === (location.environment as environment) &&
      !get("_floristPlantsUsed").includes(this.name) &&
      !this.isPlantedHere(location)
    );
  }

  dig(): boolean {
    if (!this.isPlantedHere()) return false;
    const flowers = getFloristPlants()[myLocation().toString()];
    if (!flowers[2]) return false;
    const plantNumber = getFloristPlants()[myLocation().toString()].indexOf(
      this.name
    );
    visitUrl(`choice.php?option=2&whichchoice=720&pwd&plnti=${plantNumber}`);
    return !this.isPlantedHere();
  }

  plant(): boolean {
    if (this.isPlantedHere()) return true;
    if (isFull()) return false;
    visitUrl(`choice.php?whichchoice=720&whichoption=1&pwd&plant=${this.id}`);
    return this.isPlantedHere();
  }
}

export function have(): boolean {
  return floristAvailable();
}

function toFlower(name: string): Flower | undefined {
  return all().find((flower) => name === flower.name);
}

function flowersIn(location: Location): Flower[] {
  const returnValue: Flower[] = [];
  getFloristPlants()
    [location.toString()].map(toFlower)
    .forEach((flower) => {
      if (flower) returnValue.push(flower);
    });
  return returnValue;
}

export function flowersAvailableFor(
  location: Location = myLocation()
): Flower[] {
  return all().filter((flower) => flower.available(location));
}

export function isFull(location = myLocation()): boolean {
  return flowersIn(myLocation()).length == 2;
}

export const all: () => Flower[] = () => [
  RabidDogwood,
  Rutabeggar,
  RadishRadish,
  Artichoker,
  SmokeRa,
  SkunkCabbage,
  DeadlyCinnamon,
  CeleryStalker,
  LettuceSpray,
  SeltzerWatercress,
  WarLily,
  StealingMagnolia,
  CannedSpinach,
  Impatiens,
  SpiderPlant,
  RedFern,
  BamBoo,
  ArcticMoss,
  AloeGuvnor,
  PitcherPlant,
  BlusteryPuffball,
  HornOfPlenty,
  WizardsWig,
  ShuffleTruffle,
  DisLichen,
  LooseMorels,
  FoulToadstool,
  Chillterelle,
  Portlybella,
  MaxHeadshroom,
  Spankton,
  Kelptomaniac,
  Crookweed,
  ElectricEelgrass,
  Duckweed,
  OrcaOrchid,
  Sargassum,
  SubSeaRose,
  Snori,
  UpSeaDaisy,
];
export const RabidDogwood = new Flower(
  "Rabid Dogwood",
  1,
  "outdoor",
  "+30 Monster Level",
  true
);
export const Rutabeggar = new Flower(
  "Rutabeggar",
  2,
  "outdoor",
  "+25 Item Drop",
  true
);
export const RadishRadish = new Flower(
  "Rad-ish Radish",
  3,
  "outdoor",
  "+5 Moxie Experience",
  true
);
export const Artichoker = new Flower(
  "Artichoker",
  4,
  "outdoor",
  "Delevels enemies"
);
export const SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks attacks");
export const SkunkCabbage = new Flower(
  "Skunk Cabbage",
  6,
  "outdoor",
  "Stench damage"
);
export const DeadlyCinnamon = new Flower(
  "Deadly Cinnamon",
  7,
  "outdoor",
  "Hot damage"
);
export const CeleryStalker = new Flower(
  "Celery Stalker",
  8,
  "outdoor",
  "Spooky damage"
);
export const LettuceSpray = new Flower(
  "Lettus Spray",
  9,
  "outdoor",
  "Restores HP"
);
export const SeltzerWatercress = new Flower(
  "Seltzer Watercress",
  10,
  "outdoor",
  "Restores MP"
);
export const WarLily = new Flower(
  "War Lily",
  11,
  "indoor",
  "+30 Monster Level",
  true
);
export const StealingMagnolia = new Flower(
  "Stealing Magnolia",
  12,
  "indoor",
  "+25 Item Drop",
  true
);
export const CannedSpinach = new Flower(
  "Canned Spinach",
  13,
  "indoor",
  "+5 Muscle Experience",
  true
);
export const Impatiens = new Flower(
  "Impatiens",
  14,
  "indoor",
  "+25 Initiative"
);
export const SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison");
export const RedFern = new Flower("Red Fern", 16, "indoor", "Delevels enemies");
export const BamBoo = new Flower("Bam BOO!", 17, "indoor", "Spooky damage");
export const ArcticMoss = new Flower(
  "Arctic Moss",
  18,
  "indoor",
  "Cold damage"
);
export const AloeGuvnor = new Flower(
  "Aloe Guv'nor",
  19,
  "indoor",
  "Restores HP"
);
export const PitcherPlant = new Flower(
  "Pitcher Plant",
  20,
  "indoor",
  "Restores MP"
);
export const BlusteryPuffball = new Flower(
  "Blustery Puffball",
  21,
  "underground",
  "+30 Monster Level",
  true
);
export const HornOfPlenty = new Flower(
  "Horn of Plenty",
  22,
  "underground",
  "+25 Item Drop",
  true
);
export const WizardsWig = new Flower(
  "Wizard's Wig",
  23,
  "underground",
  "+5 Mysticality Experience",
  true
);
export const ShuffleTruffle = new Flower(
  "Shuffle Truffle",
  24,
  "underground",
  "+25 Initiative"
);
export const DisLichen = new Flower(
  "Dis Lichen",
  25,
  "underground",
  "Delevels enemies"
);
export const LooseMorels = new Flower(
  "Loose Morels",
  26,
  "underground",
  "Sleaze damage"
);
export const FoulToadstool = new Flower(
  "Foul Toadstool",
  27,
  "underground",
  "Stench damage"
);
export const Chillterelle = new Flower(
  "Chillterelle",
  28,
  "underground",
  "Cold damage"
);
export const Portlybella = new Flower(
  "Portlybella",
  29,
  "underground",
  "Retores HP"
);
export const MaxHeadshroom = new Flower(
  "Max Headshroom",
  30,
  "underground",
  "Restores MP"
);
export const Spankton = new Flower(
  "Spankton",
  31,
  "underwater",
  "Delevels enemies",
  true
);
export const Kelptomaniac = new Flower(
  "Kelptomaniac",
  32,
  "underwater",
  "+40 Item Drop",
  true
);
export const Crookweed = new Flower(
  "Crookweed",
  33,
  "underwater",
  "+60 Meat Drop",
  true
);
export const ElectricEelgrass = new Flower(
  "Electric Eelgrass",
  34,
  "underwater",
  "Blocks attacks"
);
export const Duckweed = new Flower(
  "Duckweed",
  35,
  "underwater",
  "Protects once"
);
export const OrcaOrchid = new Flower(
  "Orca Orchid",
  36,
  "underwater",
  "Physical damage"
);
export const Sargassum = new Flower(
  "Sargassum",
  37,
  "underwater",
  "Stench damage"
);
export const SubSeaRose = new Flower(
  "Sub-Sea Rose",
  38,
  "underwater",
  "Cold damage"
);
export const Snori = new Flower(
  "Snori",
  39,
  "underwater",
  "Restores HP, Restores MP"
);
export const UpSeaDaisy = new Flower(
  "Up Sea Daisy",
  40,
  "underwater",
  "+30 Experience"
);
