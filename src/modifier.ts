import "core-js/modules/es.object.values";

import {
  booleanModifier,
  Class,
  classModifier,
  cliExecuteOutput,
  Effect,
  effectModifier,
  Familiar,
  familiarWeight,
  Item,
  Monster,
  monsterModifier,
  myFamiliar,
  numericModifier,
  print,
  Skill,
  skillModifier,
  Stat,
  statModifier,
  stringModifier,
} from "kolmafia";
import { have } from "./lib";

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
import { $effect } from "./template-string";
import { arrayContains, sumNumbers } from "./utils";

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
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */
export function mergeModifiers(...modifierss: Modifiers[]): Modifiers {
  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}

/**
 * Prints the modtrace to the log.
 * @param modifiers A string (or string[]) containing the modtrace lookup term(s).
 * @param baseModifier A string where all the info about modifiers in the string[] array can be grabbed with this one lookup term. (Automatically generated in most cases)
 * Example: printModtrace("Meat Drop") or printModtrace(["Item Drop", "Booze Drop"])
 */

export function printModtrace(
  modifiers: string | string[],
  baseModifier?: string
): void {
  if (typeof modifiers === "string")
    return printModtrace([modifiers], modifiers);
  else if (modifiers.length === 0) return;
  else if (!baseModifier) {
    modifiers
      .filter(
        (mod1) =>
          !modifiers.some((mod2) => mod2 !== mod1 && mod1.includes(mod2))
      )
      .forEach((baseMod) =>
        printModtrace(
          modifiers.filter((mod) => mod.includes(baseMod)),
          baseMod
        )
      );
    return;
  }

  const htmlOutput = cliExecuteOutput(`modtrace ${baseModifier}`);
  const headers = Array.from(
    htmlOutput.match(RegExp("(>)(.*?)(</td>)", "g")) ?? []
  )
    .map((s) => s.slice(1, -5))
    .slice(2);

  if (
    headers.findIndex(
      (header) => header.toLowerCase() === baseModifier.toLowerCase()
    ) === -1
  ) {
    print(
      `Could not find exact string match of ${baseModifier} in ${modifiers.toString()}`,
      "red"
    );
    return;
  }

  let total = 0.0;
  // Maps modifier name to its value
  const modifierVals = new Map(
    headers.map((header) => {
      return [header, 0];
    })
  );

  const lowerCaseModifiers = modifiers.map((modifier) =>
    modifier.toLowerCase()
  );

  if (baseModifier.toLowerCase() === "familiar weight") {
    total += familiarWeight(myFamiliar());
    print(`[Familiar Weight] Base weight (${total})`);
  }

  Array.from(htmlOutput.match(RegExp("<tr>(.*?)</tr>", "g")) ?? [])
    .slice(1)
    .map((s) => s.slice(4, -5))
    .forEach((s) => {
      const rowArr = Array.from(
        s
          .replace(RegExp("></td>", "g"), ">0</td>")
          .match(RegExp("(>)(.*?)(</td>)", "g")) ?? []
      ).map((s) => s.slice(1, -5));
      const rowName = rowArr[1];
      rowArr
        .slice(2)
        .filter((e, idx) => idx % 2 === 0)
        .forEach((e, idx) => {
          const val = parseInt(e);
          modifierVals.set(
            headers[idx],
            (modifierVals.get(headers[idx]) ?? 0) + val
          );
          if (
            val !== 0 &&
            lowerCaseModifiers.includes(headers[idx].toLowerCase())
          ) {
            print(`[${headers[idx]}] ${rowName} (${val.toFixed(1)})`);
          }
        });
    });

  total += sumNumbers(
    headers.map((modifier) => {
      if (lowerCaseModifiers.includes(modifier.toLowerCase())) {
        let modVal = modifierVals.get(modifier) ?? 0;
        if (
          have($effect`Bow-Legged Swagger`) &&
          modifier.includes("Weapon Damage")
        ) {
          print(`[${modifier}] Bow-Legged Swagger (${modVal.toFixed(1)})`);
          modVal *= 2;
        }
        print(`${modifier} => ${modVal.toFixed(1)}`, "purple");
        return modVal;
      } else return 0;
    })
  );

  print(`Total ${baseModifier}: ${total.toFixed(1)}`, "blue");
}
