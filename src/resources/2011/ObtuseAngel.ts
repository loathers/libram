import { Monster, useFamiliar } from "kolmafia";
import { Copier } from "../../Copier";
import { have as _have, isCurrentFamiliar } from "../../lib";
import { get } from "../../property";
import { $familiar } from "../../template-string";

const familiar = $familiar`Obtuse Angel`;

/**
 * @returns whether the player has an Obtuse Angel
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * @returns number of badly romantic arrows used today
 */
export function getBadlyRomanticArrowUses(): number {
  return Math.max(0, get("_badlyRomanticArrows"));
}

/**
 * @returns whether badly romantic arrow can still be used
 */
export function haveBadlyRomanticArrowUsesRemaining(): boolean {
  return getBadlyRomanticArrowUses() === 0;
}

/**
 * @returns whether the player could use badly romantic arrow in theory
 */
export function couldUseBadlyRomanticArrow(): boolean {
  return have() && haveBadlyRomanticArrowUsesRemaining();
}

/**
 * Prepares badly romantic arrow for use
 *
 * @returns success
 */
export function prepareBadlyRomanticArrow(): boolean {
  return useFamiliar(familiar);
}

/**
 * @returns whether the player can use badly romantic arrow right now
 */
export function canUseBadlyRomanticArrow(): boolean {
  return isCurrentFamiliar(familiar) && haveBadlyRomanticArrowUsesRemaining();
}

/**
 * @returns current badly romantic arrow monster target
 */
export function getBadlyRomanticArrowMonster(): Monster | null {
  return get("romanticTarget");
}

export const BadlyRomanticArrow = new Copier(
  () => couldUseBadlyRomanticArrow(),
  () => prepareBadlyRomanticArrow(),
  () => canUseBadlyRomanticArrow(),
  () => getBadlyRomanticArrowMonster()
);
