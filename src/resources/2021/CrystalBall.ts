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
import { canVisitUrl } from "../../lib.js";
import logger from "../../logger.js";
import { get } from "../../property.js";

export const orb = Item.get("miniature crystal ball");
/**
 * Determines whether you `have` the Miniature Crystal Ball
 *
 * @returns Whether you `have` the Miniature Crystal Ball
 */
export function have(): boolean {
  return availableAmount(orb) > 0;
}

/**
 * @returns A map keyed by locations and whose values are monsters, representing all active orb predictions
 */
export function getPrediction(): Map<Location, Monster> {
  return new Map(
    get("crystalBallPredictions")
      .split("|")
      .filter(Boolean)
      .map((element) => element.split(":") as [string, string, string])
      .filter((tuple) => tuple.length === 3)
      .map(
        ([, location, monster]) =>
          [toLocation(location), toMonster(monster)] as [Location, Monster],
      ),
  );
}

const getLastPondered = () =>
  `${myTotalTurnsSpent()};${totalTurnsPlayed()};${get("lastAdventure")}`;
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
  return getPrediction();
}
