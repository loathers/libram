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
 *
 */
export function have(): boolean {
  return have_(Item.get("Beach Comb"));
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
 *
 * @param day
 */
export function tideLevel(day = gamedayToInt()): number {
  const dayOfMonth = 1 + (day % 8);
  return 4 - Math.abs(4 - dayOfMonth);
}

/**
 *
 * @param root0
 * @param root0.row
 */
export function canComb({ row }: BeachTile): boolean {
  return row > tideLevel();
}

/**
 *
 */
export function freeCombs(): number {
  return have() ? clamp(11 - get("_freeBeachWalksUsed"), 0, 11) : 0;
}

/**
 *
 * @param {...any} tiles
 */
export function comb(...tiles: BeachTile[]): void {
  if (!have() || !tiles.length) return;

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
 *
 * @param target
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
 *
 * @param target
 */
export function tryHead(target: Effect | keyof typeof head): boolean {
  const effect = target instanceof Effect ? target : head[target];
  if (!headBuffs.includes(effect)) return false;
  if (!headAvailable(target)) return false;
  cliExecute(effect.default);
  return have_(effect);
}
