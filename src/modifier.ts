import { booleanModifier, classModifier, effectModifier, numericModifier, skillModifier, statModifier, stringModifier } from "kolmafia";

import { BooleanModifier, booleanModifiers, ClassModifier, classModifiers, EffectModifier, effectModifiers, NumericModifier, numericModifiers, SkillModifier, skillModifiers, StatModifier, statModifiers, StringModifier, stringModifiers } from "./modifierTypes";

function isBooleanModifier(name: string): name is BooleanModifier {
  return booleanModifiers.includes(name as BooleanModifier);
}

function isClassModifier(name: string): name is ClassModifier {
  return classModifiers.includes(name as ClassModifier);
}

function isEffectModifier(name: string): name is EffectModifier {
  return effectModifiers.includes(name as EffectModifier);
}

function isNumericModifier(name: string): name is NumericModifier {
  return numericModifiers.includes(name as NumericModifier);
}

function isSkillModifier(name: string): name is SkillModifier {
  return skillModifiers.includes(name as SkillModifier);
}

function isStringModifier(name: string): name is StringModifier {
  return stringModifiers.includes(name as StringModifier);
}

function isStatModifier(name: string): name is StatModifier {
  return statModifiers.includes(name as StatModifier);
}

export function get(name: BooleanModifier, subject?: string | Item | Effect): boolean
export function get(name: ClassModifier, subject: string | Item): Class
export function get(name: EffectModifier, subject: string | Item): Effect
export function get(name: NumericModifier, subject?: string | Item | Effect | Skill | Familiar): number
export function get(name: SkillModifier, subject: string | Item): Skill
export function get(name: StringModifier, subject?: string | Item): string
export function get(name: StatModifier, subject: Effect): Stat
export function get(name: BooleanModifier | ClassModifier | EffectModifier | NumericModifier | SkillModifier | StringModifier | StatModifier, subject?: string | Item | Effect | Skill | Familiar): unknown {
  if (isBooleanModifier(name)) {
    return (subject === undefined) ? booleanModifier(name) : booleanModifier(subject as string, name);
  }

  if (isClassModifier(name)) {
    return classModifier(subject as string, name);
  }

  if (isEffectModifier(name)) {
    return effectModifier(subject as string, name);
  }

  if (isNumericModifier(name)) {
    return (subject === undefined) ? numericModifier(name) : numericModifier(subject as string, name);
  }

  if (isSkillModifier(name)) {
    return skillModifier(subject as string, name);
  }

  if (isStringModifier(name)) {
    return (subject === undefined) ? stringModifier(name) : stringModifier(subject as string, name);
  }

  if (isStatModifier(name)) {
    return statModifier(subject as Effect, name);
  }
}
