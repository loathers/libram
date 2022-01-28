import {
  floristAvailable,
  getFloristPlants,
  Location,
  myLocation,
  visitUrl,
} from "kolmafia";
import { EnvironmentType } from "../../lib";
import { mergeModifiers, Modifiers } from "../../modifier";
import { get } from "../../property";
type SpecialFlowerAbility = "Delevels Enemy" | "Blocks Attacks" | "Poison";

class Flower {
  name: string;
  id: number;
  environment: EnvironmentType;
  modifier: Modifiers | SpecialFlowerAbility;
  territorial: boolean;

  constructor(
    name: string,
    id: number,
    environment: EnvironmentType,
    modifier: Modifiers | SpecialFlowerAbility,
    territorial = false
  ) {
    this.name = name;
    this.id = id;
    this.environment = environment;
    this.modifier = modifier;
    this.territorial = territorial;
  }

  static plantNamesInZone(location = myLocation()): string[] | null {
    return getFloristPlants()[location.toString()] ?? null;
  }

  static plantsInZone(location = myLocation()): Flower[] | null {
    return (this.plantNamesInZone(location)
      ?.map((flowerName) => toFlower(flowerName))
      .filter((flower) => flower !== undefined) ?? null) as Flower[] | null;
  }

  static modifiersInZone(location = myLocation()): Modifiers {
    const plants = this.plantsInZone(location);
    if (!plants) return {};
    const modifiers = plants
      .map((plant) => plant.modifier)
      .map((modifier) => (typeof modifier === "string" ? {} : modifier));
    return mergeModifiers(...modifiers);
  }

  isPlantedHere(location = myLocation()): boolean {
    const plantedHere = Flower.plantNamesInZone(location)?.includes(this.name);
    return plantedHere !== undefined && plantedHere;
  }

  available(location = myLocation()): boolean {
    return (
      this.environment === (location.environment as EnvironmentType) &&
      !get("_floristPlantsUsed").includes(this.name) &&
      !this.isPlantedHere(location)
    );
  }

  dig(): boolean {
    if (!this.isPlantedHere()) return false;
    const flowers = Flower.plantNamesInZone();
    if (!flowers || !flowers[2]) return false;
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
  return all.find((flower) => name === flower.name);
}

export function flowersIn(location: Location): Flower[] {
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
  return all.filter((flower) => flower.available(location));
}

export function isFull(location = myLocation()): boolean {
  return flowersIn(location).length === 3;
}

export const RabidDogwood = new Flower(
  "Rabid Dogwood",
  1,
  "outdoor",
  {
    "Monster Level": 30,
  },
  true
);
export const Rutabeggar = new Flower(
  "Rutabeggar",
  2,
  "outdoor",
  {
    "Item Drop": 25,
  },
  true
);
export const RadishRadish = new Flower(
  "Rad-ish Radish",
  3,
  "outdoor",
  { "Moxie Experience": 5 },
  true
);
export const Artichoker = new Flower(
  "Artichoker",
  4,
  "outdoor",
  "Delevels Enemy"
);
export const SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks Attacks");
export const SkunkCabbage = new Flower("Skunk Cabbage", 6, "outdoor", {
  "Stench Damage": 12.5,
});
export const DeadlyCinnamon = new Flower("Deadly Cinnamon", 7, "outdoor", {
  "Hot Damage": 12.5,
});
export const CeleryStalker = new Flower("Celery Stalker", 8, "outdoor", {
  "Spooky Damage": 12.5,
});
export const LettuceSpray = new Flower("Lettus Spray", 9, "outdoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 29,
});
export const SeltzerWatercress = new Flower(
  "Seltzer Watercress",
  10,
  "outdoor",
  { "MP Regen Min": 5, "MP Regen Max": 15 }
);
export const WarLily = new Flower(
  "War Lily",
  11,
  "indoor",
  { "Monster Level": 30 },
  true
);
export const StealingMagnolia = new Flower(
  "Stealing Magnolia",
  12,
  "indoor",
  { "Item Drop": 25 },
  true
);
export const CannedSpinach = new Flower(
  "Canned Spinach",
  13,
  "indoor",
  { "Muscle Experience": 5 },
  true
);
export const Impatiens = new Flower("Impatiens", 14, "indoor", {
  Initiative: 25,
});
export const SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison");
export const RedFern = new Flower("Red Fern", 16, "indoor", "Delevels Enemy");
export const BamBoo = new Flower("Bam BOO!", 17, "indoor", {
  "Spooky Damage": 12.5,
});
export const ArcticMoss = new Flower("Arctic Moss", 18, "indoor", {
  "Cold Damage": 12.5,
});
export const AloeGuvnor = new Flower("Aloe Guv'nor", 19, "indoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 30,
});
export const PitcherPlant = new Flower("Pitcher Plant", 20, "indoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15,
});
export const BlusteryPuffball = new Flower(
  "Blustery Puffball",
  21,
  "underground",
  { "Monster Level": 30 },
  true
);
export const HornOfPlenty = new Flower(
  "Horn of Plenty",
  22,
  "underground",
  { "Item Drop": 25 },
  true
);
export const WizardsWig = new Flower(
  "Wizard's Wig",
  23,
  "underground",
  { "Mysticality Experience": 5 },
  true
);
export const ShuffleTruffle = new Flower("Shuffle Truffle", 24, "underground", {
  Initiative: 25,
});
export const DisLichen = new Flower(
  "Dis Lichen",
  25,
  "underground",
  "Delevels Enemy"
);
export const LooseMorels = new Flower("Loose Morels", 26, "underground", {
  "Sleaze Damage": 12.5,
});
export const FoulToadstool = new Flower("Foul Toadstool", 27, "underground", {
  "Stench Damage": 12.5,
});
export const Chillterelle = new Flower("Chillterelle", 28, "underground", {
  "Cold Damage": 12.5,
});
export const Portlybella = new Flower("Portlybella", 29, "underground", {
  "HP Regen Min": 10,
  "HP Regen Max": 30,
});
export const MaxHeadshroom = new Flower("Max Headshroom", 30, "underground", {
  "MP Regen Min": 5,
  "MP Regen Max": 15,
});
export const Spankton = new Flower(
  "Spankton",
  31,
  "underwater",
  "Delevels Enemy",
  true
);
export const Kelptomaniac = new Flower(
  "Kelptomaniac",
  32,
  "underwater",
  { "Item Drop": 40 },
  true
);
export const Crookweed = new Flower(
  "Crookweed",
  33,
  "underwater",
  { "Meat Drop": 60 },
  true
);
export const ElectricEelgrass = new Flower(
  "Electric Eelgrass",
  34,
  "underwater",
  "Blocks Attacks"
);
export const Duckweed = new Flower(
  "Duckweed",
  35,
  "underwater",
  "Blocks Attacks"
);
export const OrcaOrchid = new Flower("Orca Orchid", 36, "underwater", {
  "Weapon Damage": 12.5,
});
export const Sargassum = new Flower("Sargassum", 37, "underwater", {
  "Stench Damage": 12.5,
});
export const SubSeaRose = new Flower("Sub-Sea Rose", 38, "underwater", {
  "Cold Damage": 12.5,
});
export const Snori = new Flower("Snori", 39, "underwater", {
  "HP Regen Min": 20,
  "HP Regen Max": 30,
  "MP Regen Min": 10,
  "MP Regen Max": 20,
});
export const UpSeaDaisy = new Flower("Up Sea Daisy", 40, "underwater", {
  Experience: 30,
});

export const all: readonly Flower[] = Object.freeze([
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
]);
