import {
  availableAmount,
  buy,
  cliExecute,
  eat,
  Effect,
  effectModifier,
  equip,
  equippedItem,
  haveEffect,
  haveSkill,
  hpCost,
  Item,
  mallPrice,
  mpCost,
  myHp,
  myMaxmp,
  myMp,
  numericModifier,
  restoreMp,
  retrieveItem,
  Skill,
  Slot,
  toEffect,
  toSkill,
  turnsPerCast,
  use,
  useSkill,
} from "kolmafia";
import { getActiveSongs, have, isSong, unequip } from "./lib.js";
import { get } from "./property.js";
import { AsdonMartin } from "./resources/index.js";
import { $effect, $item, $skill, $slot } from "./template-string.js";
import { clamp, sum } from "./utils.js";

const aprilShieldEffects = new Map([
  [$skill`Empathy of the Newt`, $effect`Thoughtful Empathy`],
  [$skill`Sauce Contemplation`, $effect`Lubricating Sauce`],
  [$skill`Manicotti Meditation`, $effect`Tubes of Universal Meat`],
  [$skill`Seal Clubbing Frenzy`, $effect`Slippery as a Seal`],
  [$skill`Patience of the Tortoise`, $effect`Strength of the Tortoise`],
  [$skill`Disco Aerobics`, $effect`Disco over Matter`],
  [$skill`Moxie of the Mariachi`, $effect`Mariachi Moisture`],
]);

export abstract class MpSource {
  usesRemaining(): number {
    return 0;
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

  usesRemaining(): number {
    return get("oscusSodaUsed") ? 0 : 1;
  }

  availableMpMin(): number {
    return this.available() && this.usesRemaining() > 0 ? 200 : 0;
  }

  availableMpMax(): number {
    return this.available() && this.usesRemaining() > 0 ? 300 : 0;
  }

  execute(): void {
    use($item`Oscus's neverending soda`);
  }
}

export class MagicalSausages extends MpSource {
  static instance = new MagicalSausages();

  available(): boolean {
    return have($item`Kramco Sausage-o-Matic™`);
  }

  usesRemaining(): number {
    const maxSausages =
      availableAmount($item`magical sausage`) +
      availableAmount($item`magical sausage casing`);
    return this.available()
      ? clamp(23 - get("_sausagesEaten"), 0, maxSausages)
      : 0;
  }

  availableMpMin(): number {
    return this.available()
      ? Math.min(myMaxmp(), 999) * this.usesRemaining()
      : 0;
  }

