import { Familiar, toFamiliar } from "kolmafia";
import { NumericModifier } from "../../modifierTypes.js";
import { get } from "../../property.js";

/**
 * Internal function used to parse mods
 *
 * @param input The modstring used in your mummery pref
 * @returns a NumericModifier matching that string
 */
function toModifier(input: string): NumericModifier {
  const regExp = new RegExp(/Experience \((.*?)\)/);

  const matcher = input.match(regExp);
  return (matcher ? `${matcher[2]} Experience` : input) as NumericModifier;
}

/**
 * Parses the _mummeryMods preference into a Map for easier use.
 *
 * @returns A map, mapping Familiars to a Tuple consisting of the NumericModifier attached to the familiar, and the value thereof.
 */
export function currentCostumes(): Map<Familiar, [NumericModifier, number]> {
  const entries = get("_mummeryMods").split(",");
  const returnValue = new Map<Familiar, [NumericModifier, number]>();

  const regExp = new RegExp(/([^:]+): \[(\d+)\*fam\(([^)]+)\)\]/);

  for (const entry of entries) {
    const matcher = entry.match(regExp);
    if (matcher) {
      returnValue.set(toFamiliar(matcher[3]), [
        toModifier(matcher[1]),
        parseInt(matcher[2]),
      ]);
    }
  }

  return returnValue;
}
