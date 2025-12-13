import { Location } from "kolmafia";
import {
  AdventureTarget,
  adventureTargetToWeightedMap,
  have as have_,
} from "../../lib.js";
import { $familiar, $phylum } from "../../template-string.js";
import { get } from "../../property.js";
import { sum } from "../../utils.js";

const BONE_PHYLA = new Map([
  [$phylum`beast`, 0.3],
  [$phylum`bug`, 0.05],
  [$phylum`construct`, 0.1],
  [$phylum`demon`, 0.4],
  [$phylum`elf`, 0.5],
  [$phylum`fish`, 0.15],
  [$phylum`goblin`, 0.4],
  [$phylum`hobo`, 0.5],
  [$phylum`humanoid`, 0.4],
  [$phylum`orc`, 0.7],
  [$phylum`penguin`, 0.2],
  [$phylum`pirate`, 0.7],
  [$phylum`dude`, 0.5],
  [$phylum`undead`, 0.3],
  [$phylum`weird`, 0.2],
]);

/**
 * @returns Whether or not you have the Skeleton of Crimbo Past.
 */
export function have(): boolean {
  return have_($familiar`Skeleton of Crimbo Past`);
}

/**
 * @param target The target you expect to fight; accepts Monster, Location, or map of <Monster, number>
 * @returns The odds of getting a knucklebone drop
 */
export function expectedBones(target: AdventureTarget): number {
  if (!have()) return 0;
  if (get("_knuckleboneDrops") >= 100) return 0;
  if (target instanceof Location) {
    return expectedBones(adventureTargetToWeightedMap(target));
  }
  if (target instanceof Map) {
    return sum(
      [...target.entries()],
      ([monster, rate]) => rate * expectedBones(monster),
    );
  }

  if (target.attributes.includes("SKELETON")) return 0.9;

  return BONE_PHYLA.get(target.phylum) ?? 0;
}

/**
 * Returns the standard 10% improvement the can adds; in case scripts find this helpful over a magic number
 */
export const CANE_BONUS = 0.1;
