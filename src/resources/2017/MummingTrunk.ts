import { Familiar, toFamiliar } from "kolmafia";
import { NumericModifier } from "../../modifierTypes";
import { get } from "../../property";

function toModifier(input: string): NumericModifier {
  const regExp = new RegExp(/(Experience)+ \(([^)]+)\)/);

  const matcher = input.match(regExp);
  if (matcher) {
    return `${matcher[2]} Experience` as NumericModifier;
  }
  return input as NumericModifier;
}

export function currentCostumes(): Map<Familiar, [NumericModifier, number]> {
  const entries = get("_mummeryMods").split(",");
  const returnValue = new Map<Familiar, [NumericModifier, number]>();

  const regExp = new RegExp(/([^:]+): \[(d+)\*fam\(([^)]+)\)\]/);

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
