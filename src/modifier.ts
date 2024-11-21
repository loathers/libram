import {
  booleanModifier,
  cliExecuteOutput,
  Effect,
  Familiar,
  familiarWeight,
  getProperty,
  Item,
  myFamiliar,
  numericModifier,
  print,
  Skill,
  splitModifiers,
  stringModifier,
} from "kolmafia";
import { have } from "./lib.js";

import {
  BooleanModifier,
  booleanModifiersSet,
  ModifierType,
  NumericModifier,
  numericModifiersSet,
  StringModifier,
  stringModifiersSet,
} from "./modifierTypes.js";
import { $effect } from "./template-string.js";
import { sum } from "./utils.js";
import { StringProperty } from "./propertyTypes.js";

/**
 * Type guard that determines if a given string is a boolean modifier
 * @param modifier The modifier in question
 * @returns Whether the string in question is a valid boolean modifier
 */
export function isBooleanModifier(
  modifier: string,
): modifier is BooleanModifier {
  return (booleanModifiersSet as Set<string>).has(modifier);
}

/**
 * Type guard that determines if a given string is a numeric modifier
 * @param modifier The modifier in question
 * @returns Whether the string in question is a valid numeric modifier
 */
export function isNumericModifier(
  modifier: string,
): modifier is NumericModifier {
  return (numericModifiersSet as Set<string>).has(modifier);
}

/**
 * Type guard that determines if a given string is a string modifier
 * @param modifier The modifier in question
 * @returns Whether the string in question is a valid string modifier
 */
export function isStringModifier(modifier: string): modifier is StringModifier {
  return (stringModifiersSet as Set<string>).has(modifier);
}

/**
 * Type guard that determines if a given string is a valid modifier
 * @param modifier The modifier in question
 * @returns Whether the string in question is a valid modifier
 */
export function isValidModifier(modifier: string): modifier is ModifierType {
  return (
    isNumericModifier(modifier) ||
    isBooleanModifier(modifier) ||
    isStringModifier(modifier)
  );
}

export function get(
  name: BooleanModifier,
  subject?: string | Item | Effect,
): boolean;
export function get(
  name: NumericModifier,
  subject?: string | Item | Effect | Skill | Familiar,
): number;
export function get(
  name: StringModifier,
  subject?: string | Effect | Item,
): string;
/**
 * Get the value of a modifier
 *
 * @param name Modifier name
 * @param subject Subject of modifier
 * @returns Value of modifier
 */
export function get(
  name: ModifierType,
  subject?: string | Item | Effect | Skill | Familiar,
): unknown {
  if (isBooleanModifier(name)) {
    return subject === undefined
      ? booleanModifier(name)
      : booleanModifier(subject as string, name);
  }

  if (isNumericModifier(name)) {
    return subject === undefined
      ? numericModifier(name)
      : numericModifier(subject as string, name);
  }

  if (isStringModifier(name)) {
    return subject === undefined
      ? stringModifier(name)
      : stringModifier(subject as string, name);
  }
}

export type ModifierValue<T> = T extends BooleanModifier
  ? boolean
  : T extends NumericModifier
    ? number
    : T extends StringModifier
      ? string
      : string;

