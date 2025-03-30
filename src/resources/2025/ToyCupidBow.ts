import { Familiar, toFamiliar } from "kolmafia";
import { have as have_ } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";
import { clamp } from "../../utils.js";

/**
 * @returns Whether you `have` the Toy Cupid's bow
 */
export function have(): boolean {
  return have_($item`toy Cupid bow`);
}

/**
 * @returns The current familiar your cupid bow is getting the equip of (null if there isn't one)
 */
export function currentFamiliar(): Familiar | null {
  return get("cupidBowLastFamiliar");
}

/**
 * @returns An array of familiars who have received their drops from the cupid bow today
 */
export function familiarsToday(): Familiar[] {
  return get("_cupidBowFamiliars")
    .split(";")
    .map((id) => toFamiliar(Number(id)));
}

/**
 * Determine whether you've obtained the equipment of a given familiar with the TCB today
 * @param familiar The familiar in question
 * @returns Whether you've obtained the equipment from that familiar via the TCB today
 */
export function doneToday(familiar: Familiar): boolean {
  return RegExp(`(?:^|;)${familiar.id}(?:$|;)`).test(get("_cupidBowFamiliars"));
}

/**
 * Calculate the number of fights needed to get a drop
 * @param familiar The familiar in question; defaults to the one currently charged by your bow
 * @returns The number of turns necessary to get this familiar's drop; Infinity if you can't get it today
 */
export function turnsLeft(familiar = currentFamiliar()): number {
  if ((familiarsToday() as (Familiar | null)[]).includes(familiar))
    return Infinity;
  if (currentFamiliar() !== familiar) return 5;
  return clamp(5 - get("cupidBowFights"), 1, 5);
}
