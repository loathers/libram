import {
  adv1,
  choiceFollowsFight,
  Class,
  Effect,
  Element,
  getAutoAttack,
  inMultiFight,
  Item,
  Location,
  Monster,
  Phylum,
  removeProperty,
  runCombat,
  setAutoAttack,
  Skill,
  Stat,
  urlEncode,
  visitUrl,
  xpath,
} from "kolmafia";
import { getTodaysHolidayWanderers } from "./lib.js";
import {
  overlappingItemNames,
  overlappingSkillNames,
} from "./overlappingNames.js";
import { get, set } from "./property.js";

const MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @param name Name of the macro
 * @category Combat
 * @returns {number} The macro ID.
 */
export function getMacroId(name = MACRO_NAME): number {
  const query = `//select[@name="macroid"]/option[text()="${name}"]/@value`;
  const macroText = visitUrl("account_combatmacros.php");
  let macroMatches = xpath(macroText, query);

  if (macroMatches.length === 0) {
    visitUrl("account_combatmacros.php?action=new");
    const newMacroText = visitUrl(
      `account_combatmacros.php?macroid=0&name=${name}&macrotext=abort&action=save`,
    );
    macroMatches = xpath(newMacroText, query);
  }

  if (macroMatches.length === 0) {
    // We may have hit the macro cap
    if (xpath(macroText, '//select[@name="macroid"]/option').length >= 100) {
      throw new InvalidMacroError(
        `Please delete at least one existing macro to make some space for Libram`,
      );
    }
    // Otherwise who knows why it failed
    throw new InvalidMacroError(`Could not find or create macro ${name}`);
  }

  return parseInt(macroMatches[0], 10);
}

type ItemOrName = Item | string;
/**
 * Converts an item name to a Item, or passes through an existing instance of Item
 *
 * @param itemOrName Item name or Item instance
 * @returns KoLmafia Item instance
 */
function itemOrNameToItem(itemOrName: ItemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

/**
 * Create a string of the item or items provided that is compatible with BALLS syntax and is non-ambiguous
 *
 * @param itemOrItems Item name, item instance, or 2-tuple of item name or item instance
 * @returns BALLS macro-compatible value for item or items provided
 */
function itemOrItemsBallsMacroName(
  itemOrItems: ItemOrName | [ItemOrName, ItemOrName],
): string {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    const item = itemOrNameToItem(itemOrItems);
    return !overlappingItemNames.includes(item.name)
      ? item.name
      : item.id.toFixed(0);
  }
}

/**
 * Generate a BALLS macro condition to check wither the player has either a single or a 2-tuple of combat items
 *
 * @param itemOrItems Single or 2-tuple of combat items
 * @returns BALLS macro condition
 */
function itemOrItemsBallsMacroPredicate(
  itemOrItems: ItemOrName | [ItemOrName, ItemOrName],
): string {
  if (Array.isArray(itemOrItems)) {
    if (itemOrItems[0] === itemOrItems[1])
      return `hastwocombatitems ${itemOrItemsBallsMacroName(itemOrItems[0])}`;
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return `hascombatitem ${itemOrItemsBallsMacroName(itemOrItems)}`;
  }
}

// The ones that are arrayable are ones we would only ever want to combine with an OR
// You can't be fighting more than one different type of monster, or in more than one snarfblat, etc
type PreBALLSPredicate =
  | string
  | Monster
  | Monster[]
  | Effect
  | Skill
  | Item
  | Location
  | Location[]
  | Class
  | Class[]
  | Stat
  | Stat[]
  | Phylum
  | Phylum[]
  | Element
  | Element[]
  | [Item, Item];

type SkillOrName = Skill | string;
/**
 * Converts a skill name to a Skill, or passes through an existing instance of Skill
 *
 * @param skillOrName Skill name or Skill instance
 * @returns KoLmafia Skill instance
 */
function skillOrNameToSkill(skillOrName: SkillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

/**
 * Get a skill name in a form that is appropriate for BALLS macros
 *
 * @param skillOrName Skill name or Skill instance
 * @returns BALLS macro-suitable skill name
 */
function skillBallsMacroName(skillOrName: SkillOrName) {
  const skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) &&
    !overlappingSkillNames.includes(skill.name)
    ? skill.name
    : skill.id;
}

type Constructor<T> = { new (): T };

export class InvalidMacroError extends Error {}

/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */
export class Macro {
  static SAVED_MACRO_PROPERTY = "libram_savedMacro";