  execute(): void {
    const mpSpaceAvailable = myMaxmp() - myMp();
    if (mpSpaceAvailable < 700) return;
    const maxSausages = Math.min(
      this.usesRemaining(),
      Math.floor((myMaxmp() - myMp()) / Math.min(myMaxmp() - myMp(), 999)),
    );
    retrieveItem(maxSausages, $item`magical sausage`);
    eat(maxSausages, $item`magical sausage`);
  }
}

type MoodOptions = {
  songSlots: Effect[][];
  mpSources: MpSource[];
  reserveMp: number;
  useNativeRestores: boolean;
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

interface SkillEffectOptions {
  requireAprilShield?: boolean;
}

class SkillMoodElement extends MoodElement {
  skill: Skill;
  effect: Effect;
  options: SkillEffectOptions;

  constructor(skill: Skill, options: SkillEffectOptions) {
    super();
    this.skill = skill;
    this.effect = options.requireAprilShield
      ? (aprilShieldEffects.get(skill) ?? $effect.none)
      : toEffect(skill);
    this.options = options;
  }

  get aprilShieldRestricted(): boolean {
    return (
      !this.options.requireAprilShield &&
      this.skill === $skill`Empathy of the Newt`
    );
  }

  mpCostPerTurn(): number {
    const turns = turnsPerCast(this.skill);
    return turns > 0 ? mpCost(this.skill) / turns : 0;
  }

  turnIncrement(): number {
    return turnsPerCast(this.skill);
  }

  execute(mood: Mood, ensureTurns: number): boolean {
    if (this.effect === $effect.none) return false;

    const initialTurns = haveEffect(this.effect);
    // Track these separately because of LHM
    const shieldSlot = Slot.all().find(
      (slot) => equippedItem(slot) === $item`April Shower Thoughts shield`,
    );
    const initialOffhand = equippedItem($slot`off-hand`);
    if (initialTurns >= ensureTurns) return true;
    if (!haveSkill(this.skill)) return false;

    if (this.aprilShieldRestricted && shieldSlot) {
      unequip($item`April Shower Thoughts shield`);
    }

    if (mood.options.songSlots && isSong(this.skill) && !have(this.effect)) {
      const activeSongs = getActiveSongs();
      for (const song of activeSongs) {
        const slot = mood.options.songSlots.find((slot) => slot.includes(song));
        if (!slot || slot.includes(this.effect)) {
          cliExecute(`shrug ${song}`);
          break;
        }
      }
    }

    let oldRemainingCasts = -1;
    let remainingCasts = Math.ceil(
      (ensureTurns - haveEffect(this.effect)) / turnsPerCast(this.skill),
    );

    try {
      while (remainingCasts > 0 && oldRemainingCasts !== remainingCasts) {
        if (this.options.requireAprilShield && !shieldSlot) {
          if (!equip($item`April Shower Thoughts shield`)) return false;
        }

        let maxCasts = 0;

        if (hpCost(this.skill) > 0) {
          maxCasts = Math.max(0, Math.floor((myHp() - 1) / hpCost(this.skill)));
        } else {
          const cost = mpCost(this.skill);
          maxCasts = Math.floor(Math.min(mood.availableMp(), myMp()) / cost);
          if (maxCasts < remainingCasts) {
            const bestMp = Math.min(remainingCasts * cost, myMaxmp());
            mood.moreMp(bestMp);
            maxCasts = Math.floor(Math.min(mood.availableMp(), myMp()) / cost);
          }
        }

        const casts = clamp(remainingCasts, 0, Math.min(100, maxCasts));
        useSkill(casts, this.skill);

        oldRemainingCasts = remainingCasts;
        remainingCasts = Math.ceil(
          (ensureTurns - haveEffect(this.effect)) / turnsPerCast(this.skill),
        );
      }

      return haveEffect(this.effect) >= ensureTurns;
    } finally {
      if (shieldSlot) equip($item`April Shower Thoughts shield`, shieldSlot);
      if (initialOffhand !== equippedItem($slot`off-hand`))
        equip(initialOffhand, $slot`off-hand`);
    }
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
        Math.floor(this.maxPricePerTurn * turnsPerUse),
      );
      const quantityToUse = clamp(uses, 0, availableAmount(this.potion));
      use(quantityToUse, this.potion);
    }

    // fractional part
    const remainingDifference = ensureTurns - haveEffect(effect);
    if (remainingDifference > 0) {
      const maxPrice = Math.floor(this.maxPricePerTurn * remainingDifference);
      if (mallPrice(this.potion) <= maxPrice) {
        if (availableAmount(this.potion) || buy(1, this.potion, maxPrice)) {
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
      (haveEffect(this.effect) - ensureTurns) / 20,
    );
    const wishesToBuy = clamp(
      neededWishes - availableAmount($item`pocket wish`),
      0,
      20,
    );
    buy(wishesToBuy, $item`pocket wish`, 50000);
    let wishesToUse = clamp(
      neededWishes,
      0,
      availableAmount($item`pocket wish`),
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
  preferInventory: boolean;

  constructor(effect: Effect, preferInventory = false) {
    super();
    this.effect = effect;
    this.preferInventory = preferInventory;
  }

  execute(mood: Mood, ensureTurns: number): boolean {
    return AsdonMartin.drive(this.effect, ensureTurns, this.preferInventory);
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
    useNativeRestores: false,
  };

  /**
   * Set default options for new Mood instances.
   *
   * @param options Default options for new Mood instances.
   */
  static setDefaultOptions(options: Partial<MoodOptions>): void {
    Mood.defaultOptions = { ...Mood.defaultOptions, ...options };
  }

  options: MoodOptions;
  elements: MoodElement[] = [];

  /**
   * Construct a new Mood instance.
   *
   * @param options Options for mood.
   */
  constructor(options: Partial<MoodOptions> = {}) {
    this.options = { ...Mood.defaultOptions, ...options };
  }

  /**
   * Get the MP available for casting skills.
   *
   * @returns Available MP
   */
  availableMp(): number {
    return this.options.useNativeRestores
      ? Infinity
      : sum(this.options.mpSources, (mpSource: MpSource) =>
          mpSource.availableMpMin(),
        ) + Math.max(myMp() - this.options.reserveMp, 0);
  }

  moreMp(minimumTarget: number): void {
    if (myMp() >= minimumTarget) return;
    for (const mpSource of this.options.mpSources) {
      if (mpSource.usesRemaining() > 0) {
        mpSource.execute();
        if (myMp() >= minimumTarget) break;
      }
    }

    if (this.options.useNativeRestores) {
      restoreMp(minimumTarget);
    }
  }

  /**
   * Add a skill to the mood.
   *
   * @param skill Skill to add.
   * @param options Additional `SkillEffectOptions` to pass to new `SkillMoodElement`
   * @returns This mood to enable chaining
   */
  skill(skill: Skill, options: SkillEffectOptions = {}): Mood {
    this.elements.push(new SkillMoodElement(skill, options));
    return this;
  }

  /**
   * Add an effect to the mood, with casting based on {effect.default}.
   *
   * @param effect Effect to add.
   * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
   * @returns This mood to enable chaining
   */
  effect(effect: Effect, gainEffect?: () => void): Mood {
    const skill = toSkill(effect);
    const requireAprilShield = aprilShieldEffects
      .values()
      .some((ef) => ef === effect);
    if ((!gainEffect && skill !== $skill.none) || requireAprilShield) {
      this.skill(skill, { requireAprilShield });
    } else {
      this.elements.push(new CustomMoodElement(effect, gainEffect));
    }
    return this;
  }

  /**
   * Add a potion to the mood.
   *
   * @param potion Potion to add.
   * @param maxPricePerTurn Maximum price to pay per turn of the effect.
   * @returns This mood to enable chaining
   */
  potion(potion: Item, maxPricePerTurn: number): Mood {
    this.elements.push(new PotionMoodElement(potion, maxPricePerTurn));
    return this;
  }

  /**
   * Add an effect to acquire via pocket wishes to the mood.
   *
   * @param effect Effect to wish for in the mood.
   * @returns This mood to enable chaining
   */
  genie(effect: Effect): Mood {
    this.elements.push(new GenieMoodElement(effect));
    return this;
  }

  /**
   * Add an Asdon Martin driving style to the mood.
   *
   * @param effect Driving style to add to the mood.
   * @returns This mood to enable chaining
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
   *
   * @param ensureTurns Turns of each effect to try and achieve.
   * @returns Whether or not we successfully got this many turns of every effect in the mood.
   */
  execute(ensureTurns = 1): boolean {
    const availableMp = this.availableMp();
    const totalMpPerTurn = sum(this.elements, (element: MoodElement) =>
      element.mpCostPerTurn(),
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
    this.moreMp(this.options.reserveMp);
    return completeSuccess;
  }
}
