import { Item, runChoice, visitUrl } from "kolmafia";
import { have as _have, totalFamiliarWeight } from "../../lib.js";
import { $familiar, $item } from "../../template-string.js";

/**
 * @returns Whether the player has a Reagnimated Gnome in their terrarium
 */
export function have(): boolean {
  return _have($familiar`Reagnimated Gnome`);
}

export const bodyParts = {
  ears: $item`gnomish swimmer's ears`,
  lung: $item`gnomish coal miner's lung`,
  elbow: $item`gnomish tennis elbow`,
  kgnee: $item`gnomish housemaid's kgnee`,
  foot: $item`gnomish athlete's foot`,
} as const;

export type BodyPart = keyof typeof bodyParts;

/**
 * @returns Reagnimated Gnome parts that have already been retrieved from the arena
 */
export function chosenParts(): Item[] {
  return Object.values(bodyParts).filter((part) => _have(part));
}

/**
 * Fetch Reagnimated Gnome part from the arena
 *
 * @param part Reagnimated Gnome body part
 * @returns Success
 */
export function choosePart(part: BodyPart): boolean {
  if (!have()) return false;
  if (_have(bodyParts[part])) return true;
  visitUrl("arena.php");
  runChoice(4);
  return chosenParts().includes(bodyParts[part]);
}

/**
 * Estimate average adventures per combat victory for a Reagnimated Gnome
 * wearing a gnomish housemaid's kgnee.
 * This averages over counter progress rather than predicting the next combat.
 *
 * @param weight Buffed familiar weight
 * @returns Expected adventures
 */
export function expectedAdvsPerCombat(
  weight = totalFamiliarWeight($familiar`Reagnimated Gnome`),
): number {
  return 0.01 + (Math.min(weight, 222) / 1000) * 0.99;
}
