import { getFloristPlants, myLocation, visitUrl } from "kolmafia";
import { EnvironmentType } from "../../lib";
import { Modifiers } from "../../modifier";

type SpecialFlowerAbility = "Delevels Enemy" | "Blocks Attacks" | "Poison";
export type Flower = {
  id: number;
  modifier: Modifiers | SpecialFlowerAbility;
  territorial: boolean;
};

export const outdoorFlowers = {
  ["Rabid Dogwood"]: {
    id: 1,
    modifier: { "Monster Level": 30 },
    territorial: true,
  },
  ["Rutabeggar"]: {
    id: 2,
    modifier: { "Item Drop": 25 },
    territorial: true,
  },
  ["Rad-ish Radish"]: {
    id: 3,
    modifier: { "Moxie Experience": 5 },
    territorial: true,
  },
  ["Artichoker"]: {
    id: 4,
    modifier: "Delevels Enemy",
    territorial: false,
  },
  ["Smoke-ra"]: {
    id: 5,
    modifier: "Blocks Attacks",
    territorial: false,
  },
  ["Skunk Cabbage"]: {
    id: 6,
    modifier: { "Stench Damage": 12.5 },
    territorial: false,
  },
  ["Deadly Cinnamon"]: {
    id: 7,
    modifier: { "Hot Damage": 12.5 },
    territorial: false,
  },
  ["Celery Stalker"]: {
    id: 8,
    modifier: { "Spooky Damage": 12.5 },
    territorial: false,
  },
  ["Seltzer Watercress"]: {
    id: 10,
    modifier: { "MP Regen Min": 5, "MP Regen Max": 15 },
    territorial: false,
  },
} as const;
export type OutdoorFlowerName = keyof typeof outdoorFlowers;
function isOutdoorFlower(name: string): name is OutdoorFlowerName {
  return Object.getOwnPropertyNames(outdoorFlowers).includes(name);
}
export type FlowerName = OutdoorFlowerName | "yeet";

export function plantNamesInZone(location = myLocation()): FlowerName[] {
  return (getFloristPlants()[location.toString()] as FlowerName[]) ?? [];
}

export function isFull(location = myLocation()): boolean {
  return plantNamesInZone(location).length >= 3;
}

function toFlower(
  name: FlowerName,
  environment: EnvironmentType
): Flower | null {
  switch (environment) {
    case "outdoor":
      if (!isOutdoorFlower(name)) {
        return null;
      } else {
        return outdoorFlowers[name];
      }
    default:
      throw new Error("Invalid environment type!");
  }
}

export function plant(flower: FlowerName): boolean {
  if (plantNamesInZone().includes(flower) || isFull()) return false;
  const environment = myLocation().environment as EnvironmentType;
  const flowerObject = toFlower(flower, environment);
  if (!flowerObject) return false;
  if (
    flowerObject.territorial &&
    plantNamesInZone().some((name) => toFlower(name, environment)?.territorial)
  ) {
    return false;
  }

  visitUrl(
    `choice.php?whichchoice=720&whichoption=1&pwd&whichplant=${flowerObject.id}`
  );

  return plantNamesInZone().includes(flower);
}
