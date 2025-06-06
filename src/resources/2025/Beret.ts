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

function beretPowerSum(): number[] {
  const taoMultiplier = have_($skill`Tao of the Terrapin`) ? 2 : 1;

  const allItems = Item.all().filter((i) => have_(i));
  const shopItems = $items`snorkel, Kentucky-style derby, pentacorn hat, goofily-plumed helmet, yellow plastic hard hat, wooden salad bowl, football helmet, fishin' hat, studded leather boxer shorts, chain-mail monokini, union scalemail pants, paper-plate-mail pants, troutpiece, alpha-mail pants`;
  allItems.push(...shopItems);
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
  uselessEffects: Effect[],
): number {
  const usefulEffects = effects.filter((ef) => !uselessEffects.includes(ef));

  return sum(
    weightedModifiers,
    ([modifier, weight]) =>
      weight * sum(usefulEffects, (ef) => numericModifier(ef, modifier)),
  );
}

/**
 * @returns the equipment power required to get the optimal buffs for a given busk
 * @param weightedModifiers accepts an input of [Modifier, number][] to determine how to optimize for buffs and which to prioritize
 * @param start accepts an input of number (0-5) to determine which busk to check; default behavior is to check the next available busk
 * @param uselessEffects accepts an input of Effect[] and values those effects at 0 for scoring
 */
export function findOptimalBusks(
  weightedModifiers: [Modifier, number][],
  start?: number,
  uselessEffects: Effect[] = $effects``,
): number {
  const buskUses = clamp(toInt(get("_beretBuskingUses")), 0, 5);

  const targetBuskIndex = start ?? buskUses;
  let bestScore = 0;
  let bestPower = 0;

  for (const power of beretPowerSum()) {
    const rawEffects = beretBuskingEffects(power, targetBuskIndex);
    const effects: Effect[] = Array.from(
      new Set(
        Object.keys(rawEffects)
          .map((name) => {
            try {
              return toEffect(name);
            } catch {
              print(`Invalid effect name: ${name}`, "red");
              return null;
            }
          })
          .filter((e): e is Effect => e !== null),
      ),
    );

    const score = scoreBusk(effects, weightedModifiers, uselessEffects);
    if (score > bestScore) {
      bestScore = score;
      bestPower = power;
    }
  }

  return bestPower ?? 0;
}
