import {
  abort,
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  Item,
  Location,
  MafiaClass,
  Monster,
  Path,
  Phylum,
  print,
  Servant,
  Skill,
  Slot,
  Stat,
  Thrall,
} from "kolmafia";

import { splitByCommasWithEscapes } from "./utils";

const concatTemplateString = (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) =>
  literals.raw.reduce(
    (acc, literal, i) => acc + literal + (placeholders[i] ?? ""),
    ""
  );

const createSingleConstant = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) => {
  const tagFunction = (
    literals: TemplateStringsArray,
    ...placeholders: string[]
  ) => {
    const input = concatTemplateString(literals, ...placeholders);
    type I = InstanceType<typeof Type>;
    try {
      return Type.get<I>(input);
    } catch (error) {
      print(`${error}; you should probably update KoLmafia!`, "red");
    }
    abort();
  };
  tagFunction.none = Type.none as T;
  return tagFunction;
};

const createPluralConstant =
  <T extends MafiaClass>(Type: typeof MafiaClass & (new () => T)) =>
  (literals: TemplateStringsArray, ...placeholders: string[]) => {
    const input = concatTemplateString(literals, ...placeholders);

    type I = InstanceType<typeof Type>;

    if (input === "") {
      return Type.all<I>();
    }

    try {
      return Type.get<I>(splitByCommasWithEscapes(input));
    } catch (error) {
      const message = `${error}`;
      const match = message.match(
        RegExp(`Bad ${Type.name.toLowerCase()} value: (.*)`)
      );
      if (match) {
        print(
          `${match[0]}; if you're certain that this ${Type} exists and is spelled correctly, please update KoLMafia`,
          "red"
        );
      } else {
        print(message);
      }
    }
    abort();
  };

/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */
export const $bounty = createSingleConstant(Bounty);

/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */
export const $bounties = createPluralConstant(Bounty);

/**
 * A Class specified by name.
 *
 * @category In-game constant
 */
export const $class = createSingleConstant(Class);

/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */
export const $classes = createPluralConstant(Class);

/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */
export const $coinmaster = createSingleConstant(Coinmaster);

/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */
export const $coinmasters = createPluralConstant(Coinmaster);

/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */
export const $effect = createSingleConstant(Effect);

/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */
export const $effects = createPluralConstant(Effect);

/**
 * An Element specified by name.
 *
 * @category In-game constant
 */
export const $element = createSingleConstant(Element);

/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */
export const $elements = createPluralConstant(Element);

/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */
export const $familiar = createSingleConstant(Familiar);

/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */
export const $familiars = createPluralConstant(Familiar);

/**
 * An Item specified by name.
 *
 * @category In-game constant
 */
export const $item = createSingleConstant(Item);

/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */
export const $items = createPluralConstant(Item);

/**
 * A Location specified by name.
 *
 * @category In-game constant
 */
export const $location = createSingleConstant(Location);

/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */
export const $locations = createPluralConstant(Location);

/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */
export const $monster = createSingleConstant(Monster);

/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */
export const $monsters = createPluralConstant(Monster);

/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */
export const $phylum = createSingleConstant(Phylum);

/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */
export const $phyla = createPluralConstant(Phylum);

/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */
export const $servant = createSingleConstant(Servant);

/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */
export const $servants = createPluralConstant(Servant);

/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */
export const $skill = createSingleConstant(Skill);

/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */
export const $skills = createPluralConstant(Skill);

/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */
export const $slot = createSingleConstant(Slot);

/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */
export const $slots = createPluralConstant(Slot);

/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */
export const $stat = createSingleConstant(Stat);

/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */
export const $stats = createPluralConstant(Stat);

/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */
export const $thrall = createSingleConstant(Thrall);

/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */
export const $thralls = createPluralConstant(Thrall);

/**
 * A Path specified by name.
 *
 * @category In-game constant
 */
export const $path = createSingleConstant(Path);

/**
 * A list of Paths specified by a comma-separated list of names.
 * For a list of all possible Paths, leave the template string blank.
 *
 * @category In-game constant
 */
export const $paths = createPluralConstant(Path);
