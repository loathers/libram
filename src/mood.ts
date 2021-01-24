import {
  availableAmount,
  buy,
  cliExecute,
  effectModifier,
  haveEffect,
  haveSkill,
  hpCost,
  mallPrice,
  mpCost,
  myHp,
  myMaxmp,
  myMp,
  numericModifier,
  toEffect,
  toSkill,
  turnsPerCast,
  use,
  useSkill,
} from "kolmafia";
import { get } from "./property";
import { $item, $skill } from "./template-string";
import { clamp } from "./utils";

abstract class MoodElement {
  abstract execute(ensureTurns: number): boolean;
}

class SkillMoodElement extends MoodElement {
  skill: Skill;

  constructor(skill: Skill) {
    super();
    this.skill = skill;
  }

  execute(ensureTurns: number): boolean {
    const effect = toEffect(this.skill);
    const initialTurns = haveEffect(effect);

    if (!haveSkill(this.skill)) return false;
    if (initialTurns >= ensureTurns) return true;

    let oldRemainingCasts = -1;
    let remainingCasts = Math.ceil(
      (ensureTurns - haveEffect(effect)) / turnsPerCast(this.skill)
    );
    while (remainingCasts > 0 && oldRemainingCasts !== remainingCasts) {
      let maxCasts;
      if (hpCost(this.skill) > 0) {
        // FIXME: restore HP
        maxCasts = myHp() / hpCost(this.skill);
      } else {
        // FIXME: restore MP
        maxCasts = myMp() / mpCost(this.skill);
      }
      const casts = clamp(remainingCasts, 0, Math.min(100, maxCasts));
      useSkill(casts, this.skill);
      oldRemainingCasts = remainingCasts;
      remainingCasts = Math.ceil(
        (ensureTurns - haveEffect(effect)) / turnsPerCast(this.skill)
      );
    }
    return haveEffect(effect) > ensureTurns;
  }
}

class PotionMoodElement extends MoodElement {
  potion: Item;
  maxPricePerTurn: number;

  constructor(potion: Item, maxPricePerTurn: number) {
    super();
    this.potion = potion;
    this.maxPricePerTurn = maxPricePerTurn;
  }

  execute(ensureTurns: number): boolean {
    // FIXME: Smarter buying logic.
    // FIXME: Allow constructing stuff (e.g. snow cleats)
    const effect = effectModifier(this.potion, "Effect");
    const effectTurns = haveEffect(effect);
    const turnsPerUse = numericModifier(this.potion, "Effect Duration");
    if (mallPrice(this.potion) > this.maxPricePerTurn * turnsPerUse)
      return false;
    if (effectTurns < ensureTurns) {
      // print(`${effect}: going for ${turns} turns, currently ${effectTurns}`);
      const uses = (ensureTurns - effectTurns) / turnsPerUse;
      const quantityToBuy = clamp(uses - availableAmount(this.potion), 0, 100);
      buy(quantityToBuy, this.potion, this.maxPricePerTurn * turnsPerUse);
      const quantityToUse = clamp(uses, 0, availableAmount(this.potion));
      use(quantityToUse, this.potion);
    }
    return haveEffect(effect) >= ensureTurns;
  }
}

class GenieMoodElement extends MoodElement {
  effect: Effect;

  constructor(effect: Effect) {
    super();
    this.effect = effect;
  }

  execute(ensureTurns: number): boolean {
    if (haveEffect(this.effect) >= ensureTurns) return true;
    const neededWishes = Math.ceil(
      (haveEffect(this.effect) - ensureTurns) / 20
    );
    const wishesToBuy = clamp(
      neededWishes - availableAmount($item`pocket wish`),
      0,
      20
    );
    buy(wishesToBuy, $item`pocket wish`, 50000);
    let wishesToUse = clamp(
      neededWishes,
      0,
      availableAmount($item`pocket wish`)
    );
    for (; wishesToUse > 0; wishesToUse--) {
      cliExecute(`genie effect ${this.effect.name}`);
    }
    return haveEffect(this.effect) >= ensureTurns;
  }
}

class CustomMoodElement extends MoodElement {
  effect: Effect;
  gainEffect: () => void;

  constructor(effect: Effect, gainEffect?: () => void) {
    super();
    this.effect = effect;
    this.gainEffect = gainEffect ?? (() => cliExecute(effect.default));
  }

  execute(ensureTurns: number): boolean {
    let currentTurns = haveEffect(this.effect);
    let lastCurrentTurns = -1;
    while (currentTurns < ensureTurns && currentTurns !== lastCurrentTurns) {
      this.gainEffect();
      lastCurrentTurns = currentTurns;
      currentTurns = haveEffect(this.effect);
    }
    return haveEffect(this.effect) > ensureTurns;
  }
}

/**
 * Class representing a mood object. Set options using the static methods, and add mood elements using the instance methods.
 */
export class Mood {
  static songSlots: Effect[][] = [];
  static useSausages = true;

  static setOptions(options: {
    songSlots?: Effect[][];
    useSausages?: boolean;
  }): void {
    if (options.songSlots) Mood.songSlots = options.songSlots;
    if (options.useSausages) Mood.useSausages = options.useSausages;
  }

  /**
   * Get the MP available for casting skills.
   */
  static availableMp(): number {
    let result = myMp();
    if (Mood.useSausages)
      result += Math.min(myMaxmp(), 999) * (23 - get("_sausagesEaten"));
    return result;
  }

  elements: MoodElement[] = [];

  /**
   * Add a skill to the mood.
   * @param skill Skill to add.
   */
  skill(skill: Skill): void {
    this.elements.push(new SkillMoodElement(skill));
  }

  /**
   * Add an effect to the mood, with casting based on {effect.default}.
   * @param effect Effect to add.
   */
  effect(effect: Effect): void {
    const skill = toSkill(effect);
    if (skill !== $skill`none`) {
      this.skill(skill);
    } else {
      this.elements.push(new CustomMoodElement(effect));
    }
  }

  /**
   * Add a potion to the mood.
   * @param potion Potion to add.
   * @param maxPricePerTurn Maximum price to pay per turn of the effect.
   */
  potion(potion: Item, maxPricePerTurn: number): void {
    this.elements.push(new PotionMoodElement(potion, maxPricePerTurn));
  }

  /**
   * Add an effect to acquire via pocket wishes to the mood.
   * @param effect Effect to wish for in the mood.
   */
  genie(effect: Effect): void {
    this.elements.push(new GenieMoodElement(effect));
  }

  /**
   * Execute the mood, trying to ensure {ensureTurns} of each effect.
   * @param ensureTurns Turns of each effect to try and achieve.
   * @returns Whether or not we successfully got this many turns of every effect in the mood.
   */
  execute(ensureTurns = 1): boolean {
    return this.elements
      .map((element) => element.execute(ensureTurns))
      .every((x) => x);
  }
}
