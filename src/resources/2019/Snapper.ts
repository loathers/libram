import { cliExecute, haveFamiliar, myFamiliar, toPhylum } from "kolmafia";
import { $phylum, get } from "../..";
import { $familiar } from "../../template-string";

/**
 * Return whether you have a Red-Nosed Snapper.
 * @returns True if you have a Red-Nosed Snapper, false otherwise.
 */
export function have(): boolean {
  return haveFamiliar($familiar`Red-Nosed Snapper`);
}

/**
 * Get the phylum currently being tracked by the snapper.
 * @returns Tracked phylum, or null if no phylum tracked.
 */
export function getTrackedPhylum(): Phylum | null {
  const phylum = toPhylum(get("redSnapperPhylum"));
  return phylum === $phylum`none` ? null : phylum;
}

/**
 * Set snapper tracking to a certain phylum. Assumes snapper is currently your familiar.
 * @param phylum Phylum to track.
 */
export function trackPhylum(phylum: Phylum): void {
  if (myFamiliar() !== $familiar`Red-Nosed Snapper`) {
    throw new Error("Need Red-Nosed Snapper out to set phylum!");
  }
  cliExecute(`snapper ${phylum}`);
}

/**
 * Get progress to next snapper drop.
 * @returns Number of fights completed (out of 11) to reach next drop.
 */
export function getProgress(): number {
  return get("redSnapperProgress");
}
