import {
  Effect,
  numericModifier,
  toEffect,
  beretBuskingEffects,
  getPower,
  Item,
  toSlot,
  npcPrice,
  canEquip,
  equippedItem,
  myFamiliar,
  equip,
  useFamiliar,
  useSkill,
  buy,
  myMeat,
} from "kolmafia";
import { have as have_, unequip } from "../../lib.js";
import {
  $effect,
  $familiar,
  $item,
  $skill,
  $slot,
  $slots,
} from "../../template-string.js";
import { NumericModifier } from "../../modifierTypes.js";
import { maxBy, sum } from "../../utils.js";
import logger from "../../logger.js";
import { get } from "../../property.js";

const beret = $item`prismatic beret`;

export type EffectValuer =
  | Partial<Record<NumericModifier, number>>
  | ((effect: Effect, duration: number) => number)
  | Effect[];
const valueEffect = (effect: Effect, duration: number, valuer: EffectValuer) =>
  typeof valuer === "function"
    ? valuer(effect, duration)
    : Array.isArray(valuer)
      ? Number(valuer.includes(effect)) * duration
      : sum(
          Object.entries(valuer),
          ([modifier, weight]) => weight * numericModifier(effect, modifier),
        );

export type BuskOptions = Partial<{
  uselessEffects: Effect[];
  hammerTime: boolean;
  buyItems: boolean;
}>;

/**
 * @returns Whether or not you have the prismatic beret
 */
export function have(): boolean {
  return have_(beret);
}

function getEffectivePower(
  item: Item,
  hammerTime = have_($effect`Hammertime`),
): number {
  switch (toSlot(item)) {
    case $slot`hat`:
      return (
        getPower(item) * (1 + (have_($skill`Tao of the Terrapin`) ? 1 : 0))
      );
    case $slot`shirt`:
      return getPower(item);
    case $slot`pants`:
      return (
        getPower(item) *
        (1 +
          (1 + (have_($skill`Tao of the Terrapin`) ? 1 : 0)) +
          (hammerTime ? 3 : 0))
      );
    default:
      return 0;
  }
}

function sumEquipmentPower(
  overrideEquipment = {
    hat: equippedItem($slot`hat`),
    pants: equippedItem($slot`pants`),
    shirt: equippedItem($slot`shirt`),
    hammerTime: have_($effect`Hammertime`),
  },
): number {
  return (
    getEffectivePower(overrideEquipment.hat, overrideEquipment.hammerTime) +
    getEffectivePower(overrideEquipment.pants, overrideEquipment.hammerTime) +
    getEffectivePower(overrideEquipment.shirt, overrideEquipment.hammerTime)
  );
}

function getUseableClothes(buyItems = true): {
  useableHats: Item[];
  useablePants: Item[];
  useableShirts: Item[];
} {
  const availableItems = Item.all().filter(
    (i) => canEquip(i) && (have_(i) || (buyItems && npcPrice(i) > 0)),
  );
  const useableHats = have_($familiar`Mad Hatrack`)
    ? [...availableItems.filter((i) => toSlot(i) === $slot`hat`), $item.none]
    : [beret];
  const useablePants = [
    ...availableItems.filter((i) => toSlot(i) === $slot`pants`),
    $item.none,
  ];
  const useableShirts = [
    ...availableItems.filter((i) => toSlot(i) === $slot`shirt`),
    $item.none,
  ];
  return { useableHats, useablePants, useableShirts };
}

function availablePowersums({
  buyItems = true,
  hammerTime = have_($effect`Hammertime`),
}: BuskOptions): number[] {
  const { useableHats, useablePants, useableShirts } =
    getUseableClothes(buyItems);

  return [
    ...new Set(
      useableHats.flatMap((hat) =>
        useablePants.flatMap((pants) =>
          useableShirts.flatMap((shirt) =>
            sumEquipmentPower({ hat, pants, shirt, hammerTime }),
          ),
        ),
      ),
    ),
  ];
}

function scoreBusk(
  effects: [Effect, number][],
  effectValuer: EffectValuer,
  uselessEffects: Set<Effect>,
): number {
  const usefulEffects = effects.filter(
    ([effect]) => !uselessEffects.has(effect),
  );
  return sum(usefulEffects, ([effect, duration]) =>
    valueEffect(effect, duration, effectValuer),
  );
}

/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param wantedEffects An array of Effects we care about; maximizes the number of those effects we end up with
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @param buskUses How many busks should we assume we've cast? Defaults to the current number.
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  wantedEffects: Effect[],
  options?: BuskOptions,
  buskUses?: number,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param weightedModifiers An object keyed by Numeric Modifiers, with their values representing weights
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @param buskUses How many busks should we assume we've cast? Defaults to the current number.
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  weightedModifiers: Partial<Record<NumericModifier, number>>,
  options?: BuskOptions,
  buskUses?: number,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param valueFunction A function that maps effects to values
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @param buskUses How many busks should we assume we've cast? Defaults to the current number.
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  valueFunction: (effect: Effect, duration: number) => number,
  options?: BuskOptions,
  buskUses?: number,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param effectValuer Either a function that maps effect-duration pairs to values, or an object keyed by numeric modifiers with weights as values, or an array of desired effects
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @param buskUses How many busks should we assume we've cast? Defaults to the current number.
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  effectValuer: EffectValuer,
  options?: BuskOptions,
  buskUses?: number,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param effectValuer Either a function that maps effect-duration pairs to values, or an object keyed by numeric modifiers with weights as values, or an array of desired effects
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @param buskUses How many busks should we assume we've cast? Defaults to the current number.
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  effectValuer: EffectValuer,
  {
    buyItems = true,
    uselessEffects = [],
    hammerTime = have_($effect`Hammertime`),
  }: BuskOptions = {},
  buskUses = get("_beretBuskingUses"),
): number {
  const uselessEffectSet = new Set(uselessEffects);
  const powersums = availablePowersums({ buyItems, hammerTime });
  if (!powersums.length) return 0;
  return maxBy(powersums, (power) =>
    scoreBusk(
      Object.entries(beretBuskingEffects(power, buskUses))
        .map(([effect, duration]): [Effect, number] => [
          toEffect(effect),
          duration,
        ])
        .filter(([e]) => e !== $effect.none),
      effectValuer,
      uselessEffectSet,
    ),
  );
}

