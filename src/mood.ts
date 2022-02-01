import "core-js/modules/es.object.values";

import {
  availableAmount,
  buy,
  cliExecute,
  eat,
  Effect,
  effectModifier,
  haveEffect,
  haveSkill,
  hpCost,
  Item,
  itemAmount,
  mallPrice,
  mpCost,
  myHp,
  myMaxmp,
  myMp,
  numericModifier,
  retrieveItem,
  Skill,
  toEffect,
  toSkill,
  turnsPerCast,
  use,
  useSkill,
} from "kolmafia";
import { getActiveSongs, have, isSong } from "./lib";
import { get } from "./property";
import { AsdonMartin } from "./resources";
import { $item, $skill } from "./template-string";
import { clamp, sum } from "./utils";

export abstract class MpSource {
  usesRemaining(): number | null {
    return null;
  }
  abstract availableMpMin(): number;
  availableMpMax(): number {
    return this.availableMpMin();
  }
  abstract execute(): void;
}

export class OscusSoda extends MpSource {
  static instance = new OscusSoda();

  available(): boolean {
    return have($item`Oscus's neverending soda`);
  }

  usesRemaining(): number | null {
    return get("oscusSodaUsed") ? 0 : 1;
  }

  availableMpMin(): number {
    return this.available() ? 200 : 0;
  }

  availableMpMax(): number {
    return this.available() ? 300 : 0;
  }

  execute(): void {
    use($item`Oscus's neverending soda`);
  }
}

export class MagicalSausages extends MpSource {
  static instance = new MagicalSausages();

  usesRemaining(): number | null {
    return 23 - get("_sausagesEaten");
  }

  availableMpMin(): number {
    const maxSausages = Math.min(
      23 - get("_sausagesEaten"),
      itemAmount($item`magical sausage`) +
        itemAmount($item`magical sausage casing`)
    );
    return Math.min(myMaxmp(), 999) * maxSausages;
  }

  execute(): void {
    const mpSpaceAvailable = myMaxmp() - myMp();
    if (mpSpaceAvailable < 700) return;
    const maxSausages = Math.min(
      23 - get("_sausagesEaten"),
      itemAmount($item`magical sausage`) +
        itemAmount($item`magical sausage casing`),
      Math.floor((myMaxmp() - myMp()) / Math.min(myMaxmp() - myMp(), 999))
    );
    retrieveItem(maxSausages, $item`magical sausage`);
    eat(maxSausages, $item`magical sausage`);
  }
}

type MoodOptions = {
  songSlots: Effect[][];
  mpSources: MpSource[];
  reserveMp: number;
};

abstract class MoodElement {
  mpCostPerTurn(): number {
    return 0;
  }
  turnIncrement(): number {
    return 1;
  }
  abstract execute(mood: Mood, ensureTurns: number): boolean;
}

class SkillMoodElement extends MoodElement {
  skill: Skill;

  constructor(skill: Skill) {
    super();
    this.skill = skill;
  }

  mpCostPerTurn(): number {
    const turns = turnsPerCast(this.skill);
    return turns > 0 ? mpCost(this.skill) / turns : 0;
  }

  turnIncrement(): number {
    return turnsPerCast(this.skill);
  }

