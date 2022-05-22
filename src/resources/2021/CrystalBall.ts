import {
  Location,
  Monster,
  toLocation,
  toMonster,
  availableAmount,
  Item,
  visitUrl,
} from "kolmafia";
import { canVisitUrl } from "../../lib";
import { get } from "../../property";

export const orb = Item.get("miniature crystal ball");

export function have(): boolean {
  return availableAmount(orb) > 0;
}

function toMonsterWrapper(name: string): Monster {
  const none = Monster.get("none");
  // First we see if the regular ol' name is fine
  if (toMonster(name) !== none) return toMonster(name);
  // Next, we see if removing "a " helps it
  if (toMonster(name.slice(2)) !== none) return toMonster(name.slice(2));
  // Next, we see if removing "the " helps it
  if (toMonster(name.slice(4)) !== none) return toMonster(name.slice(4));
  throw new Error(`Unable to parse monster name: ${name}.`);
}

const parsedProp = () =>
  get("crystalBallPredictions")
    .split("|")
    .map((element) => element.split(":") as [string, string, string])
    .map(
      ([, location, monster]) =>
        [toLocation(location), toMonsterWrapper(monster)] as [Location, Monster]
    );

/**
 * Ponders your orb (if it is able to do so safely) and then returns a Map keyed by location consisting of extant predictions
 * @returns A map of all predictions currently active in an adventurer's miniature crystal ball, after visiting the "ponder" URL to refresh them.
 */
export function ponder(): Map<Location, Monster> {
  if (!have()) return new Map();
  if (canVisitUrl()) visitUrl("inventory.php?action=ponder", false);
  return new Map(parsedProp());
}
