import {
  Location,
  Monster,
  toLocation,
  toMonster,
  availableAmount,
  Item,
  visitUrl,
  myTotalTurnsSpent,
  totalTurnsPlayed,
} from "kolmafia";
import { logger } from "../..";
import { canVisitUrl } from "../../lib";
import { get } from "../../property";

export const orb = Item.get("miniature crystal ball");
/**
 * Determines whether you `have` the Miniature Crystal Ball
 *
 * @returns Whether you `have` the Miniature Crystal Ball
 */
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

const getLastPondered = () => `${myTotalTurnsSpent()};${totalTurnsPlayed()}`;
let lastPondered = "";
/**
 * Ponders your orb (if it is able to do so safely) and then returns a Map keyed by location consisting of extant predictions
 *
 * @returns A map of all predictions currently active in an adventurer's miniature crystal ball, after visiting the "ponder" URL to refresh them.
 */
export function ponder(): Map<Location, Monster> {
  if (!have()) return new Map();
  if (lastPondered !== getLastPondered()) {
    if (canVisitUrl()) {
      logger.debug("Now pondering Crystal Ball.");
      visitUrl("inventory.php?ponder=1", false);
      lastPondered = getLastPondered();
    } else {
      logger.debug("Failed to ponder Crystall Ball.");
    }
  }
  return new Map(parsedProp());
}
