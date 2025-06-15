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
import { have as have_ } from "../../lib.js";
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

/**
 * @returns Whether or not you have the prismatic beret
 */
export function have(): boolean {
  return have_(beret);
}

function getUseableClothes(buyItem = true): {
  useableHats: Item[];
  useablePants: Item[];
  useableShirts: Item[];
} {
  const availableItems = Item.all().filter(
    (i) => canEquip(i) && (have_(i) || (buyItem && npcPrice(i) > 0)),
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

function availablePowersums(buyItem: boolean): number[] {
  const taoMultiplier = have_($skill`Tao of the Terrapin`) ? 2 : 1;

  const { useableHats, useablePants, useableShirts } =
    getUseableClothes(buyItem);

  const hatPowers = [
    ...new Set(useableHats.map((i) => taoMultiplier * getPower(i))),
  ];
  const pantPowers = [
    ...new Set(useablePants.map((i) => taoMultiplier * getPower(i))),
  ];
  const shirtPowers = [...new Set(useableShirts.map((i) => getPower(i)))];

  return [
    ...new Set(
      hatPowers.flatMap((hat) =>
        pantPowers.flatMap((pant) =>
          shirtPowers.flatMap((shirt) => hat + pant + shirt),
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
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  wantedEffects: Effect[],
  buskUses?: number,
  uselessEffects?: Effect[],
  buyItem?: boolean,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param weightedModifiers An object keyed by Numeric Modifiers, with their values representing weights
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  weightedModifiers: Partial<Record<NumericModifier, number>>,
  buskUses?: number,
  uselessEffects?: Effect[],
  buyItem?: boolean,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param effectValue A function that maps effects to values
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  effectValue: (effect: Effect) => number,
  buskUses?: number,
  uselessEffects?: Effect[],
  buyItem?: boolean,
): number;
/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param effectValuer Either a function that maps effects to values, or an object keyed by numeric modifiers with weights as values
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalOutfitPower(
  effectValuer: EffectValuer,
  buskUses = get("_beretBuskingUses"),
  uselessEffects: Effect[] = [],
  buyItem = true,
): number {
  const uselessEffectSet = new Set(uselessEffects);
  const powersums = availablePowersums(buyItem);
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

const populateMap = (arr: Item[], max: number, double: boolean) => {
  const map = new Map<number, Item>();
  for (const it of arr) {
    const power = getPower(it) * (double ? 2 : 1);
    if (power > max) continue;

    const existing = map.get(power);
    if (
      !existing ||
      (!have_(existing) && (have_(it) || npcPrice(it) < npcPrice(existing)))
    ) {
      map.set(power, it);
    }
  }
  return map;
};
const relevantSlots = ["hat", "pants", "shirt"] as const;
const functionalPrice = (item: Item) => (have_(item) ? 0 : npcPrice(item));
const outfitPrice = (outfit: { hat: Item; pants: Item; shirt: Item }) =>
  sum(relevantSlots, (slot) => functionalPrice(outfit[slot]));
function findOutfit(power: number, buyItem: boolean) {
  const { useableHats, useablePants, useableShirts } =
    getUseableClothes(buyItem);
  const hatPowers = populateMap(
    useableHats,
    power,
    have_($skill`Tao of the Terrapin`),
  );
  const pantsPowers = populateMap(
    useablePants,
    power,
    have_($skill`Tao of the Terrapin`),
  );
  const shirtPowers = populateMap(useableShirts, power, false);

  const outfits = [...hatPowers].flatMap(([hatPower, hat]) =>
    [...pantsPowers].flatMap(([pantsPower, pants]) =>
      [...shirtPowers].flatMap(([shirtPower, shirt]) =>
        hatPower + pantsPower + shirtPower === power
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
 * @param buyItem Whether to buy items from NPC shops to create an outfit
 * @returns If we successfully busked at that power
 */
export function buskAt(power: number, buyItem = true): boolean {
  if (!have()) return false;
  const initialUses = get("_beretBuskingUses");
  if (initialUses >= 5) return false;
  const outfit = findOutfit(power, buyItem);
  if (!outfit) return false;
  const initialEquips = $slots`hat, shirt, pants`.map((slot) =>
    equippedItem(slot),
  );
  const initialFamiliar = myFamiliar();
  const initialFamequip = equippedItem($slot`familiar equipment`);
  const { hat, pants, shirt } = outfit;
  equip($slot`hat`, hat);
  if (hat !== beret) {
    useFamiliar($familiar`Mad Hatrack`);
    equip($slot`familiar`, beret);
  }
  equip($slot`shirt`, shirt);
  equip($slot`pants`, pants);
  const taoMultiplier = have_($skill`Tao of the Terrapin`) ? 2 : 1;
  try {
    if (
      taoMultiplier *
        (getPower(equippedItem($slot`hat`)) +
          getPower(equippedItem($slot`pants`))) +
        getPower(equippedItem($slot`shirt`)) !==
      power
    ) {
      return false;
    }
    useSkill($skill`Beret Busking`);
    return initialUses !== get("_beretBuskingUses");
  } finally {
    $slots`hat, shirt, pants`.forEach((slot, index) =>
      equip(slot, initialEquips[index]),
    );
    useFamiliar(initialFamiliar);
    equip($slot`familiar`, initialFamequip);
  }
}
