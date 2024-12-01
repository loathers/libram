import { availableAmount, cliExecute, Item, visitUrl } from "kolmafia";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";

/**
 * @returns Whether you have permanent Spacegate Access
 */
export function have(): boolean {
  return get("spacegateAlways");
}

/**
 * Refreshes the data from the Spacegate Terminal to determine current Spacegate Status
 */
export function updateStatus(): void {
  visitUrl("place.php?whichplace=spacegate&action=sg_Terminal");
}

/**
 * @returns Whether you have dialled the spacegate today.
 */
export function dialled(): boolean {
  updateStatus();
  return get("_spacegateCoordinates") !== "" || get("_spacegateToday");
}

/**
 * @returns A string containing a pipe-separated (|) list of all known hazards at the dialled planet
 */
export function hazards(): string {
  return get("_spacegateHazards");
}

/**
 * @returns The name of the dialled planet
 */
export function planetName(): string {
  return get("_spacegatePlanetName");
}

/**
 * @returns The 7-letter coordinates of the dialled planet
 */
export function planetCoords(): string {
  return get("_spacegateCoordinates");
}

/**
 * @returns The level of plantlife expected on the dialled planet (none, primitive, advanced, anomalous)
 */
export function plantLife(): string {
  return get("_spacegatePlantLife");
}

/**
 * @returns The level of animal life expected on the dialled planet (none, primitive, advanced, anomalous)
 */
export function animalLife(): string {
  return get("_spacegateAnimalLife");
}

/**
 * @returns Whether intelligent life is detected on the dialled planet
 */
export function intelligentLife(): boolean {
  return get("_spacegateIntelligentLife").includes("detected");
}

/**
 * @returns Whether hostile life is detected on the dialled planet
 */
export function hostileLife(): boolean {
  return get("_spacegateIntelligentLife").includes("hostile");
}

/**
 * @returns Whether alien ruins are detected on the dialled planet
 */
export function ruins(): boolean {
  return get("_spacegateRuins");
}

/**
 * @returns Whether Spants are detected on the dialled planet
 */
export function spants(): boolean {
  return get("_spacegateSpant");
}

/**
 * @returns Whether muderbots are detected on the dialled planet
 */
export function murderBots(): boolean {
  return get("_spacegateMurderbot");
}

/**
 * @param hazards A string of the various hazard names
 * @returns An array of the various required equipment to deal with those hazards
 */
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
/**
 * Tries to acquire all necessary equipment for the stated hazards at the dialed planet
 *
 * @returns Whether you successfully acquired all necessary equipment
 */
export function getHazardEquipment(): boolean {
  if (!have()) {
    return false;
  }
  const equipment = hazardEquipment(hazards());

  equipment.forEach((equip) => {
    const num = equip.id - 9404; //Equipment items are 9405 - 9409,
    visitUrl("place.php?whichplace=spacegate&action=sg_requisition");
    visitUrl(`choice.php?whichchoice=1233&option=${num}`);
  });
  equipment.forEach((equip) => {
    if (availableAmount(equip) !== 1) {
      return false;
    }
  });
  return true;
}

type Vaccine =
  | "Rainbow"
  | "Broad-Spectrum"
  | "Emotional"
  | "Elemental Resistance"
  | "Stats"
  | "Monster Level";

/**
 * Gets the requested Spacegate Vaccine Buff
 *
 * @param choice Name of Vaccine or Buff type requested
 * @returns Whether you successfully acquired a vaccine
 */
export function getVaccine(choice: Vaccine): boolean {
  if (get("_spacegateVaccine")) {
    return false;
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
  return get("_spacegateVaccine");
}

/**
 * Dials the requested gate address
 *
 * @param address 7-letter string indicating the coordinates of the planet you wish to dial.
 * @returns Whether you successfully dialled the requested planet.
 */
export function dial(address: string): boolean {
  if (!have() || dialled()) {
    //cannot dial if we already have or don't own it.
    return false;
  }
  if (!address.match(`^[A-Za-z]+$`) || address.length !== 7) {
    throw "Invalid Spacegate Address - must be exactly 7 alphabetic characters";
  } else {
    cliExecute(`spacegate destination ${address}`);
  }
  return dialled() && planetCoords() === address;
}

/**
 * Dials a random gate address
 *
 * @returns Whether you successfully dialled a planet.
 */
export function dialRandom(): boolean {
  if (!have() || dialled()) {
    //cannot dial if we already have or don't own it.
    return false;
  }
  cliExecute("spacegate destination random");
  return dialled();
}
