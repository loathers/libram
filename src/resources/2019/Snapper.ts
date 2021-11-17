import { cliExecute, haveFamiliar, myFamiliar, useFamiliar } from "kolmafia";
import { get } from "../../property";

const familiar = Familiar.get("Red-Nosed Snapper");

/**
 * Map of phylum to item that phylum drops.
 */
export const phylumItem = new Map<Phylum, Item>([
  [Phylum.get("Beast"), Item.get("patch of extra-warm fur")],
  [Phylum.get("Bug"), Item.get("a bug's lymph")],
  [Phylum.get("Constellation"), Item.get("micronova")],
  [Phylum.get("Construct"), Item.get("industrial lubricant")],
  [Phylum.get("Demon"), Item.get("infernal snowball")],
  [Phylum.get("Dude"), Item.get("human musk")],
  [Phylum.get("Elemental"), Item.get("livid energy")],
  [Phylum.get("Elf"), Item.get("peppermint syrup")],
  [Phylum.get("Fish"), Item.get("fish sauce")],
  [Phylum.get("Goblin"), Item.get("guffin")],
  [Phylum.get("Hippy"), Item.get("organic potpourri")],
  [Phylum.get("Hobo"), Item.get("beggin' cologne")],
  [Phylum.get("Horror"), Item.get("powdered madness")],
  [Phylum.get("Humanoid"), Item.get("vial of humanoid growth hormone")],
  [Phylum.get("Mer-kin"), Item.get("Mer-kin eyedrops")],
  [Phylum.get("Orc"), Item.get("boot flask")],
  [Phylum.get("Penguin"), Item.get("envelope full of Meat")],
  [Phylum.get("Pirate"), Item.get("Shantix™")],
  [Phylum.get("Plant"), Item.get("goodberry")],
  [Phylum.get("Slime"), Item.get("extra-strength goo")],
  [Phylum.get("Undead"), Item.get("unfinished pleasure")],
  [Phylum.get("Weird"), Item.get("non-Euclidean angle]")],
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