export type Modifiers<T extends ModifierType = ModifierType> = Partial<{
  [K in T]: ModifierValue<K>;
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
      if (isNumericModifier(modifier)) {
        returnValue[modifier] =
          (modifiers1[modifier] ?? 0) + (modifiers2[modifier] ?? 0);
      }
      if (isBooleanModifier(modifier)) {
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

/**
 * Prints the modtrace to the log.
 * Example: printModtrace("Meat Drop") or printModtrace(["Item Drop", "Booze Drop"])
 *
 * @param inputModifiers A string (or string[]) containing the modtrace lookup term(s).
 * @param baseModifier A string where all the info about modifiers in the string[] array can be grabbed with this one lookup term. (Automatically generated in most cases)
 * @param componentColor The print color for the sum returned for each input modifier
 * @param totalColor The print color for the total sum over every input modifier
 * @returns void
 */
export function printModtrace(
  inputModifiers: string | string[], // the user's list of modifiers to look up
  baseModifier?: string,
  componentColor = "purple",
  totalColor = "blue",
): void {
  if (typeof inputModifiers === "string")
    return printModtrace([inputModifiers], inputModifiers);
  else if (inputModifiers.length === 0) return;
  else if (!baseModifier) {
    return inputModifiers
      .filter(
        (mod1) =>
          !inputModifiers.some((mod2) => mod2 !== mod1 && mod1.includes(mod2)),
      )
      .forEach((baseMod) =>
        printModtrace(
          inputModifiers.filter((mod) => mod.includes(baseMod)),
          baseMod,
        ),
      );
  }

  const htmlOutput = cliExecuteOutput(`modtrace ${baseModifier}`);
  // The list of matched modifiers that mafia returns
  const modtraceModifiers = Array.from(
    htmlOutput.match(RegExp(/(>)(.*?)(<\/td>)/g)) ?? [],
  )
    .map((s) => s.slice(1, -5))
    .slice(2);

  if (
    !modtraceModifiers.some(
      (modifier) => modifier.toLowerCase() === baseModifier.toLowerCase(),
    )
  ) {
    return print(
      `Could not find exact string match of ${baseModifier} in ${inputModifiers.toString()}`,
      "red",
    );
  }

  const initialVal =
    baseModifier.toLowerCase() === "familiar weight"
      ? (() => {
          const wt = familiarWeight(myFamiliar());
          print(`[Familiar Weight] Base weight (${wt})`);
          return wt;
        })()
      : 0;
  const modifierVals = new Map(
    modtraceModifiers.map((modifier) => [modifier, initialVal]),
  ); // Maps modifier name to its value
  const lowerCaseModifiers = inputModifiers.map((modifier) =>
    modifier.toLowerCase(),
  );

  Array.from(htmlOutput.match(RegExp(/<tr>(.*?)<\/tr>/g)) ?? [])
    .slice(1)
    .map((s) => s.slice(4, -5))
    .forEach((s) => {
      const rowArr = Array.from(
        s
          .replace(RegExp(/><\/td>/g), ">0</td>")
          .match(RegExp(/(>)(.*?)(<\/td>)/g)) ?? [],
      ).map((s) => s.slice(1, -5));
      const rowName = rowArr[1];
      rowArr
        .slice(2)
        .filter((e, idx) => idx % 2 === 0)
        .forEach((e, idx) => {
          const val = parseFloat(e);
          modifierVals.set(
            modtraceModifiers[idx],
            (modifierVals.get(modtraceModifiers[idx]) ?? 0) + val,
          );
          if (
            val !== 0 &&
            lowerCaseModifiers.includes(modtraceModifiers[idx].toLowerCase())
          ) {
            print(`[${modtraceModifiers[idx]}] ${rowName} (${val.toFixed(1)})`);
          }
        });
    });

  const total = sum(modtraceModifiers, (modifier) => {
    if (lowerCaseModifiers.includes(modifier.toLowerCase())) {
      let modVal = modifierVals.get(modifier) ?? 0;
      if (
        have($effect`Bow-Legged Swagger`) &&
        modifier.includes("Weapon Damage")
      ) {
        print(`[${modifier}] Bow-Legged Swagger (${modVal.toFixed(1)})`);
        modVal *= 2;
      }
      print(`${modifier} => ${modVal.toFixed(1)}`, componentColor);
      return modVal;
    } else return 0;
  });

  print(`Total ${baseModifier}: ${total.toFixed(1)}`, totalColor);
}

/**
 * Take the sum of a modifier over an array of Skills, Effects, and Items
 *
 * @param modifier A NumericModifier that we want to find the total value of
 * @param subjects A rested array of Skills, Effects, and Items that we want to find the total value of
 * @returns The sum of the appropriate modifier for all of the subjects
 */
export function getTotalModifier(
  modifier: NumericModifier,
  ...subjects: (Skill | Effect | Item)[]
): number {
  return sum(subjects, (subject) => get(modifier, subject));
}

/**
 * Translate a pref into a `Modifiers` object by wrapping mafia's `splitModifiers`
 * @param pref The name of the mafia preference in question
 * @param translator Optional object to help translate fields into their appropriate values
 * @param translator.numeric How to translate the values from `splitModifiers` into numbers for numeric modifiers; defaults to Number
 * @param translator.str How to translate the values from `splitModifiers` into strings for string modifiers; defaults to String
 * @param translator.bool How to translate the values from `splitModifiers` into booleans for boolean modifiers; defaults to comparing to the string `"true"`
 * @returns A `Modifiers` object corresponding to the given preference.
 */
export function parseModifiers(
  pref: StringProperty,
  {
    numeric = Number,
    str = String,
    bool = (val) => val === "true",
  }: Partial<{
    numeric: (value: string) => number;
    str: (value: string) => string;
    bool: (value: string) => boolean;
  }> = {},
): Modifiers {
  return Object.entries(splitModifiers(getProperty(pref))).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key as ModifierType]: isBooleanModifier(key)
        ? bool(value)
        : isNumericModifier(key)
          ? numeric(value)
          : str(value),
    }),
    {} as Modifiers,
  );
}
