import { haveInCampground } from "../lib";
import { $item } from "../template-string";

export const item = $item`Witchess Set`;

export function have(): boolean {
  return haveInCampground(item);
}
