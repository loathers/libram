import {
  cliExecute,
  Familiar,
  haveFamiliar,
  Item,
  myFamiliar,
  Phylum,
  useFamiliar,
} from "kolmafia";
import { get } from "../../property";

const familiar = Familiar.get("Red-Nosed Snapper");

/**
 * Map of phylum to item that phylum drops.
 */
export const phylumItem = new Map<Phylum, Item>([
  [Phylum.get("beast"), Item.get("patch of extra-warm fur")],
  [Phylum.get("bug"), Item.get("a bug's lymph")],
  [Phylum.get("constellation"), Item.get("micronova")],
  [Phylum.get("construct"), Item.get("industrial lubricant")],
  [Phylum.get("demon"), Item.get("infernal snowball")],
  [Phylum.get("dude"), Item.get("human musk")],
  [Phylum.get("elemental"), Item.get("livid energy")],
  [Phylum.get("elf"), Item.get("peppermint syrup")],
  [Phylum.get("fish"), Item.get("fish sauce")],
  [Phylum.get("goblin"), Item.get("guffin")],
  [Phylum.get("hippy"), Item.get("organic potpourri")],
  [Phylum.get("hobo"), Item.get("beggin' cologne")],
  [Phylum.get("horror"), Item.get("powdered madness")],
  [Phylum.get("humanoid"), Item.get("vial of humanoid growth hormone")],
  [Phylum.get("mer-kin"), Item.get("Mer-kin eyedrops")],
  [Phylum.get("orc"), Item.get("boot flask")],
  [Phylum.get("penguin"), Item.get("envelope full of Meat")],
  [Phylum.get("pirate"), Item.get("Shantix™")],
  [Phylum.get("plant"), Item.get("goodberry")],
  [Phylum.get("slime"), Item.get("extra-strength goo")],
  [Phylum.get("undead"), Item.get("unfinished pleasure")],
  [Phylum.get("weird"), Item.get("non-Euclidean angle")],
]);

/**
 * Map of drop item to phylum it drops from.
 */
export const itemPhylum = new Map(
  [...phylumItem].map(([phylum, item]) => [item, phylum])
);

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
  return get("redSnapperPhylum");
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
