import {
  booleanModifier,
  Class,
  classModifier,
  Effect,
  effectModifier,
  Familiar,
  Item,
  Monster,
  monsterModifier,
  numericModifier,
  Skill,
  skillModifier,
  Stat,
  statModifier,
  stringModifier,
} from "kolmafia";

import {
  BooleanModifier,
  booleanModifiers,
  ClassModifier,
  classModifiers,
  EffectModifier,
  effectModifiers,
  MonsterModifier,
  monsterModifiers,
  NumericModifier,
  numericModifiers,
  SkillModifier,
  skillModifiers,
  StatModifier,
  statModifiers,
  StringModifier,
  stringModifiers,
} from "./modifierTypes";
import { arrayContains } from "./utils";

export function get(
  name: BooleanModifier,
  subject?: string | Item | Effect
): boolean;
export function get(name: ClassModifier, subject: string | Item): Class;
export function get(name: EffectModifier, subject: string | Item): Effect;
export function get(name: MonsterModifier, subject: Effect): Monster;
export function get(
  name: NumericModifier,
  subject?: string | Item | Effect | Skill | Familiar
): number;
export function get(name: SkillModifier, subject: string | Item): Skill;
export function get(
  name: StringModifier,
  subject?: string | Effect | Item
): string;
export function get(name: StatModifier, subject: Effect): Stat;
/**
 *
 * @param name
 * @param subject
 */
export function get(
  name:
    | BooleanModifier
    | ClassModifier
    | EffectModifier
    | MonsterModifier
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

  if (arrayContains(name, monsterModifiers)) {
    return monsterModifier(subject as Effect, name);
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

export type ModifierValue<T> = T extends BooleanModifier
  ? boolean
  : T extends ClassModifier
  ? Class
  : T extends EffectModifier
  ? Effect
  : T extends MonsterModifier
  ? Monster
  : T extends NumericModifier
  ? number
  : T extends SkillModifier
  ? Skill
  : T extends StatModifier
  ? Stat
  : T extends StringModifier
  ? string
  : string;

export type Modifiers = Partial<{
  [T in
    | BooleanModifier
    | ClassModifier
    | EffectModifier
    | MonsterModifier
    | NumericModifier
    | SkillModifier
    | StatModifier
    | StringModifier]: ModifierValue<T>;
}>;
/**
 * Merge two Modifiers objects into one, summing all numeric modifiers, ||ing all boolean modifiers, and otherwise letting the second object overwrite the first.
 *
 * @param modifiers1 Modifiers objects to be merged onto.
 * @param modifiers2 Modifiers object to merge.
 * @returns A single Modifiers object obtained by merging.
 */
function pairwiseMerge(modifiers1: Modifiers, modifiers2: Modifiers) {
  const returnValue = { ...modifiers1, ...modifiers2 };
  for (const modifier in modifiers1) {
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        returnValue[modifier] =
          (modifiers1[modifier] ?? 0) + (modifiers2[modifier] ?? 0);
      }
      if (arrayContains(modifier, booleanModifiers)) {
        returnValue[modifier] =
          (modifiers1[modifier] ?? false) || (modifiers2[modifier] ?? false);
      }
    }
  }

  return returnValue;
}

/**
 * Merge arbitrarily many Modifiers objects into one, summing all numeric modifiers, and ||ing all boolean modifiers.
 *
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */
export function mergeModifiers(...modifierss: Modifiers[]): Modifiers {
  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}
