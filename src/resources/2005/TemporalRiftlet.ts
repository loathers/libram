import { have as _have, totalFamiliarWeight } from "../../lib.js";
import { $familiar } from "../../template-string.js";

/**
 * @returns Whether the player has a Temporal Riftlet in their terrarium
 */
export function have(): boolean {
  return _have($familiar`Temporal Riftlet`);
}

/**
 * Calculate expected adventures per combat victory for a Temporal Riftlet.
 *
 * @param weight Buffed familiar weight
 * @returns Expected adventures
 */
export function expectedAdvsPerCombat(
  weight = totalFamiliarWeight($familiar`Temporal Riftlet`),
): number {
  return Math.min(weight, 222) / 1000;
}
