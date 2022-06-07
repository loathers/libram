import { toItem, availableAmount } from "kolmafia";
import { get } from "../../property";
import { NumericProperty } from "../../propertyTypes";

export const cleaver = toItem("June cleaver");

export function have(): boolean {
  return availableAmount(cleaver) > 0;
}

export function beeznarp(): number {
  return [1, 6, 10, 12, 15, 20][get("_juneCleaverEncounters")] ?? 30;
}

export function fightsToNextChoice(): number {
  return beeznarp() - get("_juneCleaverCharge");
}

export function damage(
  element: "Hot" | "Stench" | "Sleaze" | "Spooky" | "Cold"
): number {
  return get(`_juneCleaver${element}` as NumericProperty);
}
