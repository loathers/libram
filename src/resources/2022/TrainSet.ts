import { Effect, getWorkshed, runChoice, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { clamp, Tuple } from "../../utils";

export const item = $item`model train set`;

/**
 *
 */
export function installed(): boolean {
  return getWorkshed() === item;
}

/**
 *
 */
export function have(): boolean {
  return installed() || have_(item);
}

export enum Station {
  /**
   * Unknown station
   */
  UNKNOWN = "",
  /**
   * Empty station
   */
  EMPTY = "empty",
  /**
   * Gain 800 meat
   */
  GAIN_MEAT = "meat_mine",
  /**
   * Effect: Regenerate MP
   */
  TOWER_FIZZY = "tower_fizzy",
  /**
   * Gain mus, mys, mox stats
   */
  VIEWING_PLATFORM = "viewing_platform",
  /**
   * Effect: Hot resist, cold damage
   */
  TOWER_FROZEN = "tower_frozen",
  /**
   * Effect: Stench resist, spooky damage
   */
  SPOOKY_GRAVEYARD = "spooky_graveyard",
  /**
   * Get smut bridge part, or stats
   */
  LOGGING_MILL = "logging_mill",
  /**
   * Get some candy
   */
  CANDY_FACTORY = "candy_factory",
  /**
   * Double strength of next station
   */
  COAL_HOPPER = "coal_hopper",
  /**
   * Effect: Cold resist, stench damage
   */
  TOWER_SEWAGE = "tower_sewage",
  /**
   * Effect: Spooky resist, sleaze damage
   */
  OIL_REFINERY = "oil_refinery",
  /**
   * Effect: Sleaze resist, hot damage
   */
  OIL_BRIDGE = "oil_bridge",
  /**
   * Effect: Increased Monster Level
   */
  WATER_BRIDGE = "water_bridge",
  /**
   * Get moxie stats
   */
  GROIN_SILO = "groin_silo",
  /**
   * Get random booze
   */
  GRAIN_SILO = "grain_silo",
  /**
   * Get mys stats
   */
  BRAIN_SILO = "brain_silo",
  /**
   * Get muscle stats
   */
  BRAWN_SILO = "brawn_silo",
  /**
   * Effect: 50% food drop
   */
  PRAWN_SILO = "prawn_silo",
  /**
   * Dupe last food dropped, or gain random food
   */
  TRACKSIDE_DINER = "trackside_diner",
  /**
   * Drop random ore, or trapper ore if known
   */
  ORE_HOPPER = "ore_hopper",
}

const trainsetEffects: Map<Station, Effect> = new Map([
  [Station.TOWER_FIZZY, Effect.get("Carbonated")],
  [Station.TOWER_FROZEN, Effect.get("Frozen")],
  [Station.SPOOKY_GRAVEYARD, Effect.get("Shivering Spine")],
  [Station.TOWER_SEWAGE, Effect.get("Hot Soupy Garbage")],
  [Station.OIL_BRIDGE, Effect.get("Burningly Oiled")],
  [Station.OIL_REFINERY, Effect.get("Spookily Greasy")],
  [Station.WATER_BRIDGE, Effect.get("Troubled Waters")],
  [Station.PRAWN_SILO, Effect.get("Craving Prawns")],
]);
const trainsetEffectsDoubled: Map<Station, Effect> = new Map([
  [Station.TOWER_FIZZY, Effect.get("Double Carbonated")],
  [Station.TOWER_FROZEN, Effect.get("Double Frozen")],
  [Station.SPOOKY_GRAVEYARD, Effect.get("Doubly Shivering Spine")],
  [Station.TOWER_SEWAGE, Effect.get("Double Hot Soupy Garbage")],
  [Station.OIL_BRIDGE, Effect.get("Doubly Burningly Oiled")],
  [Station.OIL_REFINERY, Effect.get("Doubly Spookily Greasy")],
  [Station.WATER_BRIDGE, Effect.get("Doubly Troubled Waters")],
  [Station.PRAWN_SILO, Effect.get("Doubly Craving Prawns")],
]);

/**
 *
 * @param station
 */
export function effect(station: Station): Effect | null {
  return trainsetEffects.get(station) ?? null;
}

/**
 *
 * @param station
 */
export function doubledEffect(station: Station): Effect | null {
  return trainsetEffectsDoubled.get(station) ?? null;
}

export type Cycle = Tuple<Station, 8>;

/**
 *
 */
export function cycle(): Cycle {
  return get("trainsetConfiguration").split(",") as Cycle;
}

/**
 *
 */
export function nextConfigurable(): number {
  return clamp(
    get("lastTrainsetConfiguration") + 40 - get("trainsetPosition"),
    0,
    40
  );
}

/**
 *
 */
export function canConfigure(): boolean {
  return installed() && !nextConfigurable();
}

const pieces: Station[] = [
  Station.EMPTY,
  Station.GAIN_MEAT,
  Station.TOWER_FIZZY,
  Station.VIEWING_PLATFORM,
  Station.TOWER_FROZEN,
  Station.SPOOKY_GRAVEYARD,
  Station.LOGGING_MILL,
  Station.CANDY_FACTORY,
  Station.COAL_HOPPER,
  Station.TOWER_SEWAGE,
  Station.UNKNOWN,
  Station.OIL_REFINERY,
  Station.OIL_BRIDGE,
  Station.WATER_BRIDGE,
  Station.GROIN_SILO,
  Station.GRAIN_SILO,
  Station.BRAIN_SILO,
  Station.BRAWN_SILO,
  Station.PRAWN_SILO,
  Station.TRACKSIDE_DINER,
  Station.ORE_HOPPER,
];

/**
 *
 * @param station
 */
function stationToInt(station: Station): number {
  return pieces.indexOf(station);
}

/**
 *
 * @param configuration
 */
export function setConfiguration(configuration: Cycle): boolean {
  if (!canConfigure()) return false;

  visitUrl("campground.php?action=workshed");

  runChoice(
    1,
    `forceoption=0${configuration
      .map((station, index) => `&slot[${index}]=${stationToInt(station)}`)
      .join("")}`
  );
  visitUrl("main.php");

  const currentConfiguration = cycle();
  return configuration.every(
    (station, index) => station === currentConfiguration[index]
  );
}

/**
 *
 */
export function next(): Station {
  return cycle()[get("trainsetPosition") % 8];
}
