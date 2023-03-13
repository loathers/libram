/* eslint-disable jsdoc/require-jsdoc */
import { cliExecute, Item, toInt, visitUrl } from "kolmafia";
import { get } from "../../property";
import { $item } from "../../template-string";

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
  const hazardEquipment = {
    "toxic atmosphere": $item`filter helmet`,
    "high gravity": $item`exo-servo leg braces`,
    irradiated: $item`rad cloak`,
    "magnetic storms": $item`gate transceiver`,
    "high winds": $item`high-friction boots`,
  };
  return Object.entries(hazardEquipment)
    .filter(([clue]) => hazards.includes(clue))
    .map(([, item]) => item);
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
  const nums = {
    Rainbow: 1,
    "Elemental Resistance": 1,
    "Broad-Spectrum": 2,
    Stats: 2,
    Emotional: 3,
    "Monster Level": 3,
  };
  const num = nums[choice];
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
