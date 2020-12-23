import { haveFamiliar, useFamiliar } from "kolmafia";
import { $familiar, property } from "../";
import { Copier } from "../Copier";
import { isCurrentFamiliar } from "../lib";

export const familiar = $familiar`Obtuse Angel`;

export function have() {
  return haveFamiliar(familiar);
}

export function getBadlyRomanticArrowUses() {
  return Math.max(0, property.getNumber("_badlyRomanticArrows"));
}

export function haveBadlyRomanticArrowUsesRemaining() {
  return getBadlyRomanticArrowUses() === 0;
}

export function couldUseBadlyRomanticArrow() {
  return have() && haveBadlyRomanticArrowUsesRemaining();
}

export function prepareBadlyRomanticArrow() {
  return useFamiliar(familiar);
}

export function canUseBadlyRomanticArrow() {
  return isCurrentFamiliar(familiar) && haveBadlyRomanticArrowUsesRemaining();
}

export function getBadlyRomanticArrowMonster() {
  return property.getMonster("romanticTarget");
}

export const BadlyRomanticArrow = new Copier(
  () => couldUseBadlyRomanticArrow(),
  () => prepareBadlyRomanticArrow(),
  () => canUseBadlyRomanticArrow(),
  () => getBadlyRomanticArrowMonster()
);
