import { $item, haveInCampground } from "../";

export const item = $item`Witchess Set`;

export function have() {
  return haveInCampground(item);
}