  execute(mood: Mood, ensureTurns: number): boolean {
    const effect = toEffect(this.skill);
    const initialTurns = haveEffect(effect);

    if (!haveSkill(this.skill)) return false;
    if (initialTurns >= ensureTurns) return true;

    // Deal with song slots.
    if (
      mood.options.songSlots.length > 0 &&
      isSong(this.skill) &&
      !have(effect)
    ) {
      const activeSongs = getActiveSongs();
      for (const song of activeSongs) {
        const slot = mood.options.songSlots.find((slot) => slot.includes(song));
        if (!slot || slot.includes(effect)) cliExecute(`shrug ${song}`);
      }
    }

    let oldRemainingCasts = -1;
    let remainingCasts = Math.ceil(
      (ensureTurns - haveEffect(effect)) / turnsPerCast(this.skill)
    );
    while (remainingCasts > 0 && oldRemainingCasts !== remainingCasts) {
      let maxCasts;
      if (hpCost(this.skill) > 0) {
        // FIXME: restore HP
        maxCasts = Math.floor(myHp() / hpCost(this.skill));
      } else {
        const cost = mpCost(this.skill);
        maxCasts = Math.floor(myMp() / cost);
        if (maxCasts === 0) {
          mood.moreMp(cost);
          maxCasts = Math.floor(myMp() / cost);
        }
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

  execute(mood: Mood, ensureTurns: number): boolean {
    // FIXME: Smarter buying logic.
    // FIXME: Allow constructing stuff (e.g. snow cleats)
    const effect = effectModifier(this.potion, "Effect");
    const effectTurns = haveEffect(effect);
    const turnsPerUse = numericModifier(this.potion, "Effect Duration");
    if (mallPrice(this.potion) > this.maxPricePerTurn * turnsPerUse) {
      return false;
    }
    // integer part
    if (effectTurns < ensureTurns) {
      const uses = Math.floor((ensureTurns - effectTurns) / turnsPerUse);
      const quantityToBuy = clamp(uses - availableAmount(this.potion), 0, 100);
      buy(
        quantityToBuy,
        this.potion,
        Math.floor(this.maxPricePerTurn * turnsPerUse)
      );
      const quantityToUse = clamp(uses, 0, availableAmount(this.potion));
      use(quantityToUse, this.potion);
    }

    // fractional part
    const remainingDifference = ensureTurns - haveEffect(effect);
    if (remainingDifference > 0) {
      const price = this.maxPricePerTurn * remainingDifference;
      if (price >= mallPrice(this.potion)) {
        if (
          availableAmount(this.potion) ||
          buy(1, this.potion, Math.floor(price))
        ) {
          use(1, this.potion);
        }
      }
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

  execute(mood: Mood, ensureTurns: number): boolean {
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

  execute(mood: Mood, ensureTurns: number): boolean {
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

class AsdonMoodElement extends MoodElement {
  effect: Effect;

  constructor(effect: Effect) {
    super();
    this.effect = effect;
  }

  execute(mood: Mood, ensureTurns: number): boolean {
    return AsdonMartin.drive(this.effect, ensureTurns);
  }
}

/**
 * Class representing a mood object. Add mood elements using the instance methods, which can be chained.
 */
export class Mood {
  static defaultOptions: MoodOptions = {
    songSlots: [],
    mpSources: [MagicalSausages.instance, OscusSoda.instance],
    reserveMp: 0,
  };

  /**
   * Set default options for new Mood instances.
   * @param options Default options for new Mood instances.
   */
  static setDefaultOptions(options: Partial<MoodOptions>): void {
    Mood.defaultOptions = { ...Mood.defaultOptions, ...options };
  }

  options: MoodOptions;
  elements: MoodElement[] = [];

  /**
   * Construct a new Mood instance.
   * @param options Options for mood.
   */
  constructor(options: Partial<MoodOptions> = {}) {
    this.options = { ...Mood.defaultOptions, ...options };
  }

  /**
   * Get the MP available for casting skills.
   */
  availableMp(): number {
    return (
      sum(this.options.mpSources, (mpSource: MpSource) =>
        mpSource.availableMpMin()
      ) + Math.max(myMp() - this.options.reserveMp, 0)
    );
  }

  moreMp(minimumTarget: number): void {
    for (const mpSource of this.options.mpSources) {
      const usesRemaining = mpSource.usesRemaining();
      if (usesRemaining !== null && usesRemaining > 0) {
        mpSource.execute();
        if (myMp() >= minimumTarget) break;
      }
    }
  }

  /**
   * Add a skill to the mood.
   * @param skill Skill to add.
   */
  skill(skill: Skill): Mood {
    this.elements.push(new SkillMoodElement(skill));
    return this;
  }

  /**
   * Add an effect to the mood, with casting based on {effect.default}.
   * @param effect Effect to add.
   * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
   */
  effect(effect: Effect, gainEffect?: () => void): Mood {
    const skill = toSkill(effect);
    if (!gainEffect && skill !== $skill`none`) {
      this.skill(skill);
    } else {
      this.elements.push(new CustomMoodElement(effect, gainEffect));
    }
    return this;
  }

  /**
   * Add a potion to the mood.
   * @param potion Potion to add.
   * @param maxPricePerTurn Maximum price to pay per turn of the effect.
   */
  potion(potion: Item, maxPricePerTurn: number): Mood {
    this.elements.push(new PotionMoodElement(potion, maxPricePerTurn));
    return this;
  }

  /**
   * Add an effect to acquire via pocket wishes to the mood.
   * @param effect Effect to wish for in the mood.
   */
  genie(effect: Effect): Mood {
    this.elements.push(new GenieMoodElement(effect));
    return this;
  }

  /**
   * Add an Asdon Martin driving style to the mood.
   * @param effect Driving style to add to the mood.
   */
  drive(effect: Effect): Mood {
    if (
      Object.values(AsdonMartin.Driving).includes(effect) &&
      AsdonMartin.installed()
    ) {
      this.elements.push(new AsdonMoodElement(effect));
    }
    return this;
  }

  /**
   * Execute the mood, trying to ensure {ensureTurns} of each effect.
   * @param ensureTurns Turns of each effect to try and achieve.
   * @returns Whether or not we successfully got this many turns of every effect in the mood.
   */
  execute(ensureTurns = 1): boolean {
    const availableMp = this.availableMp();
    const totalMpPerTurn = sum(this.elements, (element: MoodElement) =>
      element.mpCostPerTurn()
    );
    const potentialTurns = Math.floor(availableMp / totalMpPerTurn);
    let completeSuccess = true;
    for (const element of this.elements) {
      let elementTurns = ensureTurns;
      if (element.mpCostPerTurn() > 0) {
        const elementPotentialTurns =
          Math.floor(potentialTurns / element.turnIncrement()) *
          element.turnIncrement();
        elementTurns = Math.min(ensureTurns, elementPotentialTurns);
      }
      completeSuccess = element.execute(this, elementTurns) && completeSuccess;
    }
    return completeSuccess;
  }
}
