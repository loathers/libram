import {
  Location,
  Monster,
  toLocation,
  toMonster,
  availableAmount,
  Item,
  visitUrl,
} from "kolmafia";
import { get } from "../../property";

export const orb = Item.get("miniature crystal ball");
export function have(): boolean {
  return availableAmount(orb) > 0;
}
const parsedProp = () =>
  get("crystalBallPredictions")
    .split("|")
    .map((element) => element.split(":") as [string, string, string])
    .map(
      ([, location, monster]) =>
        [toLocation(location), toMonster(monster)] as [Location, Monster]
    );

export function ponder(): Map<Location, Monster> {
  if (!have()) return new Map();
  visitUrl("inventory.php?action=ponder");
  return new Map(parsedProp());
}
