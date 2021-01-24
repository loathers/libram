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
import { $class, $skill } from "./template-string";
import { clamp } from "./utils";

export function isSong(effectOrSkill: Effect | Skill): boolean {
  const skill =
    effectOrSkill instanceof Skill ? effectOrSkill : toSkill(effectOrSkill);
  return skill.type === "buff" && skill.class === $class`Accordion Thief`;
}

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
      const quantityAcquired = buy(
        quantityToBuy,
        this.potion,
        this.maxPricePerTurn * turnsPerUse
      );
      use(quantityAcquired + availableAmount(this.potion), this.potion);
    }
    return haveEffect(effect) >= ensureTurns;
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

  static availableMp(): number {
    let result = myMp();
    if (Mood.useSausages)
      result += Math.min(myMaxmp(), 999) * (23 - get("_sausagesEaten"));
    return result;
  }

  elements: MoodElement[] = [];

  skill(skill: Skill): void {
    this.elements.push(new SkillMoodElement(skill));
  }

  effect(effect: Effect): void {
    const skill = toSkill(effect);
    if (skill !== $skill`none`) {
      this.skill(skill);
    } else {
      this.elements.push(new CustomMoodElement(effect));
    }
  }

  potion(potion: Item, maxPricePerTurn: number): void {
    this.elements.push(new PotionMoodElement(potion, maxPricePerTurn));
  }

  execute(ensureTurns = 1): boolean {
    return this.elements
      .map((element) => element.execute(ensureTurns))
      .every((x) => x);
  }
}
