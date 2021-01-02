import {
  adv1,
  choiceFollowsFight,
  getAutoAttack,
  getProperty,
  inMultiFight,
  print,
  removeProperty,
  runCombat,
  toInt,
  toItem,
  urlEncode,
  visitUrl,
  xpath,
} from "kolmafia";
import { get, set } from "./property";
import { $item } from "./template-string";

const MACRO_NAME = "Script Autoattack Macro";
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

export class Macro {
  static SAVED_MACRO_PROPERTY = "libram_savedMacro";

  static cachedMacroId: number | null = null;
  static cachedAutoAttack: string | null = null;

  components: string[] = [];

  toString(): string {
    return this.components.join(";");
  }

  step(...nextSteps: (string | Macro)[]): Macro {
    const nextStepsStrings = ([] as string[]).concat(
      ...nextSteps.map((x) => (x instanceof Macro ? x.components : [x]))
    );
    this.components = [
      ...this.components,
      ...nextStepsStrings.filter((s) => s.length > 0),
    ];
    return this;
  }

  save(): void {
    set(Macro.SAVED_MACRO_PROPERTY, this.toString());
  }

  static load(): Macro {
    return new Macro().step(
      ...get<string>(Macro.SAVED_MACRO_PROPERTY).split(";")
    );
  }

  static clearSaved(): void {
    removeProperty(Macro.SAVED_MACRO_PROPERTY);
  }

  static step(...nextSteps: (string | Macro)[]): Macro {
    return new Macro().step(...nextSteps);
  }

  submit(): string {
    const final = this.toString();
    print(`Submitting macro: ${final}`);
    return visitUrl(
      `fight.php?action=macro&macrotext=${urlEncode(final)}`,
      true,
      true
    );
  }

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

  abort(): Macro {
    return this.step("abort");
  }

  static abort(): Macro {
    return new Macro().abort();
  }

  if_(condition: string, ifTrue: string | Macro): Macro {
    return this.step(`if ${condition}`).step(ifTrue).step("endif");
  }

  static if_(condition: string, ifTrue: string | Macro): Macro {
    return new Macro().if_(condition, ifTrue);
  }

  while_(condition: string, contents: string | Macro): Macro {
    return this.step(`while ${condition}`).step(contents).step("endwhile");
  }

  static while_(condition: string, contents: string | Macro): Macro {
    return new Macro().while_(condition, contents);
  }

  externalIf(condition: boolean, ...next: (string | Macro)[]): Macro {
    return condition ? this.step(...next) : this;
  }

  static externalIf(condition: boolean, ...next: (string | Macro)[]): Macro {
    return new Macro().externalIf(condition, ...next);
  }

  repeat(): Macro {
    return this.step("repeat");
  }

  repeatSubmit(): string {
    return this.step("repeat").submit();
  }

  skill(...skills: Skill[]): Macro {
    return this.step(
      ...skills.map((skill) => {
        const skillName = skill.name.match(/^[A-Za-z ]+$/)
          ? skill.name
          : toInt(skill);
        return `use ${skillName}`;
      })
    );
  }

  static skill(...skills: Skill[]): Macro {
    return new Macro().skill(...skills);
  }

  trySkill(...skills: Skill[]): Macro {
    return this.step(
      ...skills.map((skill) => {
        const skillName = skill.name.match(/^[A-Za-z ]+$/)
          ? skill.name
          : toInt(skill);
        return Macro.if_(`hasskill ${skillName}`, `use ${skillName}`);
      })
    );
  }

  static trySkill(...skills: Skill[]): Macro {
    return new Macro().trySkill(...skills);
  }

  skillRepeat(skill: Skill): Macro {
    return this.skill(skill).repeat();
  }

  static skillRepeat(skill: Skill): Macro {
    return new Macro().skillRepeat(skill);
  }

  item(...items: Item[]): Macro {
    return this.step(
      ...items.map((item) => {
        const itemName = item.name.match(/^[A-Za-z ]+$/)
          ? item.name
          : toInt(item);
        return `use ${itemName}`;
      })
    );
  }

  static item(...items: Item[]): Macro {
    return new Macro().item(...items);
  }

  tryItem(...items: Item[]): Macro {
    return this.step(
      ...items.map((item) => {
        const itemName = item.name.match(/^[A-Za-z ]+$/)
          ? item.name
          : toInt(item);
        return Macro.if_(`hasitem ${itemName}`, `use ${itemName}`);
      })
    );
  }

  static tryItem(...items: Item[]): Macro {
    return new Macro().tryItem(...items);
  }

  attack(): Macro {
    return this.step("attack");
  }

  static attack(): Macro {
    return new Macro().attack();
  }
}

export function banishedMonsters(): Map<Item | Skill, Monster> {
  const banishedstring = getProperty("banishedMonsters");
  const banishedComponents = banishedstring.split(":");
  const result = new Map<Item | Skill, Monster>();
  if (banishedComponents.length < 3) return result;
  for (let idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    const foe = Monster.get(banishedComponents[idx * 3]);
    const banisher = banishedComponents[idx * 3 + 1];
    // toItem doesn"t error if the item doesn"t exist, so we have to use that.
    const banisherItem = toItem(banisher);
    const banisherObject = [$item`none`, null].includes(banisherItem)
      ? Skill.get(banisher)
      : banisherItem;
    result.set(banisherObject, foe);
  }
  return result;
}

// To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
export function adventureMacro(loc: Location, macro: Macro): void {
  macro.save();
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) runCombat();
    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}

// Sets autoattack. You will have to unset autoattack manually. (setAutoAttack(0))
export function adventureMacroAuto(
  loc: Location,
  autoMacro: Macro,
  nextMacro: Macro | null = null
): void {
  nextMacro = nextMacro ?? Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
