import { Effect, getWorkshed, runChoice, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $effect, $item } from "../../template-string";
import { clamp } from "../../utils";

export const item = $item`model train set`;

export function installed(): boolean {
  return getWorkshed() === item;
}

export function have(): boolean {
  return installed() || have_(item);
}

export enum Station {
  UNKNOWN = "",
  EMPTY = "empty",
  MEAT = "meat_mine",
  MP = "tower_fizzy",
  EXP = "viewing_platform",
  HOT_RES = "tower_frozen",
  COLD_DMG = "tower_frozen",
  STENCH_RES = "spooky_graveyard",
  SPOOKY_DMG = "spooky_graveyard",
  BRIDGE_PARTS = "logging_mill",
  CANDY = "candy_factory",
  COAL = "coal_hopper",
  COLD_RES = "tower_sewage",
  STENCH_DMG = "tower_sewage",
  SPOOKY_RES = "oil_refinery",
  SLEAZE_DMG = "oil_refinery",
  SLEAZE_RES = "oil_bridge",
  HOT_DMG = "oil_bridge",
  ML = "water_bridge",
  MOXIE_EXP = "groin_silo",
  BOOZE = "grain_silo",
  MYSTICALITY_EXP = "brain_silo",
  MUSCLE_EXP = "brawn_silo",
  FOOD_DROPS = "prawn_silo",
  LAST_FOOD = "trackside_diner",
  ORE = "ore_hopper",
}

const trainsetEffects: Map<Station, Effect> = new Map([
  [Station.MP, $effect`Carbonated`],
  [Station.HOT_RES, $effect`Frozen`],
  [Station.STENCH_RES, $effect`Shivering Spine`],
  [Station.COLD_RES, $effect`Hot Soupy Garbage`],
  [Station.SLEAZE_RES, $effect`Burningly Oiled`],
  [Station.SPOOKY_RES, $effect`Spookily Greasy`],
  [Station.ML, $effect`Troubled Waters`],
  [Station.FOOD_DROPS, $effect`Craving Prawns`],
]);
const trainsetEffectsDoubled: Map<Station, Effect> = new Map([
  [Station.MP, $effect`Double Carbonated`],
  [Station.HOT_RES, $effect`Double Frozen`],
  [Station.STENCH_RES, $effect`Doubly Shivering Spine`],
  [Station.COLD_RES, $effect`Double Hot Soupy Garbage`],
  [Station.SLEAZE_RES, $effect`Doubly Burningly Oiled`],
  [Station.SPOOKY_RES, $effect`Doubly Spookily Greasy`],
  [Station.ML, $effect`Doubly Troubled Waters`],
  [Station.FOOD_DROPS, $effect`Doubly Craving Prawns`],
]);

export function effect(station: Station): Effect | null {
  return trainsetEffects.get(station) ?? null;
}

export function doubledEffect(station: Station): Effect | null {
  return trainsetEffectsDoubled.get(station) ?? null;
}

export type Cycle = [
  Station,
  Station,
  Station,
  Station,
  Station,
  Station,
  Station,
  Station
];

export function cycle(): Cycle {
  return get("trainsetConfiguration").split(",") as Cycle;
}

export function nextConfigurable(): number {
  return clamp(
    get("trainsetPosition", 0) - get("lastTrainsetConfiguration", 0),
    0,
    40
  );
}

export function canConfigure(): boolean {
  return installed() && !nextConfigurable();
}

const pieces: Station[] = [
  Station.EMPTY,
  Station.MEAT,
  Station.MP,
  Station.EXP,
  Station.HOT_RES,
  Station.STENCH_RES,
  Station.BRIDGE_PARTS,
  Station.CANDY,
  Station.COAL,
  Station.COLD_RES,
  Station.UNKNOWN,
  Station.SPOOKY_RES,
  Station.SLEAZE_RES,
  Station.ML,
  Station.MOXIE_EXP,
  Station.BOOZE,
  Station.MYSTICALITY_EXP,
  Station.MUSCLE_EXP,
  Station.FOOD_DROPS,
  Station.LAST_FOOD,
  Station.ORE,
];

function stationToInt(station: Station): number {
  return pieces.indexOf(station);
}

export function setConfiguration(configuration: Cycle): boolean {
  if (!canConfigure()) return false;

  visitUrl("campground.php?action=workshed");

  runChoice(
    1,
    `forceoption=0${configuration.map(
      (station, index) => `&slot[${index}]=${stationToInt(station)}`
    )}`
  );
  visitUrl("main.php");

  const currentConfiguration = cycle();
  return configuration.every(
    (station, index) => station === currentConfiguration[index]
  );
}
