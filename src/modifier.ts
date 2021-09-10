import {
  booleanModifier,
  classModifier,
  effectModifier,
  numericModifier,
  skillModifier,
  statModifier,
  stringModifier,
} from "kolmafia";

import { arrayContains } from "./utils";

import {
  BooleanModifier,
  booleanModifiers,
  ClassModifier,
  classModifiers,
  EffectModifier,
  effectModifiers,
  NumericModifier,
  numericModifiers,
  SkillModifier,
  skillModifiers,
  StatModifier,
  statModifiers,
  StringModifier,
  stringModifiers,
} from "./modifierTypes";

export function get(
  name: BooleanModifier,
  subject?: string | Item | Effect
): boolean;
export function get(name: ClassModifier, subject: string | Item): Class;
export function get(name: EffectModifier, subject: string | Item): Effect;
export function get(
  name: NumericModifier,
  subject?: string | Item | Effect | Skill | Familiar
): number;
export function get(name: SkillModifier, subject: string | Item): Skill;
export function get(name: StringModifier, subject?: string | Item): string;
export function get(name: StatModifier, subject: Effect): Stat;
export function get(
  name:
    | BooleanModifier
    | ClassModifier
    | EffectModifier
    | NumericModifier
    | SkillModifier
    | StringModifier
    | StatModifier,
  subject?: string | Item | Effect | Skill | Familiar
): unknown {
  if (arrayContains(name, booleanModifiers)) {
    return subject === undefined
      ? booleanModifier(name)
      : booleanModifier(subject as string, name);
  }

  if (arrayContains(name, classModifiers)) {
    return classModifier(subject as string, name);
  }

  if (arrayContains(name, effectModifiers)) {
    return effectModifier(subject as string, name);
  }

  if (arrayContains(name, numericModifiers)) {
    return subject === undefined
      ? numericModifier(name)
      : numericModifier(subject as string, name);
  }

  if (arrayContains(name, skillModifiers)) {
    return skillModifier(subject as string, name);
  }

  if (arrayContains(name, stringModifiers)) {
    return subject === undefined
      ? stringModifier(name)
      : stringModifier(subject as string, name);
  }

  if (arrayContains(name, statModifiers)) {
    return statModifier(subject as Effect, name);
  }
}