const validateItems = (arr: Item[], maxPower: number) => {
  const map = new Map<number, Item>();
  for (const it of arr) {
    const power = getEffectivePower(it);
    if (power > maxPower) continue;

    const existing = map.get(power);
    if (
      !existing ||
      (!have_(existing) && (have_(it) || npcPrice(it) < npcPrice(existing)))
    ) {
      map.set(power, it);
    }
  }
  return [...map.values()];
};
const relevantSlots = ["hat", "pants", "shirt"] as const;
const functionalPrice = (item: Item) =>
  have_(item) || item === Item.none ? 0 : npcPrice(item);
const outfitPrice = (outfit: { hat: Item; pants: Item; shirt: Item }) =>
  sum(relevantSlots, (slot) => functionalPrice(outfit[slot]));
function findOutfit(power: number, buyItems: boolean, hammerTime: boolean) {
  const { useableHats, useablePants, useableShirts } =
    getUseableClothes(buyItems);

  const outfits = validateItems(useableHats, power).flatMap((hat) =>
    validateItems(useablePants, power).flatMap((pants) =>
      validateItems(useableShirts, power).flatMap((shirt) =>
        sumEquipmentPower({ hat, pants, shirt, hammerTime }) === power
          ? { hat, pants, shirt }
          : [],
      ),
    ),
  );
  if (!outfits.length) return null;
  const outfit = maxBy(outfits, outfitPrice, true);
  logger.debug(`Chose outfit ${outfit.hat} ${outfit.shirt} ${outfit.pants}`);
  if (outfitPrice(outfit) > myMeat()) return null;

  for (const slot of relevantSlots) {
    const item = outfit[slot];
    if (item === Item.none) continue;
    if (have_(item)) continue;
    if (!buy(item)) {
      logger.debug(`Failed to purchase ${item}`);
      return null;
    }
  }
  return outfit;
}

/**
 * Attempt to busk at a particular power
 * @param power The power in question
 * @param options An object containing the following optional keys:
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @param options.hammerTime Whether or not to assume you have Hammertime--defaults to whether you currently have it
 * @returns If we successfully busked at that power
 */
export function buskAt(
  power: number,
  {
    buyItems = true,
    hammerTime = have_($effect`Hammertime`),
  }: BuskOptions = {},
): boolean {
  if (!have()) return false;
  const initialUses = get("_beretBuskingUses");
  if (initialUses >= 5) return false;
  const outfit = findOutfit(power, buyItems, hammerTime);
  if (!outfit) return false;
  const initialEquips = $slots`hat, shirt, pants`.map((slot) =>
    equippedItem(slot),
  );
  const initialFamiliar = myFamiliar();
  const initialFamequip = equippedItem($slot`familiar`);
  const { hat, pants, shirt } = outfit;
  equip($slot`hat`, hat);
  if (hat !== beret) {
    useFamiliar($familiar`Mad Hatrack`);
    equip($slot`familiar`, beret);
  }
  equip($slot`shirt`, shirt);
  equip($slot`pants`, pants);
  try {
    if (sumEquipmentPower() !== power) {
      return false;
    }
    useSkill($skill`Beret Busking`);
    return initialUses !== get("_beretBuskingUses");
  } finally {
    $slots`hat, shirt, pants`.forEach((slot, index) =>
      equip(slot, initialEquips[index]),
    );
    if (
      initialFamiliar !== $familiar`Mad Hatrack` &&
      myFamiliar() === $familiar`Mad Hatrack`
    ) {
      unequip($slot`familiar`);
    }
    useFamiliar(initialFamiliar);
    equip($slot`familiar`, initialFamequip);
  }
}

export function buskFor(
  weightedModifiers: Partial<Record<NumericModifier, number>>,
  { buyItems, uselessEffects }: BuskOptions,
): boolean;
export function buskFor(
  effects: Effect[],
  { buyItems, uselessEffects }: BuskOptions,
): boolean;
export function buskFor(
  valueFunction: (effect: Effect, duration: number) => number,
  { buyItems, uselessEffects }: BuskOptions,
): boolean;
/**
 * Calculate the best outfit-power you can achieve for a given busk valuation, and then busks.
 * @param effectValuer Either a function that maps effect-duration pairs to values, or an object keyed by numeric modifiers with weights as values, or an array of desired effects
 * @param options An object containing the following optional keys:
 * @param options.uselessEffects An array (defaults to empty) of effects not to consider for the purposes of busk valuation
 * @param options.buyItems Whether or not we should consider purchasing items from NPC stores; defaults to true
 * @returns Whether we were successful in our endeavor
 */
export function buskFor(
  effectValuer: EffectValuer,
  { buyItems = true, uselessEffects = [] }: BuskOptions = {},
): boolean {
  const outfitPower = findOptimalOutfitPower(
    effectValuer,
    { buyItems, uselessEffects },
    get("_beretBuskingUses"),
  );
  return buskAt(outfitPower, { buyItems });
}
