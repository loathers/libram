import { cliExecute, Item, toInt, visitUrl } from "kolmafia";
import { get } from "../../property";
import { $item, $items } from "../../template-string";

export function have(): boolean {
  return get("spacegateAlways") || get("_spacegateToday");
}

export function updateStatus(): void {
  visitUrl("place.php?whichplace=spacegate&action=sg_Terminal");
}

export function dialled(): boolean {
  updateStatus();
  return get("_spacegateCoordinates") !== "";
}

export function hazards() {
  return get("_spacegateHazards");
}

export function planetName() {
  return get("_spacegatePlanetName");
}

export function planetCoords() {
  return get("_spacegateCoordinates");
}

export function plantLife() {
  return get("_spacegatePlantLife");
}

export function animalLife() {
  return get("_spacegateAnimalLife");
}

export function intelligentLife() {
  return get("_spacegateIntelligentLife");
}

export function ruins() {
  return get("_spacegateRuins");
}

export function spants() {
  return get("_spacegateSpant");
}

export function murderBots() {
  return get("_spacegateMurderbot");
}

export function hazardEquipment(hazards: string): Item[] {
  const equipment: Item[] = $items`none`;
  if (hazards.includes("toxic atmosphere"))
    equipment.push($item`filter helmet`);
  if (hazards.includes("high gravity"))
    equipment.push($item`exo-servo leg braces`);
  if (hazards.includes("irradiated")) equipment.push($item`rad cloak`);
  if (hazards.includes("magnetic storms"))
    equipment.push($item`gate transceiver`);
  if (hazards.includes("high winds"))
    equipment.push($item`high-friction boots`);
  return equipment.slice(1);
}

export function getHazardEquipment(): void {
  const equipment = hazardEquipment(hazards());

  equipment.forEach((equip) => {
    const num = toInt(equip) - 9404; //Equipment items are 9405 - 9409,
    visitUrl("place.php?whichplace=spacegate&action=sg_requisition");
    visitUrl(`choice.php?whichchoice=1233&option=${num}`);
  });
}

type Vaccine =
  | "Rainbow"
  | "Broad-Spectrum"
  | "Emotional"
  | "Elemental Resistance"
  | "Stats"
  | "Monster Level";

export function getVaccine(choice: Vaccine): void {
  if (get("_spacegateVaccine")) {
    return;
  }
  const num = () => {
    switch (choice) {
      case "Rainbow":
      case "Elemental Resistance":
        return 1;
      case "Broad-Spectrum":
      case "Stats":
        return 2;
      case "Emotional":
      case "Monster Level":
        return 3;
    }
  };
  if (!get(`spacegateVaccine${num}`)) {
    throw "You don't appear to have that Vaccine Unlocked!";
  }
  cliExecute(`spacegate vaccine ${num}`);
}

export function dial(address: string): void {
  if (!have() || dialled()) {
    //cannot dial if we already have or don't own it.
    return;
  }
  if (!address.match(`^[[alpha]]+$`) || address.length !== 7) {
    throw "Invalid Spacegate Address - must be exactly 7 alphabetic characters";
  } else {
    cliExecute(`spacegate destination ${address}`);
  }
}
