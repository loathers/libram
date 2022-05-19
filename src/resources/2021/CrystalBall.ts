import {
  Location,
  Monster,
  toLocation,
  toMonster,
  availableAmount,
  Item,
  visitUrl,
  inMultiFight,
  choiceFollowsFight,
  currentRound,
  handlingChoice,
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

/**
 * @returns A list of all predictions currently active in an adventurer's miniature crystal ball, after visiting the "ponder" URL to refresh them.
 */
export function ponder(): Map<Location, Monster> {
  if (!have()) return new Map();
  const otherwiseOccupied =
    currentRound() ||
    inMultiFight() ||
    choiceFollowsFight() ||
    handlingChoice();
  if (!otherwiseOccupied) visitUrl("inventory.php?action=ponder", false);
  return new Map(parsedProp());
}
