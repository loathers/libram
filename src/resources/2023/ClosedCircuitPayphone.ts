import { Monster, Item } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const item = $item`closed-circuit pay phone`;

export function have(): boolean {
  return have_(item);
}

export function rufusTarget(): Monster | Item | string | null {
  const target = get("rufusQuestTarget");
  switch (get("rufusQuestType")) {
    case "entity":
      return Monster.get(target);
    case "artifact":
    case "items":
      return Item.get(target);
    default:
      return null;
  }
}
