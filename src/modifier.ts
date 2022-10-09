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

function replaceAll(
  str: string,
  searchValue: string,
  replaceValue: string
): string {
  const newStr = str.replace(searchValue, replaceValue);
  if (newStr === str) return newStr;
  return replaceAll(newStr, searchValue, replaceValue);
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
  if (typeof modifiers === "string") {
    return printModtrace([modifiers], modifiers);
  } else {
    if (modifiers.length === 0) return;
    if (!baseModifier) {
      const baseModifiers = new Map(
        modifiers.map((key) => {
          return [key, 1];
        })
      );

      modifiers.forEach((keyThis) => {
        for (const keyNext of modifiers) {
          if (keyThis === keyNext) continue;
          if (keyThis.includes(keyNext)) {
            baseModifiers.set(keyThis, 0);
            break;
          }
        }
      });

      modifiers.forEach((keyThis) => {
        if (baseModifiers.get(keyThis) ?? 0 !== 0) {
          const modifiersSubset = [keyThis];

          for (const keyNext of modifiers) {
            if (keyThis === keyNext) continue;
            if (keyNext.includes(keyThis)) modifiersSubset.push(keyNext);
          }
          printModtrace(modifiersSubset, keyThis);
        }
      });
    } else {
      let htmlOutput = cliExecuteOutput(`modtrace ${baseModifier}`);
      let htmlHeader = htmlOutput.substring(
        htmlOutput.indexOf("<tr>") + 4,
        htmlOutput.indexOf("</tr>")
      );
      let headers = [] as string[];
      let headerMatches = htmlHeader.match("(>)(.*?)(</td>)");
      while (headerMatches) {
        const header = headerMatches[2];
        headers.push(header);

        const idx =
          headerMatches[0].length + htmlHeader.search("(>)(.*?)(</td>)");
        htmlHeader = htmlHeader.substring(idx);
        headerMatches = htmlHeader.match("(>)(.*?)(</td>)");
      }
      headers = headers.slice(2);

      const exactModifierColIdx = headers.findIndex(
        (header) => header.toLowerCase() === baseModifier.toLowerCase()
      );

      if (exactModifierColIdx === -1) {
        print(
          `Could not find exact string match of ${baseModifier} in ${modifiers.toString()}`,
          "red"
        );
        return;
      }

      let totalVal = 0.0;
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
        totalVal += familiarWeight(myFamiliar());
        print(`[Familiar Weight] Base weight (${totalVal})`);
      }

      htmlOutput = htmlOutput.substring(
        htmlOutput.indexOf("</tr>") + 5,
        htmlOutput.indexOf("</table>")
      );

      while (htmlOutput.length > 0) {
        const idxStart = htmlOutput.indexOf("<tr>");
        const idxEnd = htmlOutput.indexOf("</tr>");
        if (idxStart === -1) break;

        let row = replaceAll(
          htmlOutput.substring(idxStart + 4, idxEnd),
          "></td>",
          ">0</td>"
        );
        const rowArr = [] as string[];
        let rowMatches = row.match("(>)(.*?)(</td>)");
        while (rowMatches) {
          rowArr.push(rowMatches[2]);
          row = row.replace(rowMatches[0], "");
          rowMatches = row.match("(>)(.*?)(</td>)");
        }
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
              print(`[${headers[idx]}] ${rowArr[1]} (${val.toFixed(1)})`);
            }
          });

        htmlOutput = htmlOutput.substring(idxEnd + 5);
      }

      let total = 0.0;
      for (const modifier of headers) {
        if (lowerCaseModifiers.includes(modifier.toLowerCase())) {
          let totalVal = modifierVals.get(modifier) ?? 0;
          if (modifier.toLowerCase() === "weapon damage") {
            if (have($effect`Bow-Legged Swagger`)) {
              print(
                `[Weapon Damage] Bow-Legged Swagger (${totalVal.toFixed(1)})`
              );
              totalVal += totalVal;
            }
          } else if (modifier.toLowerCase() === "weapon damage percent") {
            if (have($effect`Bow-Legged Swagger`)) {
              print(
                `[Weapon Damage Percent] Bow-Legged Swagger (${totalVal.toFixed(
                  1
                )})`
              );
              totalVal += totalVal;
            }
          }
          print(`${modifier} => ${totalVal.toFixed(1)}`, "purple");

          total += totalVal;
        }
      }

      print(`Total ${baseModifier}: ${total.toFixed(1)}`, "blue");
    }
  }
}
