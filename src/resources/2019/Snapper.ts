import {
  cliExecute,
  haveFamiliar,
  myFamiliar,
  toPhylum,
  useFamiliar,
} from "kolmafia";
import { get } from "../../property";

const familiar = Familiar.get("Red-Nosed Snapper");

/**
 * Return whether you have a Red-Nosed Snapper.
 * @returns True if you have a Red-Nosed Snapper, false otherwise.
 */
export function have(): boolean {
  return haveFamiliar(familiar);
}

/**
 * Get the phylum currently being tracked by the snapper.
 * @returns Tracked phylum, or null if no phylum tracked.
 */
export function getTrackedPhylum(): Phylum | null {
  const phylum = toPhylum(get("redSnapperPhylum"));
  return phylum === Phylum.get("none") ? null : phylum;
}

/**
 * Set snapper tracking to a certain phylum.
 * @param phylum Phylum to track.
 */
export function trackPhylum(phylum: Phylum): void {
  const currentFamiliar = myFamiliar();
  try {
    useFamiliar(familiar);
    cliExecute(`snapper ${phylum}`);
  } finally {
    useFamiliar(currentFamiliar);
  }
}

/**
 * Get progress to next snapper drop.
 * @returns Number of fights completed (out of 11) to reach next drop.
 */
export function getProgress(): number {
  return get("redSnapperProgress");
}
