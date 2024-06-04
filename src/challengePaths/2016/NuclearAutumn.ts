import { visitUrl } from "kolmafia";
import { $path } from "../../template-string.js";

/**
 * Visits the Cooling Tank on level 8 of the Fallout shelter to gain 300 rads
 */
export function coolingTank(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault8");
}

/**
 * Visits the Spa Simulation Chamber on level 4 of the Fallout shelter for 100 turns of "100% all stats"
 */
export function spa(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault3");
}

/**
 * Visits the Chronodynamics Laboratory on level 5 of the Fallout shelter to permanently increase radiation level by 3
 */
export function chronoLab(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault5");
}

export const path = $path`Nuclear Autumn`;
