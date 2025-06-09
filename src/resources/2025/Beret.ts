import {
  Effect,
  numericModifier,
  toEffect,
  beretBuskingEffects,
  getPower,
  Item,
  toSlot,
  npcPrice,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $skill,
  $slot,
  get,
  maxBy,
  NumericModifier,
  sum,
} from "../../index.js";
import { have as have_ } from "../../lib.js";

const beret = $item`prismatic beret`;

export type EffectValuer =
  | Partial<Record<NumericModifier, number>>
  | ((effect: Effect) => number);
const valueEffect = (effect: Effect, valuer: EffectValuer) =>
  typeof valuer === "function"
    ? valuer(effect)
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

function beretPowerSum(buyItem: boolean): number[] {
  const taoMultiplier = have_($skill`Tao of the Terrapin`) ? 2 : 1;

  const allItems = Item.all().filter(
    (i) => have_(i) || (buyItem && npcPrice(i) > 0),
  );
  const allHats = have_($familiar`Mad Hatrack`)
    ? allItems.filter((i) => toSlot(i) === $slot`hat`)
    : [beret];
  const allPants = allItems.filter((i) => toSlot(i) === $slot`pants`);
  const allShirts = allItems.filter((i) => toSlot(i) === $slot`shirt`);

  const hats = [...new Set(allHats.map((i) => taoMultiplier * getPower(i)))];

  const pants = [...new Set(allPants.map((i) => taoMultiplier * getPower(i)))];
  const shirts = [...new Set(allShirts.map((i) => getPower(i)))];

  return [
    ...new Set(
      hats.flatMap((hat) =>
        pants.flatMap((pant) => shirts.flatMap((shirt) => hat + pant + shirt)),
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
 * Calculate the optimal power at which to busk, given a weighted set of modifiers.
 * @param effectValuer Either a function that maps effects to values, or an object keyed by numeric modifiers with weights as values
 * @param buskUses accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyItem boolean, determines if we should check shop available equipment; defaults to true
 * @returns The power at which you'll find the optimal busk for this situation.
 */
export function findOptimalBusks(
  effectValuer: EffectValuer,
  buskUses = get("_beretBuskingUses"),
  uselessEffects: Effect[] = [],
  buyItem: boolean = true,
): number {
  const uselessEffectSet = new Set(uselessEffects);
  const powersum = beretPowerSum(buyItem);
  if (!powersum.length) return 0;
  return maxBy(powersum, (power) =>
    scoreBusk(
      Object.keys(beretBuskingEffects(power, buskUses))
        .map((e) => toEffect(e))
        .filter((e) => e !== $effect.none),
      effectValuer,
      uselessEffectSet,
    ),
  );
}
