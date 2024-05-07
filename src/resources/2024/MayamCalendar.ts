import { cliExecute, Effect, Item } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $effect, $item } from "../../template-string";

export const RINGS = Object.freeze([
  ["yam1", "sword", "eye", "chair", "fur", "vessel"],
  ["lightning", "bottle", "meat", "wood", "yam2"],
  ["yam3", "wall", "cheese", "eyepatch"],
  ["explosion", "clock", "yam4"],
] as const);

export type MayamSymbol = (typeof RINGS)[number][number];
export type Ring<N extends number> = (typeof RINGS)[N][number];
export type Combination = [Ring<0>, Ring<1>, Ring<2>, Ring<3>];
export type CombinationString = `${Ring<0>} ${Ring<1>} ${Ring<2>} ${Ring<3>}`;

/**
 * @returns Whether you `have` the Mayam calendar
 */
export function have(): boolean {
  return have_($item`Mayam Calendar`);
}

const symbolsUsed = () => get("_mayamSymbolsUsed").split(",");

/**
 * Determine whether a certain Mayam symbol is available for use today
 *
 * @param {MayamSymbol} symbol The symbol to check
 * @returns Whether or not the given symbol is available for use
 */
export function available(symbol: MayamSymbol): boolean;
/**
 * Determine whether a certain Mayam combination is available for use today
 *
 * @param {...Combination} combination The combination to check
 * @returns Whether or not the given combination is available for use
 */
export function available(...combination: Combination): boolean;
/**
 * Determine whether certain Mayam symbols are available for use today
 *
 * @param {...MayamSymbol[]} symbols The symbols to check
 * @returns Whether or not the given symbols are all available for use
 */
export function available(...symbols: MayamSymbol[]): boolean {
  return symbols.every((symbol) => !symbolsUsed().includes(symbol));
}

/**
 * @returns The remaining number of uses you have of your Mayam calendar today
 */
export function remainingUses(): number {
  return RINGS[3].filter((symbol) => available(symbol)).length;
}

const toCombination = (
  combination: Combination | [CombinationString],
): Combination =>
  combination.length === 1
    ? (combination[0].split(" ") as Combination)
    : combination;

/**
 * Enter a combination in the Mayam calendar
 * @param combination The combination to submit, either as a single string or as a series of symbols
 * @returns Whether we succeeded in our endeavor
 */
export function submit(
  ...combination: Combination | [CombinationString]
): boolean {
  if (!available(...toCombination(combination))) {
    return false;
  }
  return cliExecute(`mayam ring ${combination.join(" ")}`);
}

export const RESONANCES = Object.freeze({
  "eye yam2 eyepatch yam4": $item`Mayam spinach`,
  "vessel yam2 cheese explosion": $item`stuffed yam stinkbomb`,
  "yam1 meat cheese yam4": $item`yam and swiss`,
  "sword yam2 eyepatch explosion": $item`yam cannon`,
  "fur lightning eyepatch yam4": $item`tiny yam cannon`,
  "yam1 lightning yam3 clock": $item`yam battery`,
  "fur yam2 wall yam4": $item`furry yam buckler`,
  "yam1 yam2 yam3 explosion": $item`thanksgiving bomb`,
  "yam1 meat eyepatch yam4": $item`yamtility belt`,
  "chair yam2 yam3 clock": $effect`Caught Yam-Handed`,
  "yam1 yam2 cheese clock": $effect`Memories of Cheesier Age`,
});

/**
 * Find the combination needed to get a particular resonance
 * @param target The Item or Effect granted by the resonance
 * @returns The combination needed, or null if none such exists
 */
export function resonanceFor(target: Item | Effect): Combination | null {
  return (
    ([...Object.entries(RESONANCES)]
      .find(([, value]) => value === target)?.[0]
      .split(" ") as Combination) ?? null
  );
}

/**
 * Determines whether an item can be obtained via resonance at this moment
 * @param target The target Item or Effect for your resonance
 * @returns Whether or not you can currently use that resonance
 */
export function resonanceAvailable(target: Item | Effect): boolean {
  const resonance = resonanceFor(target);
  return !!resonance && available(...resonance);
}

/**
 * Determine what Item or Effect results from a particular resonance
 *
 * @param combination The combination to check, either as a single string or a series of symbols
 * @returns The Item or Effect of the resonance, if it is indeed a resonance; `null` otherwise
 */
export function getResonanceResult(
  ...combination: Combination | [CombinationString]
): Item | Effect | null {
  const combinationString =
    combination.length === 1
      ? combination[0]
      : (combination.join(" ") as CombinationString);

  return combinationString in RESONANCES
    ? RESONANCES[combinationString as keyof typeof RESONANCES]
    : null;
}
