import { $item, haveInCampground } from "../";

export const item = $item`Witchess Set`;

export function have(): boolean {
  return haveInCampground(item);
}
