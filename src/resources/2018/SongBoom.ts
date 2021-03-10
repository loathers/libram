import { cliExecute } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const item = $item`SongBoom™ BoomBox`;
export function have(): boolean {
  return haveItem(item);
}

type SongBoomSong =
  | "Eye of the Giger"
  | "Food Vibrations"
  | "Remainin' Alive"
  | "These Fists Were Made for Punchin'"
  | "Total Eclipse of Your Meat"
  | null;

export const songBoomSongs = new Set<string>([
  "Eye of the Giger",
  "Food Vibrations",
  "Remainin' Alive",
  "These Fists Were Made for Punchin'",
  "Total Eclipse of Your Meat",
]);

const keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat",
};

/**
 * Current song.
 */
export function song(): SongBoomSong {
  const stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? (stored as SongBoomSong) : null;
}

/**
 * Song changes left today.
 */
export function songChangesLeft(): number {
  return get("_boomBoxSongsLeft");
}

/**
 * Change the song.
 * @param newSong Song to change to.
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
 * Progress to next song drop (e.g. gathered meat-clip).
 */
export function dropProgress(): number {
  return get("_boomBoxFights");
}
