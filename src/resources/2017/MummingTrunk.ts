import { Familiar, splitModifiers } from "kolmafia";
import { NumericModifier } from "../../modifierTypes.js";
import { get } from "../../property.js";
import { notNull } from "../../utils.js";
import { isNumericModifier } from "../../modifier.js";

const MUMMERY_MODS_PATTERN = /\[(\d*)\*fam\(([^)]*)\)/;
/**
 * Parses the _mummeryMods preference into a Map for easier use.
 *
 * @returns A map, mapping Familiars to a Tuple consisting of the NumericModifier attached to the familiar, and the value thereof.
 */
export function currentCostumes(): Map<
  Familiar,
  readonly [NumericModifier, number]
> {
  return new Map(
    Object.entries(splitModifiers(get("_mummeryMods")))
      .map(([modifier, value]) => {
        if (!isNumericModifier(modifier)) return null;

        const matcher = value.match(MUMMERY_MODS_PATTERN);
        if (!matcher) return null;

        return [
          Familiar.get(matcher[2]),
          [modifier, Number(matcher[1])],
        ] as const;
      })
      .filter(notNull),
  );
}
