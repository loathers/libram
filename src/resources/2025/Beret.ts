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
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $skill,
  $slot,
  $slots,
  get,
  maxBy,
  NumericModifier,
  sum,
} from "../../index.js";
import { have as have_ } from "../../lib.js";

const beret = $item`prismatic beret`;

export type EffectValuer =
  | Partial<Record<NumericModifier, number>>
  | ((effect: Effect) => number)
  | Effect[];
const valueEffect = (effect: Effect, valuer: EffectValuer) =>
  typeof valuer === "function"
    ? valuer(effect)
    : Array.isArray(valuer)
      ? Number(valuer.includes(effect))
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
  effects: Effect[],
  effectValuer: EffectValuer,
  uselessEffects: Set<Effect>,
): number {
  const usefulEffects = effects.filter((ef) => !uselessEffects.has(ef));
  return sum(usefulEffects, (ef) => valueEffect(ef, effectValuer));
}

/**
 * Calculate the optimal power-sum at which to busk, given a weighted set of modifiers.
 * @param wantedEffects An array of Effects we care about; maximizes the number of those effects we end up with
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power-sum at which you'll find the optimal busk for this situation.
 */
export function findOptimalCasts(
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
export function findOptimalCasts(
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
export function findOptimalCasts(
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
export function findOptimalCasts(
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
      Object.keys(beretBuskingEffects(power, buskUses))
        .map((e) => toEffect(e))
        .filter((e) => e !== $effect.none),
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
    if (!map.has(power)) map.set(power, it);
  }
  return map;
};

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

  for (const [hatPower, hat] of hatPowers) {
    for (const [pantPower, pant] of pantsPowers) {
      if (pantPower + hatPower > power) continue;
      for (const [shirtPower, shirt] of shirtPowers) {
        if (hatPower + shirtPower + pantPower === power)
          return { hat, pant, shirt };
      }
    }
  }

  return null;
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
  const { hat, pant, shirt } = outfit;
  equip($slot`hat`, hat);
  if (hat !== beret) {
    useFamiliar($familiar`Mad Hatrack`);
    equip($slot`familiar`, beret);
  }
  equip($slot`shirt`, shirt);
  equip($slot`pants`, pant);
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
