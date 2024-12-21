import { Element } from "kolmafia";
import { $elements } from "./template-string.js";
import { get as getModifier } from "./modifier.js";
import { capitalize, sum } from "./utils.js";

export const SUPER_EFFECTIVE_CHART = Object.freeze({
  hot: $elements`Spooky, Cold`,
  spooky: $elements`Cold, Sleaze`,
  cold: $elements`Sleaze, Stench`,
  sleaze: $elements`Stench, Hot`,
  stench: $elements`Hot, Spooky`,
} as const);

function isConventionalElement(
  name: string,
): name is keyof typeof SUPER_EFFECTIVE_CHART {
  return name in SUPER_EFFECTIVE_CHART;
}

/**
 * Determines if one type deals super effective damage against the other
 * @param element The type of the damage
 * @param against The type of the monster
 * @returns Whether `element` is super effective against `against`
 */
export function isSuperEffective(element: Element, against: Element): boolean {
  const elementName = element.toString();

  return (
    isConventionalElement(elementName) &&
    SUPER_EFFECTIVE_CHART[elementName].includes(against)
  );
}

/**
 * Determines the amount of expected elemental damage, taking into account immunity and super effectiveness.
 * @param damage The base amount of damage
 * @param damageType The elemental type of the damage
 * @param monsterType The elemental type of the target
 * @returns The expected amount of damage the target would take
 */
export function elementalDamage(
  damage: number,
  damageType: Element,
  monsterType: Element,
): number {
  if (damage === 0) return 0;
  if (damageType === monsterType) return 1;
  if (isSuperEffective(damageType, monsterType)) return 2 * damage;
  return damage;
}

export const TRADITIONAL_ELEMENTS = Object.freeze(
  $elements`cold, hot, sleaze, spooky, stench`,
);

/**
 * @returns The total amount of elemental damage you have from all sources
 */
export function totalElementalDamage(): number {
  return sum(
    TRADITIONAL_ELEMENTS.map((el) => el.toString()).filter(
      isConventionalElement,
    ),
    (el) => getModifier(`${capitalize(el)} Damage`),
  );
}
