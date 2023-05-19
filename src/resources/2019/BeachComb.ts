import {
  cliExecute,
  Effect,
  gamedayToInt,
  getProperty,
  handlingChoice,
  Item,
  runChoice,
} from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $effect } from "../../template-string";
import { clamp } from "../../utils";

/**
 * Determines whether we `have` the beach comb
 *
 * @returns Whether we `have` the beach comb
 */
export function have(): boolean {
  return have_(Item.get("Beach Comb"));
}

/**
 * Determines whether we `have` the beach comb or the driftwood beach comb
 *
 * @returns Whether we `have` either the beach comb or the driftwood beach comb
 */
export function available(): boolean {
  return have() || have_(Item.get("driftwood beach comb"));
}

export const headBuffs = [
  $effect`Hot-Headed`,
  $effect`Cold as Nice`,
  $effect`A Brush with Grossness`,
  $effect`Does It Have a Skull In There??`,
  $effect`Oiled, Slick`,
  $effect`Lack of Body-Building`,
  $effect`We're All Made of Starfish`,
  $effect`Pomp & Circumsands`,
  $effect`Resting Beach Face`,
  $effect`Do I Know You From Somewhere?`,
  $effect`You Learned Something Maybe!`,
] as const;

export const head = {
  HOT: $effect`Hot-Headed`,
  COLD: $effect`Cold as Nice`,
  STENCH: $effect`A Brush with Grossness`,
  SPOOKY: $effect`Does It Have a Skull In There??`,
  SLEAZE: $effect`Oiled, Slick`,
  MUSCLE: $effect`Lack of Body-Building`,
  MYSTICALITY: $effect`We're All Made of Starfish`,
  INITIATIVE: $effect`Resting Beach Face`,
  FAMILIAR: $effect`Do I Know You From Somewhere?`,
  EXPERIENCE: $effect`You Learned Something Maybe!`,
} as const;

/**
 * Column starts at 0, rows at 1
 */
export type BeachTile = { minute: number; row: number; column: number };

/**
 * Calculates the tide level for a given game day
 *
 * @param day The day to check the tide level of; defaults to today
 * @returns The tide level as an integer
 */
export function tideLevel(day = gamedayToInt()): number {
  const dayOfMonth = 1 + (day % 8);
  return 4 - Math.abs(4 - dayOfMonth);
}

/**
 * Determines whether a given tile can currently be combed, based on the tide level
 *
 * @param tile The tile to check
 * @returns Whether today's tides permit the combing of this tile
 */
export function canComb(tile: BeachTile): boolean {
  return tile.row > tideLevel();
}

/**
 * @returns The number of free combs we have available for today
 */
export function freeCombs(): number {
  return available() ? clamp(11 - get("_freeBeachWalksUsed"), 0, 11) : 0;
}

/**
 * Comb a tile or tiles; skips any presently uncombablle tiles
 *
 * @param tiles The tiles to comb
 */
export function comb(...tiles: BeachTile[]): void {
  if (!available() || !tiles.length) return;

  for (const tile of tiles) {
    if (canComb(tile)) {
      const { minute, row, column } = tile;
      cliExecute(`beach wander ${minute}`);
      cliExecute(`beach comb ${row} ${column}`);
    }
  }

  if (handlingChoice()) runChoice(5);
}

/**
 * Determines whether a given Beach Head can be combed today
 *
 * @param target The head in question, either as the Effect it grants or as its name
 * @returns Whether the given head is combable
 */
export function headAvailable(target: Effect | keyof typeof head): boolean {
  const effect = target instanceof Effect ? target : head[target];
  const headNumber = 1 + headBuffs.indexOf(effect);

  return (
    getProperty("beachHeadsUnlocked")
      .split(",")
      .includes(headNumber.toString()) &&
    !getProperty("_beachHeadsUsed").split(",").includes(headNumber.toString())
  );
}

/**
 * Tries to comb a given Beach Head
 *
 * @param target The Beach Head to comb, given either as its effect or as its name
 * @returns Whether we have the head effect at the end of the whole rigamarole; this means that if you `tryHead` when you already have the effect, it will (presumably) fail to comb but will return `true`
 */
export function tryHead(target: Effect | keyof typeof head): boolean {
  const effect = target instanceof Effect ? target : head[target];
  if (!headBuffs.includes(effect)) return false;
  if (!headAvailable(target)) return false;
  cliExecute(effect.default);
  return have_(effect);
}
