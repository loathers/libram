import { availableAmount, Skill, useSkill as useSkill_ } from "kolmafia";
import { get } from "../../property.js";
import { $item, $skill } from "../../template-string.js";
import { examine } from "../../lib.js";

/** designer sweatpants */
const item = $item`designer sweatpants`;

/** designer sweatpants sweat skills */
export const skills = {
  SweatFlick: $skill`Sweat Flick`,
  SweatSpray: $skill`Sweat Spray`,
  SweatFlood: $skill`Sweat Flood`,
  SipSomeSweat: $skill`Sip Some Sweat`,
  SweatSip: $skill`Sweat Sip`,
  DrenchYourselfInSweat: $skill`Drench Yourself in Sweat`,
  SweatOutSomeBooze: $skill`Sweat Out Some Booze`,
  MakeSweatAde: $skill`Make Sweat-Ade`,
} as const;

/** Map of skill to sweat cost */
const sweatSkillCost = new Map<Skill, number>([
  [skills.SweatFlick, 1],
  [skills.SweatSpray, 3],
  [skills.SweatFlood, 5],
  [skills.SipSomeSweat, 5],
  [skills.SweatSip, 5],
  [skills.DrenchYourselfInSweat, 15],
  [skills.SweatOutSomeBooze, 25],
  [skills.MakeSweatAde, 50],
]);

/**
 * Do you own designer sweatpants
 * @returns Whether you have the designer sweatpants
 */
export function have(): boolean {
  return availableAmount(item) > 0;
}

/**
 * Get the current sweat amount
 * @returns The amount of sweat
 */
export function sweat(): number {
  return get("sweat");
}

/**
 * Refresh the current sweat amount by visiting the item description
 */
export function refresh(): void {
  examine(item);
}

/**
 * Get the sweat cost of a skill
 * @param skill The skill to check
 * @returns The sweat cost, or Infinty for an invalid skill
 */
export function sweatCost(skill: Skill): number {
  return sweatSkillCost.get(skill) ?? Infinity;
}

/**
 * Check if a sweat skill can be cast
 * @param skill The skill to check
 * @returns If this skill can be cast
 */
export function canUseSkill(skill: Skill): boolean {
  return have() && skill.dailylimit !== 0 && sweatCost(skill) <= sweat();
}

/**
 * Cast a sweat skill, on failure refresh sweat amount
 * @param skill The skill to cast
 * @returns If this skill was cast successfully
 */
export function useSkill(skill: Skill): boolean {
  if (!canUseSkill(skill)) return false;
  const sweatAmt = sweat();
  const result = useSkill_(1, skill) && sweatAmt !== sweat();
  if (!result) {
    refresh();
  }
  return result;
}