  static cachedMacroIds = new Map<string, number>();
  static cachedAutoAttacks = new Map<string, string>();

  components: string[] = [];
  name: string = MACRO_NAME;

  /**
   * Convert macro to string.
   *
   * @returns BALLS macro
   */
  toString(): string {
    return (this.components.join(";") + ";").replace(/;;+/g, ";");
  }

  /**
   * Gives your macro a new name to be used when saving an autoattack.
   *
   * @param name The name to be used when saving as an autoattack.
   * @returns The macro in question
   */
  rename(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Creates a new Macro with a name other than the default name.
   *
   * @param name The name to assign this macro.
   * @returns A new Macro with the assigned name.
   */
  static rename<T extends Macro>(this: Constructor<T>, name: string): T {
    return new this().rename(name);
  }

  /**
   * Save a macro to a Mafia property for use in a consult script.
   */
  save(): void {
    set(Macro.SAVED_MACRO_PROPERTY, this.toString());
  }

  /**
   * Load a saved macro from the Mafia property.
   *
   * @returns Loaded macro text
   */
  static load<T extends Macro>(this: Constructor<T>): T {
    return new this().step(...get(Macro.SAVED_MACRO_PROPERTY).split(";"));
  }

  /**
   * Clear the saved macro in the Mafia property.
   */
  static clearSaved(): void {
    removeProperty(Macro.SAVED_MACRO_PROPERTY);
  }

  /**
   * Statefully add one or several steps to a macro.
   *
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */
  step(...nextSteps: (string | Macro)[]): this {
    const nextStepsStrings = ([] as string[]).concat(
      ...nextSteps.map((x) => (x instanceof Macro ? x.components : [x])),
    );
    this.components.push(...nextStepsStrings.filter(Boolean));
    return this;
  }

  /**
   * Statefully add one or several steps to a macro.
   *
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */
  static step<T extends Macro>(
    this: Constructor<T>,
    ...nextSteps: (string | Macro)[]
  ): T {
    return new this().step(...nextSteps);
  }

  /**
   * Submit the built macro to KoL. Only works inside combat.
   *
   * @returns Contents of the fight page after macro submission
   */
  submit(): string {
    const final = this.toString();
    return visitUrl(
      `fight.php?action=macro&macrotext=${urlEncode(final)}`,
      true,
      true,
    );
  }

  /**
   * Set this macro as a KoL native autoattack.
   */
  setAutoAttack(): void {
    let id = Macro.cachedMacroIds.get(this.name);
    if (id === undefined) {
      id = getMacroId(this.name);
      Macro.cachedMacroIds.set(this.name, id);
    }
    if (
      getAutoAttack() === 99000000 + id &&
      this.toString() === Macro.cachedAutoAttacks.get(this.name)
    ) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    visitUrl(
      `account_combatmacros.php?macroid=${id}&name=${urlEncode(
        this.name,
      )}&macrotext=${urlEncode(this.toString())}&action=save`,
      true,
      true,
    );
    visitUrl(
      `account.php?am=1&action=autoattack&value=${99000000 + id}&ajax=1`,
    );
    Macro.cachedAutoAttacks.set(this.name, this.toString());
  }

  /**
   * Renames the macro, then sets it as an autoattack.
   *
   * @param name The name to save the macro under as an autoattack.
   */
  setAutoAttackAs(name: string): void {
    this.name = name;
    this.setAutoAttack();
  }

  /**
   * Clear all cached autoattacks, and delete all stored macros server-side.
   */
  static clearAutoAttackMacros(): void {
    for (const name of Macro.cachedAutoAttacks.keys()) {
      const id = Macro.cachedMacroIds.get(name) ?? getMacroId(name);
      visitUrl(
        `account_combatmacros.php?macroid=${id}&action=edit&what=Delete&confirm=1`,
      );
      Macro.cachedAutoAttacks.delete(name);
      Macro.cachedMacroIds.delete(name);
    }
  }

  /**
   * Add an "abort" step to this macro.
   *
   * @returns {Macro} This object itself.
   */
  abort(): this {
    return this.step("abort");
  }

  /**
   * Create a new macro with an "abort" step.
   *
   * @returns {Macro} This object itself.
   */
  static abort<T extends Macro>(this: Constructor<T>): T {
    return new this().abort();
  }

  /**
   * Adds an "abort" step to this macro, with a warning message to print
   *
   * @param warning The warning message to print
   * @returns  {Macro} This object itself.
   */
  abortWithWarning(warning: string): this {
    return this.step(`abort "${warning}"`);
  }

  /**
   * Create a new macro with an "abort" step to this macro, with a warning message to print
   *
   * @param warning The warning message to print
   * @returns {Macro} This object itself.
   */
  static abortWithWarning<T extends Macro>(
    this: Constructor<T>,
    warning: string,
  ): T {
    return new this().abortWithWarning(warning);
  }

  /**
   * Add a "runaway" step to this macro.
   *
   * @returns {Macro} This object itself.
   */
  runaway(): this {
    return this.step("runaway");
  }

  /**
   * Create a new macro with an "runaway" step.
   *
   * @returns {Macro} This object itself.
   */
  static runaway<T extends Macro>(this: Constructor<T>): T {
    return new this().runaway();
  }

  /**
   *
   * @param condition The BALLS condition or a type to make a condition for (Monster, Item, Skill, etc.)
   * @returns {string} The BALLS condition string
   */
  static makeBALLSPredicate(condition: PreBALLSPredicate): string {
    if (condition instanceof Monster) {
      return `monsterid ${condition.id}`;
    } else if (condition instanceof Array) {
      if (condition[0] instanceof Item)
        return itemOrItemsBallsMacroPredicate(condition as [Item, Item]);
      return `(${condition
        .map((entry) => Macro.makeBALLSPredicate(entry))
        .join(" || ")})`;
    } else if (condition instanceof Effect) {
      return `haseffect ${condition.id}`;
    } else if (condition instanceof Skill) {
      return condition.combat
        ? `hasskill ${skillBallsMacroName(condition)}`
        : `knowsskill ${condition.id}`;
    } else if (condition instanceof Item) {
      if (!condition.combat) {
        throw new InvalidMacroError(
          `Item ${condition} cannot be made a valid BALLS predicate (it is not combat-usable)`,
        );
      }

      return `hascombatitem ${itemOrItemsBallsMacroName(condition)}`;
    } else if (condition instanceof Location) {
      const snarfblat = condition.id;

      if (snarfblat < 1) {
        throw new InvalidMacroError(
          `Location ${condition} cannot be made a valid BALLS predicate (it has no location id)`,
        );
      }

      return `snarfblat ${snarfblat}`;
    } else if (condition instanceof Class) {
      if (condition.id > 6) {
        throw new InvalidMacroError(
          `Class ${condition} cannot be made a valid BALLS predicate (it is not a standard class)`,
        );
      }

      return condition.toString().replaceAll(" ", "").toLowerCase();
    } else if (condition instanceof Stat) {
      return `${condition.toString().toLowerCase()}class`;
    } else if (condition instanceof Phylum) {
      return `monsterphylum ${condition}`;
    } else if (condition instanceof Element) {
      return `monsterelement ${condition}`;
    }
    return condition;
  }

  /**
   * Add an "if" statement to this macro.
   *
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  if_(condition: PreBALLSPredicate, ifTrue: string | Macro): this {
    return this.step(`if ${Macro.makeBALLSPredicate(condition)}`)
      .step(ifTrue)
      .step("endif");
  }

  /**
   * Create a new macro with an "if" statement.
   *
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  static if_<T extends Macro>(
    this: Constructor<T>,
    condition: PreBALLSPredicate,
    ifTrue: string | Macro,
  ): T {
    return new this().if_(condition, ifTrue);
  }

  /**
   * Add an "if" statement to this macro, inverting the condition.
   *
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  ifNot(condition: PreBALLSPredicate, ifTrue: string | Macro): this {
    return this.if_(`!${Macro.makeBALLSPredicate(condition)}`, ifTrue);
  }
  /**
   * Create a new macro with an "if" statement, inverting the condition.
   *
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  static ifNot<T extends Macro>(
    this: Constructor<T>,
    condition: PreBALLSPredicate,
    ifTrue: string | Macro,
  ): T {
    return new this().ifNot(condition, ifTrue);
  }

  /**
   * Add a "while" statement to this macro.
   *
   * @param condition The BALLS condition for the while statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */
  while_(condition: PreBALLSPredicate, contents: string | Macro): this {
    return this.step(`while ${Macro.makeBALLSPredicate(condition)}`)
      .step(contents)
      .step("endwhile");
  }

  /**
   * Create a new macro with a "while" statement.
   *
   * @param condition The BALLS condition for the while statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */
  static while_<T extends Macro>(
    this: Constructor<T>,
    condition: PreBALLSPredicate,
    contents: string | Macro,
  ): T {
    return new this().while_(condition, contents);
  }

  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   *
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @param ifFalse Optional input to turn this into an if...else statement.
   * @returns {Macro} This object itself.
   */
  externalIf(
    condition: boolean,
    ifTrue: string | Macro,
    ifFalse?: string | Macro,
  ): this {
    if (condition) return this.step(ifTrue);
    else if (ifFalse) return this.step(ifFalse);
    else return this;
  }

  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   *
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @param ifFalse Optional input to turn this into an if...else statement.
   * @returns {Macro} This object itself.
   */
  static externalIf<T extends Macro>(
    this: Constructor<T>,
    condition: boolean,
    ifTrue: string | Macro,
    ifFalse?: string | Macro,
  ): T {
    return new this().externalIf(condition, ifTrue, ifFalse);
  }

  /**
   * Add a repeat step to the macro.
   *
   * @param condition The BALLS condition for the repeat statement, optional.
   * @returns {Macro} This object itself.
   */
  repeat(condition?: PreBALLSPredicate): this {
    return condition === undefined
      ? this.step("repeat")
      : this.step(`repeat ${Macro.makeBALLSPredicate(condition)}`);
  }

  /**
   * Add one or more skill cast steps to the macro.
   *
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */
  skill(...skills: SkillOrName[]): this {
    return this.step(
      ...skills.map((skill) => {
        return `skill ${skillBallsMacroName(skill)}`;
      }),
    );
  }

  /**
   * Create a new macro with one or more skill cast steps.
   *
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */
  static skill<T extends Macro>(
    this: Constructor<T>,
    ...skills: SkillOrName[]
  ): T {
    return new this().skill(...skills);
  }

  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   *
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */
  trySkill(...skills: SkillOrName[]): this {
    return this.step(
      ...skills
        .map((skillOrName) => skillOrNameToSkill(skillOrName))
        .map((skill) => {
          return Macro.if_(Macro.makeBALLSPredicate(skill), Macro.skill(skill));
        }),
    );
  }

  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   *
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */
  static trySkill<T extends Macro>(
    this: Constructor<T>,
    ...skills: SkillOrName[]
  ): T {
    return new this().trySkill(...skills);
  }

  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   *
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */
  trySkillRepeat(...skills: SkillOrName[]): this {
    return this.step(
      ...skills
        .map((skillOrName) => skillOrNameToSkill(skillOrName))
        .map((skill) => {
          return Macro.if_(
            Macro.makeBALLSPredicate(skill),
            Macro.skill(skill).repeat(skill),
          );
        }),
    );
  }

  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   *
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */
  static trySkillRepeat<T extends Macro>(
    this: Constructor<T>,
    ...skills: SkillOrName[]
  ): T {
    return new this().trySkillRepeat(...skills);
  }

  /**
   * Add one or more item steps to the macro.
   *
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  item(...items: (ItemOrName | [ItemOrName, ItemOrName])[]): this {
    return this.step(
      ...items.map((itemOrItems) => {
        return `use ${itemOrItemsBallsMacroName(itemOrItems)}`;
      }),
    );
  }

  /**
   * Create a new macro with one or more item steps.
   *
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  static item<T extends Macro>(
    this: Constructor<T>,
    ...items: (ItemOrName | [ItemOrName, ItemOrName])[]
  ): T {
    return new this().item(...items);
  }

  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   *
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  tryItem(...items: (ItemOrName | [ItemOrName, ItemOrName])[]): this {
    return this.step(
      ...items.map((item) => {
        return Macro.if_(
          itemOrItemsBallsMacroPredicate(item),
          Macro.item(item),
        );
      }),
    );
  }

  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   *
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  static tryItem<T extends Macro>(
    this: Constructor<T>,
    ...items: (ItemOrName | [ItemOrName, ItemOrName])[]
  ): T {
    return new this().tryItem(...items);
  }

  /**
   * Add an attack step to the macro.
   *
   * @returns {Macro} This object itself.
   */
  attack(): this {
    return this.step("attack");
  }

  /**
   * Create a new macro with an attack step.
   *
   * @returns {Macro} This object itself.
   */
  static attack<T extends Macro>(this: Constructor<T>): T {
    return new this().attack();
  }

  /**
   * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
   *
   * @param macro The macro to place in the if_ statement
   * @returns This macro with supplied macro wapped in if statement matching holiday wanderers
   */
  ifHolidayWanderer(macro: Macro): this {
    const todaysWanderers = getTodaysHolidayWanderers();
    if (todaysWanderers.length === 0) return this;
    return this.if_(
      todaysWanderers.map((monster) => `monsterid ${monster.id}`).join(" || "),
      macro,
    );
  }
  /**
   * Create a new macro starting with an ifHolidayWanderer step.
   *
   * @param macro The macro to place inside the if_ statement
   * @returns New macro with supplied macro wrapped in if statement matching holiday wanderers
   */
  static ifHolidayWanderer<T extends Macro>(
    this: Constructor<T>,
    macro: Macro,
  ): T {
    return new this().ifHolidayWanderer(macro);
  }

  /**
   * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
   *
   * @param macro The macro to place in the if_ statement.
   * @returns This macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
   */
  ifNotHolidayWanderer(macro: Macro): this {
    const todaysWanderers = getTodaysHolidayWanderers();
    if (todaysWanderers.length === 0) return this.step(macro);
    return this.if_(
      todaysWanderers.map((monster) => `!monsterid ${monster.id}`).join(" && "),
      macro,
    );
  }
  /**
   * Create a new macro starting with an ifNotHolidayWanderer step.
   *
   * @param macro The macro to place inside the if_ statement
   * @returns New macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
   */
  static ifNotHolidayWanderer<T extends Macro>(
    this: Constructor<T>,
    macro: Macro,
  ): T {
    return new this().ifNotHolidayWanderer(macro);
  }
}

/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */
export function adventureMacro(loc: Location, macro: Macro): void {
  macro.save();
  setAutoAttack(0);
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) runCombat();
    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}

