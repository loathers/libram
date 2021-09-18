import {
  adv1,
  choiceFollowsFight,
  getAutoAttack,
  inMultiFight,
  removeProperty,
  runCombat,
  setAutoAttack,
  toInt,
  urlEncode,
  visitUrl,
  xpath,
} from "kolmafia";
import { $items, $skills } from "./template-string";
import { get, set } from "./property";

const MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name Script Autoattack Macro.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */
export function getMacroId(): number {
  const macroMatches = xpath(
    visitUrl("account_combatmacros.php"),
    `//select[@name="macroid"]/option[text()="${MACRO_NAME}"]/@value`
  );
  if (macroMatches.length === 0) {
    visitUrl("account_combatmacros.php?action=new");
    const newMacroText = visitUrl(
      `account_combatmacros.php?macroid=0&name=${MACRO_NAME}&macrotext=abort&action=save`
    );
    return parseInt(
      xpath(newMacroText, "//input[@name=macroid]/@value")[0],
      10
    );
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

type ItemOrName = Item | string;
function itemOrNameToItem(itemOrName: ItemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

const substringCombatItems = $items`spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom`;
const substringCombatSkills = $skills`Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow`;

function itemOrItemsBallsMacroName(
  itemOrItems: ItemOrName | [ItemOrName, ItemOrName]
): string {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    const item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item)
      ? item.name
      : toInt(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(
  itemOrItems: ItemOrName | [ItemOrName, ItemOrName]
): string {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return `hascombatitem ${itemOrItems}`;
  }
}

type SkillOrName = Skill | string;
function skillOrNameToSkill(skillOrName: SkillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName: SkillOrName) {
  const skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) &&
    !substringCombatSkills.includes(skill)
    ? skill.name
    : toInt(skill);
}

type Constructor<T> = { new (): T };

/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */
export class Macro {
  static SAVED_MACRO_PROPERTY = "libram_savedMacro";

  static cachedMacroId: number | null = null;
  static cachedAutoAttack: string | null = null;

  components: string[] = [];

  /**
   * Convert macro to string.
   */
  toString(): string {
    return this.components.join(";");
  }

  /**
   * Save a macro to a Mafia property for use in a consult script.
   */
  save(): void {
    set(Macro.SAVED_MACRO_PROPERTY, this.toString());
  }

  /**
   * Load a saved macro from the Mafia property.
   */
  static load<T extends Macro>(this: Constructor<T>): T {
    return new this().step(
      ...get<string>(Macro.SAVED_MACRO_PROPERTY).split(";")
    );
  }

  /**
   * Clear the saved macro in the Mafia property.
   */
  static clearSaved(): void {
    removeProperty(Macro.SAVED_MACRO_PROPERTY);
  }

  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */
  step(...nextSteps: (string | Macro)[]): this {
    const nextStepsStrings = ([] as string[]).concat(
      ...nextSteps.map((x) => (x instanceof Macro ? x.components : [x]))
    );
    this.components = [
      ...this.components,
      ...nextStepsStrings.filter((s) => s.length > 0),
    ];
    return this;
  }

  /**
   * Statefully add one or several steps to a macro.
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
   */
  submit(): string {
    const final = this.toString();
    return visitUrl(
      `fight.php?action=macro&macrotext=${urlEncode(final)}`,
      true,
      true
    );
  }

  /**
   * Set this macro as a KoL native autoattack.
   */
  setAutoAttack(): void {
    if (Macro.cachedMacroId === null) Macro.cachedMacroId = getMacroId();
    if (
      getAutoAttack() === 99000000 + Macro.cachedMacroId &&
      this.toString() === Macro.cachedAutoAttack
    ) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    visitUrl(
      `account_combatmacros.php?macroid=${Macro.cachedMacroId}&name=${urlEncode(
        MACRO_NAME
      )}&macrotext=${urlEncode(this.toString())}&action=save`,
      true,
      true
    );
    visitUrl(
      `account.php?am=1&action=autoattack&value=${
        99000000 + Macro.cachedMacroId
      }&ajax=1`
    );
    Macro.cachedAutoAttack = this.toString();
  }

  /**
   * Add an "abort" step to this macro.
   * @returns {Macro} This object itself.
   */
  abort(): this {
    return this.step("abort");
  }

  /**
   * Create a new macro with an "abort" step.
   * @returns {Macro} This object itself.
   */
  static abort<T extends Macro>(this: Constructor<T>): T {
    return new this().abort();
  }

  /**
   * Add an "if" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  if_(condition: string, ifTrue: string | Macro): this {
    return this.step(`if ${condition}`).step(ifTrue).step("endif");
  }

  /**
   * Create a new macro with an "if" statement.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */
  static if_<T extends Macro>(
    this: Constructor<T>,
    condition: string,
    ifTrue: string | Macro
  ): T {
    return new this().if_(condition, ifTrue);
  }

  /**
   * Add a "while" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */
  while_(condition: string, contents: string | Macro): this {
    return this.step(`while ${condition}`).step(contents).step("endwhile");
  }

  /**
   * Create a new macro with a "while" statement.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */
  static while_<T extends Macro>(
    this: Constructor<T>,
    condition: string,
    contents: string | Macro
  ): T {
    return new this().while_(condition, contents);
  }

  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @param ifFalse Optional input to turn this into an if...else statement.
   * @returns {Macro} This object itself.
   */
  externalIf(
    condition: boolean,
    ifTrue: string | Macro,
    ifFalse?: string | Macro
  ): this {
    if (condition) return this.step(ifTrue);
    if (ifFalse) return this.step(ifFalse);
    return this;
  }

  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */
  static externalIf<T extends Macro>(
    this: Constructor<T>,
    condition: boolean,
    ifTrue: string | Macro
  ): T {
    return new this().externalIf(condition, ifTrue);
  }

  /**
   * Add a repeat step to the macro.
   * @returns {Macro} This object itself.
   */
  repeat(): this {
    return this.step("repeat");
  }

  /**
   * Add one or more skill cast steps to the macro.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */
  skill(...skills: SkillOrName[]): this {
    return this.step(
      ...skills.map((skill) => {
        return `skill ${skillBallsMacroName(skill)}`;
      })
    );
  }

  /**
   * Create a new macro with one or more skill cast steps.
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
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */
  trySkill(...skills: SkillOrName[]): this {
    return this.step(
      ...skills.map((skill) => {
        return Macro.if_(
          `hasskill ${skillBallsMacroName(skill)}`,
          Macro.skill(skill)
        );
      })
    );
  }

  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
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
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */
  trySkillRepeat(...skills: SkillOrName[]): this {
    return this.step(
      ...skills.map((skill) => {
        return Macro.if_(
          `hasskill ${skillBallsMacroName(skill)}`,
          Macro.skill(skill).repeat()
        );
      })
    );
  }

  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
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
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  item(...items: (ItemOrName | [ItemOrName, ItemOrName])[]): this {
    return this.step(
      ...items.map((itemOrItems) => {
        return `use ${itemOrItemsBallsMacroName(itemOrItems)}`;
      })
    );
  }

  /**
   * Create a new macro with one or more item steps.
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
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */
  tryItem(...items: (ItemOrName | [ItemOrName, ItemOrName])[]): this {
    return this.step(
      ...items.map((item) => {
        return Macro.if_(
          itemOrItemsBallsMacroPredicate(item),
          `use ${itemOrItemsBallsMacroName(item)}`
        );
      })
    );
  }

  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
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
   * @returns {Macro} This object itself.
   */
  attack(): this {
    return this.step("attack");
  }

  /**
   * Create a new macro with an attack step.
   * @returns {Macro} This object itself.
   */
  static attack<T extends Macro>(this: Constructor<T>): T {
    return new this().attack();
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
  nextMacro: Macro | null = null
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
