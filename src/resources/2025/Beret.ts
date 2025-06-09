import {
  Effect,
  Modifier,
  numericModifier,
  toInt,
  toEffect,
  print,
  beretBuskingEffects,
  getPower,
  Item,
  toSlot,
  npcPrice,
} from "kolmafia";
import {
  $effects,
  $familiar,
  $item,
  $items,
  $skill,
  $slot,
  clamp,
  get,
  sum,
} from "../../index.js";
import { have as have_ } from "../../lib.js";

const beret = $item`prismatic beret`;

/**
 * @returns Whether or not you have the prismatic beret
 */
export function have(): boolean {
  return have_(beret);
}

function beretPowerSum(buyitem: boolean): number[] {
  const taoMultiplier = have_($skill`Tao of the Terrapin`) ? 2 : 1;

  const allItems = Item.all().filter((i) => have_(i) || (buyItem && npcPrice(i) > 0));
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
  weightedModifiers: [Modifier, number][],
  uselessEffects: Set<Effect>,
): number {
  const usefulEffects = effects.filter((ef) => !uselessEffects.has(ef));

  return sum(
    Object.entries(weightedModifiers),
    ([modifier, weight]) =>
      weight * sum(usefulEffects, (ef) => numericModifier(ef, modifier)),
  );
}

/**
 * @returns the equipment power required to get the optimal buffs for a given busk
 * @param weightedModifiers accepts an input of [Modifier, number][] to determine how to optimize for buffs and which to prioritize
 * @param start accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 * @param buyitem boolean, determines if we should check shop available equipment; defaults to true
 */
export function findOptimalBusks(
  weightedModifiers: Partial<Record<NumericModifier, number>>,
  buskUses = get("_beretBuskingUses"),
  uselessEffects: Effect[] = [],
  buyitem: boolean = true,
): number {
const uselessEffectSet = new Set(uselessEffects);
const { bestscore = 0, bestPower = 0 } = beretPowerSum.length ? beretPowerSum.reduce(({ bestScore, bestPower }, currentPower) => {
  const effects = Object.keys(beretBuskingEffects(power, buskUses)).map((e) => toEffect(e)).filter((e) => e !== $effect.none);
    const score = scoreBusk(effects, weightedModifiers,uselessEffectsSet);
    return  score > bestScore ? { bestScore: score, bestPower: power } : { bestScore, bestPower };
  }, { bestScore: 0, bestPower: 0 });

    const score = scoreBusk(effects, weightedModifiers, uselessEffects);
    if (score > bestScore) {
      bestScore = score;
      bestPower = power;
    }
  }

  return bestPower ?? 0;
}