/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */
export function adventureMacroAuto(
  loc: Location,
  autoMacro: Macro,
  nextMacro: Macro | null = null,
): void {
  nextMacro = nextMacro ?? Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) runCombat();
    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}

export class StrictMacro extends Macro {
  /**
   * Add one or more skill cast steps to the macro.
   *
   * @param skills Skills to cast.
   * @returns {StrictMacro} This object itself.
   */
  skill(...skills: Skill[]): this {
    return super.skill(...skills);
  }

  /**
   * Create a new macro with one or more skill cast steps.
   *
   * @param skills Skills to cast.
   * @returns {StrictMacro} This object itself.
   */
  static skill<T extends StrictMacro>(
    this: Constructor<T>,
    ...skills: Skill[]
  ): T {
    return new this().skill(...skills);
  }

  /**
   * Add one or more item steps to the macro.
   *
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {StrictMacro} This object itself.
   */
  item(...items: (Item | [Item, Item])[]): this {
    return super.item(...items);
  }

  /**
   * Create a new macro with one or more item steps.
   *
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {StrictMacro} This object itself.
   */
  static item<T extends StrictMacro>(
    this: Constructor<T>,
    ...items: (Item | [Item, Item])[]
  ): T {
    return new this().item(...items);
  }

  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   *
   * @param skills Skills to try casting.
   * @returns {StrictMacro} This object itself.
   */
  trySkill(...skills: Skill[]): this {
    return super.trySkill(...skills);
  }

  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   *
   * @param skills Skills to try casting.
   * @returns {StrictMacro} This object itself.
   */
  static trySkill<T extends StrictMacro>(
    this: Constructor<T>,
    ...skills: Skill[]
  ): T {
    return new this().trySkill(...skills);
  }

  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   *
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {StrictMacro} This object itself.
   */
  tryItem(...items: (Item | [Item, Item])[]): this {
    return super.tryItem(...items);
  }

  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   *
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {StrictMacro} This object itself.
   */
  static tryItem<T extends StrictMacro>(
    this: Constructor<T>,
    ...items: (Item | [Item, Item])[]
  ): T {
    return new this().tryItem(...items);
  }

  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   *
   * @param skills Skills to try repeatedly casting.
   * @returns {StrictMacro} This object itself.
   */
  trySkillRepeat(...skills: Skill[]): this {
    return super.trySkillRepeat(...skills);
  }

  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   *
   * @param skills Skills to try repeatedly casting.
   * @returns {StrictMacro} This object itself.
   */
  static trySkillRepeat<T extends StrictMacro>(
    this: Constructor<T>,
    ...skills: Skill[]
  ): T {
    return new this().trySkillRepeat(...skills);
  }
}
