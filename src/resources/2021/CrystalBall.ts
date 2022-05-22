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

  if (toMonster(name) !== none) return toMonster(name);
  const articles = ["a ", "the ", "some "];
  for (const article of articles) {
    if (name.toLowerCase().startsWith(article)) {
      return toMonster(name.slice(article.length));
    }
  }
  throw new Error(`Unable to identify monster ${name} by name!`);
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
