import { haveFamiliar, useFamiliar } from "kolmafia";
import { Copier } from "../../Copier";
import { isCurrentFamiliar } from "../../lib";
import { get } from "../../property";
import { $familiar } from "../../template-string";

export const familiar = $familiar`Obtuse Angel`;

export function have(): boolean {
  return haveFamiliar(familiar);
}

export function getBadlyRomanticArrowUses(): number {
  return Math.max(0, get("_badlyRomanticArrows"));
}

export function haveBadlyRomanticArrowUsesRemaining(): boolean {
  return getBadlyRomanticArrowUses() === 0;
}

export function couldUseBadlyRomanticArrow(): boolean {
  return have() && haveBadlyRomanticArrowUsesRemaining();
}

export function prepareBadlyRomanticArrow(): boolean {
  return useFamiliar(familiar);
}

export function canUseBadlyRomanticArrow(): boolean {
  return isCurrentFamiliar(familiar) && haveBadlyRomanticArrowUsesRemaining();
}

export function getBadlyRomanticArrowMonster(): Monster | null {
  return get("romanticTarget");
}

export const BadlyRomanticArrow = new Copier(
  () => couldUseBadlyRomanticArrow(),
  () => prepareBadlyRomanticArrow(),
  () => canUseBadlyRomanticArrow(),
  () => getBadlyRomanticArrowMonster()
);
