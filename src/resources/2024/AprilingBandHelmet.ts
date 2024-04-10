import {
  Effect,
  Item,
  MafiaClass,
  myHash,
  runChoice,
  toEffect,
  toItem,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { arrayContains } from "../../utils";

const helmet = $item`Apriling band helmet`;

/**
 * @returns whether you `have` the Apriling band helmet
 */
export function have(): boolean {
  return have_(helmet);
}

export const MARCHING_SONGS = Object.freeze([
  "Patrol Beat",
  "Battle Cadence",
  "Celebration Bop",
] as const);
export type MarchingSong = typeof MARCHING_SONGS[number];
export const MARCHING_SONG_EFFECTS = Object.freeze(
  MARCHING_SONGS.map((song) => toEffect(song))
);

export const INSTRUMENTS = Object.freeze([
  "Apriling band saxophone",
  "Apriling band quad tom",
  "Apriling band tuba",
  "Apriling band staff",
  "Apriling band piccolo",
] as const);
export type Instrument = typeof INSTRUMENTS[number];
export const INSTRUMENT_ITEMS = Object.freeze(
  INSTRUMENTS.map((instrument) => toItem(instrument))
);

const visitConduct = () => visitUrl("inventory.php?pwd&action=apriling");

/**
 * @returns Whether we can currently join a new section of our Apriling band
 */
export function canJoinSection(): boolean {
  return have() && get("_aprilBandInstruments") < 2;
}

function makeConductFunction<
  M extends MafiaClass & (Effect | Item),
  S extends string
>(
  mafiaClass: typeof MafiaClass & (new () => M),
  canDo: () => boolean,
  set: readonly S[],
  offset: number
) {
  return (input: S | M): boolean => {
    if (!canDo()) return false;

    const [name, instance]: [string, M] =
      typeof input === "object"
        ? [input.toString(), input]
        : [input, mafiaClass.get(input)];

    if (have_(instance)) return true;
    const key = set.indexOf(name as S);
    if (key === -1) return false;
    visitConduct();
    runChoice(key + offset);
    runChoice(9);
    return have_(instance);
  };
}

/**
 * Joins the given section of your Apriling band, returning whether you successfully obtained its instrument
 *
 * @param section The section of your band to join--either the instrument's name as a string, or the item itself.
 *
 * @returns Whether we have the item, at the end of all things
 */
export const joinSection = makeConductFunction<Item, Instrument>(
  Item,
  canJoinSection,
  INSTRUMENTS,
  1
);

/**
 * @returns Whether we can currently change the marching song of our Apriling Band
 */
export function canChangeSong(): boolean {
  return have() && get("nextAprilBandTurn") <= totalTurnsPlayed();
}

/**
 * Instructs your Apriling band to play the given song, returning whether it's successfully playing
 *
 * @param song The song for your band to play--either the effect's name or the effect itself.
 *
 * @returns Whether we have the effect, at the end of all things
 */
export const changeSong = makeConductFunction<Effect, MarchingSong>(
  Effect,
  canChangeSong,
  MARCHING_SONGS,
  4
);

/**
 * Conduct your Apriling band helmet
 *
 * @param result The instrument (as an item or string) or song (as an effect or string) you want out of this thing
 * @returns Whether we successfully completed the task
 */
export function conduct(
  result: Item | Instrument | Effect | MarchingSong
): boolean {
  if (
    (typeof result === "object" && result instanceof Item) ||
    arrayContains(result, INSTRUMENTS)
  ) {
    return joinSection(result);
  }
  return changeSong(result);
}

/**
 * Plays a given Apriling band instrument
 *
 * @param instrument The instrument to play
 * @param acquire Whether or not we should obtain the instrument if we don't currently have it
 * @returns Whether we successfully played our instrument
 */
export function play(instrument: Instrument | Item, acquire = false): boolean {
  const item =
    typeof instrument === "object" ? instrument : Item.get(instrument);
  if (!(acquire ? joinSection : have_)(item)) return false;
  const currentUsesRemaining = item.dailyusesleft;
  if (currentUsesRemaining <= 0) return false;
  visitUrl(
    `inventory.php?pwd=${myHash()}&iid=${item.id}&action=aprilplay`,
    false
  );
  return item.dailyusesleft !== currentUsesRemaining;
}
