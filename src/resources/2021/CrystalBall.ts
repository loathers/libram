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
      ([turncount, location, monster]) =>
        [parseInt(turncount), toLocation(location), toMonster(monster)] as [
          number,
          Location,
          Monster
        ]
    );

export function ponder(): Map<Location, Monster> {
  if (!have()) return new Map();
  visitUrl("inventory.php?action=ponder");
  return new Map(
    parsedProp().map(([, location, monster]) => [location, monster])
  );
}
