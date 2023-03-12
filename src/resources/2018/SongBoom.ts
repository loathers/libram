import { cliExecute } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const item = $item`SongBoom™ BoomBox`;
/**
 * @returns Whether we `have` the SongBoom™ BoomBox
 */
export function have(): boolean {
  return haveItem(item);
}

const keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat",
};

export type SongBoomSong = keyof typeof keywords | null;

export const songBoomSongs = new Set(Object.keys(keywords));

/**
 * @returns The `SongBoomSong` you currently have active; `null` if none is active at this time
 */
export function song(): SongBoomSong {
  const stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? (stored as SongBoomSong) : null;
}

/**
 * @returns Song changes left today.
 */
export function songChangesLeft(): number {
  return get("_boomBoxSongsLeft");
}

/**
 * Change the song. Throws an error if unable.
 *
 * @param newSong Song to change to.
 * @returns Whether we successfully changed the song; `false` thus means that this was already our current song.
 */
export function setSong(newSong: SongBoomSong): boolean {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    cliExecute(`boombox ${newSong ? keywords[newSong] : "none"}`);
    return true;
  } else {
    return false;
  }
}

/**
 * @returns Progress to next song drop (e.g. gathered meat-clip).
 */
export function dropProgress(): number {
  return get("_boomBoxFights");
}
