import { Monster, useFamiliar } from "kolmafia";
import { Copier } from "../../Copier";
import { have as _have, isCurrentFamiliar } from "../../lib";
import { get } from "../../property";
import { $familiar } from "../../template-string";

export const familiar = $familiar`Obtuse Angel`;

/**
 * Returns true if the player has an Obtuse Angel
 */
export function have(): boolean {
  return _have(familiar);
}

/**
 * Returns number of badly romantic arrows used
 */
export function getBadlyRomanticArrowUses(): number {
  return Math.max(0, get("_badlyRomanticArrows"));
}

/**
 * Returns true if badly romantic arrow can still be used
 */
export function haveBadlyRomanticArrowUsesRemaining(): boolean {
  return getBadlyRomanticArrowUses() === 0;
}

/**
 * Returns true if the player could use badly romantic arrow in theory
 */
export function couldUseBadlyRomanticArrow(): boolean {
  return have() && haveBadlyRomanticArrowUsesRemaining();
}

/**
 * Prepares badly romantic arrow for use
 */
export function prepareBadlyRomanticArrow(): boolean {
  return useFamiliar(familiar);
}

/**
 * Returns true if the player can use badly romantic arrow right now
 */
export function canUseBadlyRomanticArrow(): boolean {
  return isCurrentFamiliar(familiar) && haveBadlyRomanticArrowUsesRemaining();
}

/**
 * Returns the current badly romantic arrow monster target
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
