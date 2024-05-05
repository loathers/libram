import { cliExecute } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

const RINGS = [
  ["yam1", "sword", "eye", "chair", "fur", "vessel"],
  ["lightning", "bottle", "meat", "wood", "yam2"],
  ["yam3", "wall", "cheese", "eyepatch"],
  ["explosion", "clock", "yam4"],
] as const;

export type MayamSymbol = typeof RINGS[number][number];
export type Ring<N extends number> = typeof RINGS[N][number];
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
 * @param {...MayamSymbol[]} combination The combination to check
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

/**
 * Enter a combination in the Mayam calendar
 * @param combination The combination to submit, either as a single string or as a series of symbols
 * @returns Whether we succeeded in our endeavor
 */
export function submit(
  ...combination: Combination | [CombinationString]
): boolean {
  if (
    combination.length === 1
      ? available(...(combination[0].split(" ") as Combination))
      : available(...combination)
  ) {
    return false;
  }
  return cliExecute(`mayam ring ${combination.join(" ")}`);
}
